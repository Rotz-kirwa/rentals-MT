import { prisma } from '@my-nyumba/database';
import { roundMoney } from '../utils/financial.js';

export class LeaseService {
  static async listTenants() {
    return prisma.tenant.findMany({
      include: {
        leases: {
          include: { house: { select: { houseNumber: true, property: { select: { name: true } } } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async registerTenant(data: { fullName: string; email?: string; phoneNumber: string; nationalId: string; emergencyContactName?: string; emergencyContactPhone?: string }) {
    const existing = await prisma.tenant.findUnique({ where: { nationalId: data.nationalId } });
    if (existing) {
      const err: any = new Error(`Tenant with National ID ${data.nationalId} is already registered.`);
      err.statusCode = 400;
      err.code = 'DUPLICATE_TENANT';
      throw err;
    }

    return prisma.tenant.create({
      data: {
        fullName: data.fullName,
        email: data.email || null,
        phoneNumber: data.phoneNumber,
        nationalId: data.nationalId,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
      },
    });
  }

  static async listLeases(status?: string) {
    return prisma.lease.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        house: { include: { property: true } },
        tenant: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async executeLease(data: { houseId: string; tenantId: string; startDate: string; endDate: string; monthlyRent: number; securityDeposit: number; rentDueDay?: number }) {
    const house = await prisma.house.findUnique({ where: { id: data.houseId } });
    if (!house) {
      const err: any = new Error('Unit specified does not exist.');
      err.statusCode = 404;
      err.code = 'HOUSE_NOT_FOUND';
      throw err;
    }

    if (house.status === 'OCCUPIED') {
      const err: any = new Error('This unit currently has an active lease.');
      err.statusCode = 400;
      err.code = 'UNIT_OCCUPIED';
      throw err;
    }

    const rentAmt = roundMoney(data.monthlyRent);
    const depositAmt = roundMoney(data.securityDeposit);
    const totalMoveIn = roundMoney(rentAmt + depositAmt);

    // ATOMIC TRANSACTION: Lease + Unit status OCCUPIED + Move-In Invoice
    return prisma.$transaction(async (tx: any) => {
      const lease = await tx.lease.create({
        data: {
          houseId: data.houseId,
          tenantId: data.tenantId,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          monthlyRent: rentAmt,
          securityDeposit: depositAmt,
          rentDueDay: data.rentDueDay ?? 1,
          status: 'ACTIVE',
        },
      });

      await tx.house.update({
        where: { id: data.houseId },
        data: { status: 'OCCUPIED' },
      });

      const now = new Date();
      const invNum = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

      const invoice = await tx.invoice.create({
        data: {
          invoiceNumber: invNum,
          leaseId: lease.id,
          tenantId: data.tenantId,
          houseId: data.houseId,
          billingPeriodMonth: now.getMonth() + 1,
          billingPeriodYear: now.getFullYear(),
          dueDate: new Date(data.startDate),
          subtotalAmount: totalMoveIn,
          totalAmount: totalMoveIn,
          paidAmount: 0,
          balance: totalMoveIn,
          status: 'UNPAID',
          items: {
            create: [
              { description: 'First Month Rent', itemType: 'RENT', amount: rentAmt },
              { description: 'Security Deposit (Refundable)', itemType: 'OTHER', amount: depositAmt },
            ],
          },
        },
      });

      return { lease, invoice };
    });
  }

  static async terminateLease(leaseId: string) {
    const lease = await prisma.lease.findUnique({ where: { id: leaseId } });
    if (!lease) {
      const err: any = new Error('Lease agreement not found.');
      err.statusCode = 404;
      err.code = 'NOT_FOUND';
      throw err;
    }

    return prisma.$transaction([
      prisma.lease.update({
        where: { id: lease.id },
        data: { status: 'TERMINATED' },
      }),
      prisma.house.update({
        where: { id: lease.houseId },
        data: { status: 'VACANT' },
      }),
    ]);
  }
}
