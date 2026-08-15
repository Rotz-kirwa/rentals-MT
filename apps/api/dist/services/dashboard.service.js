"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const database_1 = require("@my-nyumba/database");
const financial_js_1 = require("../utils/financial.js");
class DashboardService {
    static async getStats() {
        const totalProperties = await database_1.prisma.property.count();
        const totalHouses = await database_1.prisma.house.count();
        const occupiedHouses = await database_1.prisma.house.count({ where: { status: 'OCCUPIED' } });
        const vacantHouses = await database_1.prisma.house.count({ where: { status: 'VACANT' } });
        const maintenanceHouses = await database_1.prisma.house.count({ where: { status: 'MAINTENANCE' } });
        const totalTenants = await database_1.prisma.tenant.count();
        const pendingInvoices = await database_1.prisma.invoice.findMany({
            where: { status: { in: ['UNPAID', 'PARTIAL', 'OVERDUE'] } },
        });
        const rawRentDue = pendingInvoices.reduce((acc, inv) => acc + Number(inv.balance), 0);
        const totalRentDue = (0, financial_js_1.roundMoney)(rawRentDue);
        const overdueInvoices = await database_1.prisma.invoice.findMany({
            where: { status: 'OVERDUE' },
            include: {
                tenant: { select: { fullName: true, phoneNumber: true } },
                house: { select: { houseNumber: true, property: { select: { name: true } } } },
            },
            take: 5,
            orderBy: { dueDate: 'asc' },
        });
        const recentPayments = await database_1.prisma.payment.findMany({
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
exports.DashboardService = DashboardService;
