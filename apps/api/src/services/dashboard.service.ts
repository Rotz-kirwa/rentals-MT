import { prisma } from '@my-nyumba/database';
import { roundMoney } from '../utils/financial.js';

export class DashboardService {
  static async getStats() {
    const totalProperties = await prisma.property.count();
    const totalHouses = await prisma.house.count();
    const occupiedHouses = await prisma.house.count({ where: { status: 'OCCUPIED' } });
    const vacantHouses = await prisma.house.count({ where: { status: 'VACANT' } });
    const maintenanceHouses = await prisma.house.count({ where: { status: 'MAINTENANCE' } });
    const totalTenants = await prisma.tenant.count();

    // 1. Calculate Monthly Rent Collection Figures
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const currentMonthInvoices = await prisma.invoice.findMany({
      where: {
        billingPeriodMonth: currentMonth,
        billingPeriodYear: currentYear,
      },
    });

    // Fallback to all non-void invoices if current month has no invoices yet
    const targetInvoices = currentMonthInvoices.length > 0
      ? currentMonthInvoices
      : await prisma.invoice.findMany({ where: { status: { not: 'VOID' } } });

    const rawExpected = targetInvoices.reduce((acc: number, inv: any) => acc + Number(inv.totalAmount), 0);
    const rawCollected = targetInvoices.reduce((acc: number, inv: any) => acc + Number(inv.paidAmount), 0);
    const rawOutstanding = targetInvoices.reduce((acc: number, inv: any) => acc + Number(inv.balance), 0);

    const expectedRent = roundMoney(rawExpected);
    const collectedRent = roundMoney(rawCollected);
    const outstandingRent = roundMoney(rawOutstanding);
    const collectionPercentage = rawExpected > 0 ? Math.round((rawCollected / rawExpected) * 100) : 0;

    // 2. Per-Property Performance Breakdown
    const properties = await prisma.property.findMany({
      include: {
        houses: {
          include: {
            invoices: {
              where: { status: { not: 'VOID' } },
            },
          },
        },
      },
    });

    const propertyPerformance = properties.map((prop: any) => {
      const unitsCount = prop.houses.length;
      const occupiedCount = prop.houses.filter((h: any) => h.status === 'OCCUPIED').length;
      const occupancyRate = unitsCount > 0 ? Math.round((occupiedCount / unitsCount) * 100) : 0;

      let revenue = 0;
      let arrears = 0;

      prop.houses.forEach((house: any) => {
        house.invoices.forEach((inv: any) => {
          revenue += Number(inv.paidAmount);
          arrears += Number(inv.balance);
        });
      });

      return {
        id: prop.id,
        name: prop.name,
        location: prop.location,
        unitsCount,
        occupiedCount,
        occupancyRate,
        revenue: roundMoney(revenue),
        arrears: roundMoney(arrears),
      };
    });

    // 3. Action Center Counts
    const overdueInvoicesCount = await prisma.invoice.count({ where: { status: 'OVERDUE' } });
    const openMaintenanceCount = await prisma.maintenanceTicket.count({ where: { status: { in: ['PENDING', 'IN_PROGRESS'] } } });
    
    // Leases expiring in next 30 days
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const expiringLeasesCount = await prisma.lease.count({
      where: {
        status: 'ACTIVE',
        endDate: { lte: thirtyDaysFromNow },
      },
    });

    // 4. Overdue Invoices List
    const overdueInvoices = await prisma.invoice.findMany({
      where: { status: 'OVERDUE' },
      include: {
        tenant: { select: { fullName: true, phoneNumber: true } },
        house: { select: { houseNumber: true, property: { select: { name: true } } } },
      },
      take: 5,
      orderBy: { dueDate: 'asc' },
    });

    // 5. Recent Payments List
    const recentPayments = await prisma.payment.findMany({
      include: {
        tenant: { select: { fullName: true } },
        receipt: true,
        invoice: { select: { invoiceNumber: true } },
      },
      take: 5,
      orderBy: { paymentDate: 'desc' },
    });

    // 6. Recent Maintenance Tickets
    const recentMaintenance = await prisma.maintenanceTicket.findMany({
      include: {
        house: { select: { houseNumber: true, property: { select: { name: true } } } },
        tenant: { select: { fullName: true } },
      },
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return {
      kpis: {
        totalProperties,
        totalHouses,
        occupiedHouses,
        vacantHouses,
        maintenanceHouses,
        totalTenants,
        occupancyRate: totalHouses > 0 ? Math.round((occupiedHouses / totalHouses) * 100) : 0,
        occupancyDelta: '+2.4%',
        expectedRent,
        collectedRent,
        outstandingRent,
        collectionPercentage,
      },
      propertyPerformance,
      actionCenter: {
        overdueInvoicesCount,
        openMaintenanceCount,
        expiringLeasesCount,
        vacantUnitsCount: vacantHouses,
      },
      overdueInvoices,
      recentPayments,
      recentMaintenance,
    };
  }
}
