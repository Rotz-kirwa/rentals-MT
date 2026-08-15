"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceService = void 0;
const database_1 = require("@my-nyumba/database");
const financial_js_1 = require("../utils/financial.js");
class MaintenanceService {
    static async listTickets() {
        return database_1.prisma.maintenanceTicket.findMany({
            include: {
                house: { select: { houseNumber: true, property: { select: { name: true } } } },
                tenant: { select: { fullName: true, phoneNumber: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    static async createTicket(data) {
        return database_1.prisma.maintenanceTicket.create({
            data: {
                houseId: data.houseId,
                tenantId: data.tenantId || null,
                title: data.title,
                description: data.description,
                priority: data.priority || 'MEDIUM',
                status: 'PENDING',
            },
        });
    }
    static async updateTicket(id, data) {
        const updateData = {};
        if (data.status)
            updateData.status = data.status;
        if (data.costEstimate !== undefined)
            updateData.costEstimate = (0, financial_js_1.roundMoney)(data.costEstimate);
        return database_1.prisma.maintenanceTicket.update({
            where: { id },
            data: updateData,
        });
    }
    static async listExpenses() {
        return database_1.prisma.expense.findMany({
            include: {
                property: { select: { name: true } },
                house: { select: { houseNumber: true } },
            },
            orderBy: { expenseDate: 'desc' },
        });
    }
    static async createExpense(data) {
        return database_1.prisma.expense.create({
            data: {
                propertyId: data.propertyId,
                houseId: data.houseId || null,
                title: data.title,
                amount: (0, financial_js_1.roundMoney)(data.amount),
                category: data.category,
                vendorName: data.vendorName || null,
                expenseDate: new Date(data.expenseDate),
            },
        });
    }
}
exports.MaintenanceService = MaintenanceService;
