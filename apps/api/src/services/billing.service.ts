import { prisma } from '@my-nyumba/database';
import { roundMoney } from '../utils/financial.js';

export class BillingService {
  static async listInvoices(filters?: { status?: string; tenantId?: string; houseId?: string }) {
    const where: any = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.tenantId) where.tenantId = filters.tenantId;
    if (filters?.houseId) where.houseId = filters.houseId;

    return prisma.invoice.findMany({
      where,
      include: {
        tenant: { select: { id: true, fullName: true, phoneNumber: true } },
        house: { select: { id: true, houseNumber: true, property: { select: { name: true } } } },
        items: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getInvoiceById(id: string) {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        tenant: true,
        house: { include: { property: true } },
        items: true,
        payments: { include: { receipt: true } },
      },
    });

    if (!invoice) {
      const err: any = new Error('Invoice not found.');
      err.statusCode = 404;
      err.code = 'NOT_FOUND';
      throw err;
    }

    return invoice;
  }

  static async generateMonthlyInvoices(month: number, year: number) {
    // 1. Load active leases
    const activeLeases = await prisma.lease.findMany({
      where: { status: 'ACTIVE' },
      include: { house: true, tenant: true },
    });

    if (activeLeases.length === 0) {
      return {
        message: `No active leases found for ${month}/${year}.`,
        generatedCount: 0,
        skippedCount: 0,
      };
    }

    const leaseIds = activeLeases.map((l) => l.id);
    const houseIds = activeLeases.map((l) => l.houseId);

    // 2. Batch load existing invoices for this billing period (Idempotency check)
    const existingInvoices = await prisma.invoice.findMany({
      where: {
        leaseId: { in: leaseIds },
        billingPeriodMonth: month,
        billingPeriodYear: year,
      },
      select: { leaseId: true },
    });
    const existingLeaseIdSet = new Set(existingInvoices.map((inv) => inv.leaseId));

    // 3. Batch load all unbilled utility readings across all active houses
    const allUnbilledReadings = await prisma.utilityReading.findMany({
      where: { houseId: { in: houseIds }, isBilled: false },
      include: { utility: true },
    });

    // Group unbilled readings by houseId
    const readingsByHouseMap = new Map<string, typeof allUnbilledReadings>();
    for (const r of allUnbilledReadings) {
      if (!readingsByHouseMap.has(r.houseId)) {
        readingsByHouseMap.set(r.houseId, []);
      }
      readingsByHouseMap.get(r.houseId)!.push(r);
    }

    let generatedCount = 0;
    let skippedCount = 0;

    for (const lease of activeLeases) {
      if (existingLeaseIdSet.has(lease.id)) {
        skippedCount++;
        continue;
      }

      const houseReadings = readingsByHouseMap.get(lease.houseId) || [];
      const rentAmt = roundMoney(lease.monthlyRent);
      const garbageAmt = roundMoney(lease.house.garbageFee);
      let utilitySubtotal = 0;

      const lineItems: Array<{ description: string; itemType: any; amount: number }> = [
        { description: `Base Rent (${month}/${year})`, itemType: 'RENT', amount: rentAmt },
      ];

      if (garbageAmt > 0) {
        lineItems.push({
          description: 'Garbage Collection Fee',
          itemType: 'GARBAGE',
          amount: garbageAmt,
        });
      }

      for (const r of houseReadings) {
        const amt = roundMoney(r.totalCharge);
        utilitySubtotal += amt;
        lineItems.push({
          description: `${r.utility.name} (${Number(r.unitsUsed)} ${r.utility.unitName || 'units'})`,
          itemType: r.utility.name.toUpperCase().includes('WATER') ? 'WATER' : 'ELECTRICITY',
          amount: amt,
        });
      }

      const grandTotal = roundMoney(rentAmt + garbageAmt + utilitySubtotal);
      const invNum = `INV-${year}${String(month).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
      const dueDate = new Date(year, month - 1, lease.rentDueDay);

      await prisma.$transaction(async (tx) => {
        await tx.invoice.create({
          data: {
            invoiceNumber: invNum,
            leaseId: lease.id,
            tenantId: lease.tenantId,
            houseId: lease.houseId,
            billingPeriodMonth: month,
            billingPeriodYear: year,
            dueDate,
            subtotalAmount: grandTotal,
            totalAmount: grandTotal,
            paidAmount: 0,
            balance: grandTotal,
            status: 'UNPAID',
            items: { create: lineItems },
          },
        });

        if (houseReadings.length > 0) {
          await tx.utilityReading.updateMany({
            where: { id: { in: houseReadings.map((u) => u.id) } },
            data: { isBilled: true },
          });
        }
      });

      generatedCount++;
    }

    return {
      message: `Monthly billing batch execution complete for ${month}/${year}.`,
      generatedCount,
      skippedCount,
    };
  }
}
