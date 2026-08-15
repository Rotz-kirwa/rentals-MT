"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpesaService = void 0;
const database_1 = require("@my-nyumba/database");
const financial_js_1 = require("../utils/financial.js");
const payment_service_js_1 = require("./payment.service.js");
class MpesaService {
    static async initiateStkPush(data) {
        const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        await database_1.prisma.mpesaTransaction.create({
            data: {
                checkoutRequestId,
                phoneNumber: data.phoneNumber,
                amount: (0, financial_js_1.roundMoney)(data.amount),
                rawPayload: { invoiceId: data.invoiceId, initiatedAt: new Date().toISOString() },
                status: 'PENDING',
            },
        });
        return {
            message: `M-Pesa STK push prompt dispatched to ${data.phoneNumber}. Enter PIN to confirm payment.`,
            checkoutRequestId,
            status: 'PENDING',
        };
    }
    static async processCallback(payload) {
        const callbackData = payload?.Body?.stkCallback;
        const checkoutRequestId = callbackData?.CheckoutRequestID || payload?.checkoutRequestId;
        const resultCode = callbackData?.ResultCode ?? payload?.ResultCode ?? 0;
        const mpesaReceiptNumber = callbackData?.CallbackMetadata?.Item?.find((i) => i.Name === 'MpesaReceiptNumber')?.Value || payload?.mpesaReceiptNumber;
        const amount = callbackData?.CallbackMetadata?.Item?.find((i) => i.Name === 'Amount')?.Value || payload?.amount;
        const phoneNumber = callbackData?.CallbackMetadata?.Item?.find((i) => i.Name === 'PhoneNumber')?.Value || payload?.phoneNumber;
        if (!checkoutRequestId && !mpesaReceiptNumber) {
            return { ResultCode: 1, ResultDesc: 'Missing checkoutRequestId or MpesaReceiptNumber' };
        }
        // 1. Check idempotency by checkoutRequestId or mpesaReceiptNumber
        const existingTx = await database_1.prisma.mpesaTransaction.findFirst({
            where: {
                OR: [
                    checkoutRequestId ? { checkoutRequestId } : {},
                    mpesaReceiptNumber ? { mpesaReceiptNumber } : {},
                ],
            },
        });
        if (existingTx && existingTx.status === 'PROCESSED') {
            return { ResultCode: 0, ResultDesc: 'Already Processed' };
        }
        if (resultCode !== 0) {
            if (existingTx) {
                await database_1.prisma.mpesaTransaction.update({
                    where: { id: existingTx.id },
                    data: { status: 'FAILED', rawPayload: payload },
                });
            }
            return { ResultCode: 0, ResultDesc: 'Transaction failed at gateway' };
        }
        const targetInvoiceId = existingTx?.rawPayload?.invoiceId || payload?.invoiceId;
        if (targetInvoiceId && mpesaReceiptNumber && amount) {
            const payAmount = (0, financial_js_1.roundMoney)(Number(amount));
            await database_1.prisma.$transaction(async (tx) => {
                // Record payment & update invoice
                const paymentResult = await payment_service_js_1.PaymentService.recordPayment({
                    invoiceId: targetInvoiceId,
                    amountPaid: payAmount,
                    method: 'MPESA',
                    transactionReference: mpesaReceiptNumber,
                    notes: `Automated M-Pesa STK Push Payment (${mpesaReceiptNumber})`,
                });
                if (existingTx) {
                    await tx.mpesaTransaction.update({
                        where: { id: existingTx.id },
                        data: {
                            mpesaReceiptNumber,
                            status: 'PROCESSED',
                            rawPayload: payload,
                        },
                    });
                }
                else {
                    await tx.mpesaTransaction.create({
                        data: {
                            checkoutRequestId,
                            mpesaReceiptNumber,
                            phoneNumber: String(phoneNumber || '0700000000'),
                            amount: payAmount,
                            rawPayload: payload,
                            status: 'PROCESSED',
                        },
                    });
                }
            });
        }
        return { ResultCode: 0, ResultDesc: 'Callback processed & payment recorded successfully' };
    }
}
exports.MpesaService = MpesaService;
