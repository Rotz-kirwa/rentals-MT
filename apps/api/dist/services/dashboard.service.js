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
        // 1. Calculate Monthly Rent Collection Figures
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const currentMonthInvoices = await database_1.prisma.invoice.findMany({
            where: {
                billingPeriodMonth: currentMonth,
                billingPeriodYear: currentYear,
            },
        });
        // Fallback to all non-void invoices if current month has no invoices yet
        const targetInvoices = currentMonthInvoices.length > 0
            ? currentMonthInvoices
            : await database_1.prisma.invoice.findMany({ where: { status: { not: 'VOID' } } });
        const rawExpected = targetInvoices.reduce((acc, inv) => acc + Number(inv.totalAmount), 0);
        const rawCollected = targetInvoices.reduce((acc, inv) => acc + Number(inv.paidAmount), 0);
        const rawOutstanding = targetInvoices.reduce((acc, inv) => acc + Number(inv.balance), 0);
        const expectedRent = (0, financial_js_1.roundMoney)(rawExpected);
        const collectedRent = (0, financial_js_1.roundMoney)(rawCollected);
        const outstandingRent = (0, financial_js_1.roundMoney)(rawOutstanding);
        const collectionPercentage = rawExpected > 0 ? Math.round((rawCollected / rawExpected) * 100) : 0;
        // 2. Per-Property Performance Breakdown
        const properties = await database_1.prisma.property.findMany({
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
        const propertyPerformance = properties.map((prop) => {
            const unitsCount = prop.houses.length;
            const occupiedCount = prop.houses.filter((h) => h.status === 'OCCUPIED').length;
            const occupancyRate = unitsCount > 0 ? Math.round((occupiedCount / unitsCount) * 100) : 0;
            let revenue = 0;
            let arrears = 0;
            prop.houses.forEach((house) => {
                house.invoices.forEach((inv) => {
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
                revenue: (0, financial_js_1.roundMoney)(revenue),
                arrears: (0, financial_js_1.roundMoney)(arrears),
            };
        });
        // 3. Action Center Counts
        const overdueInvoicesCount = await database_1.prisma.invoice.count({ where: { status: 'OVERDUE' } });
        const openMaintenanceCount = await database_1.prisma.maintenanceTicket.count({ where: { status: { in: ['PENDING', 'IN_PROGRESS'] } } });
        // Leases expiring in next 30 days
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        const expiringLeasesCount = await database_1.prisma.lease.count({
            where: {
                status: 'ACTIVE',
                endDate: { lte: thirtyDaysFromNow },
            },
        });
        // 4. Overdue Invoices List
        const overdueInvoices = await database_1.prisma.invoice.findMany({
            where: { status: 'OVERDUE' },
            include: {
                tenant: { select: { fullName: true, phoneNumber: true } },
                house: { select: { houseNumber: true, property: { select: { name: true } } } },
            },
            take: 5,
            orderBy: { dueDate: 'asc' },
        });
        // 5. Recent Payments List
        const recentPayments = await database_1.prisma.payment.findMany({
            include: {
                tenant: { select: { fullName: true } },
                receipt: true,
                invoice: { select: { invoiceNumber: true } },
            },
            take: 5,
            orderBy: { paymentDate: 'desc' },
        });
        // 6. Recent Maintenance Tickets
        const recentMaintenance = await database_1.prisma.maintenanceTicket.findMany({
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
exports.DashboardService = DashboardService;
