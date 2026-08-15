"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaseService = void 0;
const database_1 = require("@my-nyumba/database");
const financial_js_1 = require("../utils/financial.js");
class LeaseService {
    static async listTenants() {
        return database_1.prisma.tenant.findMany({
            include: {
                leases: {
                    include: { house: { select: { houseNumber: true, property: { select: { name: true } } } } },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    static async registerTenant(data) {
        const existing = await database_1.prisma.tenant.findUnique({ where: { nationalId: data.nationalId } });
        if (existing) {
            const err = new Error(`Tenant with National ID ${data.nationalId} is already registered.`);
            err.statusCode = 400;
            err.code = 'DUPLICATE_TENANT';
            throw err;
        }
        return database_1.prisma.tenant.create({
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
    static async listLeases(status) {
        return database_1.prisma.lease.findMany({
            where: status ? { status: status } : undefined,
            include: {
                house: { include: { property: true } },
                tenant: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    static async executeLease(data) {
        const house = await database_1.prisma.house.findUnique({ where: { id: data.houseId } });
        if (!house) {
            const err = new Error('Unit specified does not exist.');
            err.statusCode = 404;
            err.code = 'HOUSE_NOT_FOUND';
            throw err;
        }
        if (house.status === 'OCCUPIED') {
            const err = new Error('This unit currently has an active lease.');
            err.statusCode = 400;
            err.code = 'UNIT_OCCUPIED';
            throw err;
        }
        const rentAmt = (0, financial_js_1.roundMoney)(data.monthlyRent);
        const depositAmt = (0, financial_js_1.roundMoney)(data.securityDeposit);
        const totalMoveIn = (0, financial_js_1.roundMoney)(rentAmt + depositAmt);
        // ATOMIC TRANSACTION: Lease + Unit status OCCUPIED + Move-In Invoice
        return database_1.prisma.$transaction(async (tx) => {
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
    static async terminateLease(leaseId) {
        const lease = await database_1.prisma.lease.findUnique({ where: { id: leaseId } });
        if (!lease) {
            const err = new Error('Lease agreement not found.');
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        return database_1.prisma.$transaction([
            database_1.prisma.lease.update({
                where: { id: lease.id },
                data: { status: 'TERMINATED' },
            }),
            database_1.prisma.house.update({
                where: { id: lease.houseId },
                data: { status: 'VACANT' },
            }),
        ]);
    }
}
exports.LeaseService = LeaseService;
