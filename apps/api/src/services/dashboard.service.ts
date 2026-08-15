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

    const pendingInvoices = await prisma.invoice.findMany({
      where: { status: { in: ['UNPAID', 'PARTIAL', 'OVERDUE'] } },
    });

    const rawRentDue = pendingInvoices.reduce((acc, inv) => acc + Number(inv.balance), 0);
    const totalRentDue = roundMoney(rawRentDue);

    const overdueInvoices = await prisma.invoice.findMany({
      where: { status: 'OVERDUE' },
      include: {
        tenant: { select: { fullName: true, phoneNumber: true } },
        house: { select: { houseNumber: true, property: { select: { name: true } } } },
      },
      take: 5,
      orderBy: { dueDate: 'asc' },
    });

    const recentPayments = await prisma.payment.findMany({
      include: {
        tenant: { select: { fullName: true } },
        receipt: true,
      },
      take: 5,
      orderBy: { paymentDate: 'desc' },
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
        totalRentDue,
      },
      overdueInvoices,
      recentPayments,
    };
  }
}
