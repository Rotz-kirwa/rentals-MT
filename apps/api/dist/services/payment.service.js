"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const database_1 = require("@my-nyumba/database");
const financial_js_1 = require("../utils/financial.js");
class PaymentService {
    static async listPayments() {
        return database_1.prisma.payment.findMany({
            include: {
                invoice: { select: { invoiceNumber: true, house: { select: { houseNumber: true } } } },
                tenant: { select: { fullName: true, phoneNumber: true } },
                receipt: true,
            },
            orderBy: { paymentDate: 'desc' },
        });
    }
    static async recordPayment(data) {
        const invoice = await database_1.prisma.invoice.findUnique({ where: { id: data.invoiceId } });
        if (!invoice) {
            const err = new Error('Target invoice not found.');
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        const payAmt = (0, financial_js_1.roundMoney)(data.amountPaid);
        if (payAmt <= 0) {
            const err = new Error('Payment amount must be greater than 0.');
            err.statusCode = 400;
            err.code = 'INVALID_AMOUNT';
            throw err;
        }
        return database_1.prisma.$transaction(async (tx) => {
            const payNum = `PAY-${Date.now()}`;
            const payment = await tx.payment.create({
                data: {
                    paymentNumber: payNum,
                    invoiceId: invoice.id,
                    tenantId: invoice.tenantId,
                    amountPaid: payAmt,
                    method: data.method,
                    transactionReference: data.transactionReference || null,
                    recordedBy: data.recordedBy || null,
                    notes: data.notes || null,
                },
            });
            const newPaidAmount = (0, financial_js_1.roundMoney)(Number(invoice.paidAmount) + payAmt);
            const totalAmt = (0, financial_js_1.roundMoney)(invoice.totalAmount);
            const newBalance = (0, financial_js_1.calculateInvoiceBalance)(totalAmt, newPaidAmount);
            let newStatus = 'PARTIAL';
            if (newPaidAmount >= totalAmt) {
                newStatus = 'PAID';
            }
            else if (newPaidAmount === 0) {
                newStatus = 'UNPAID';
            }
            const updatedInvoice = await tx.invoice.update({
                where: { id: invoice.id },
                data: {
                    paidAmount: newPaidAmount,
                    balance: newBalance,
                    status: newStatus,
                },
            });
            const recNum = `REC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
            const receipt = await tx.receipt.create({
                data: {
                    receiptNumber: recNum,
                    paymentId: payment.id,
                },
            });
            return { payment, receipt, invoice: updatedInvoice };
        });
    }
}
exports.PaymentService = PaymentService;
