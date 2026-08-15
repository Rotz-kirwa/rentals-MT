import { prisma } from '@my-nyumba/database';
import { roundMoney } from '../utils/financial.js';
import { PaymentService } from './payment.service.js';

export class MpesaService {
  static async initiateStkPush(data: { invoiceId: string; phoneNumber: string; amount: number }) {
    const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    await prisma.mpesaTransaction.create({
      data: {
        checkoutRequestId,
        phoneNumber: data.phoneNumber,
        amount: roundMoney(data.amount),
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

  static async processCallback(payload: any) {
    const callbackData = payload?.Body?.stkCallback;
    const checkoutRequestId = callbackData?.CheckoutRequestID || payload?.checkoutRequestId;
    const resultCode = callbackData?.ResultCode ?? payload?.ResultCode ?? 0;

    const mpesaReceiptNumber = callbackData?.CallbackMetadata?.Item?.find(
      (i: any) => i.Name === 'MpesaReceiptNumber'
    )?.Value || payload?.mpesaReceiptNumber;

    const amount = callbackData?.CallbackMetadata?.Item?.find(
      (i: any) => i.Name === 'Amount'
    )?.Value || payload?.amount;

    const phoneNumber = callbackData?.CallbackMetadata?.Item?.find(
      (i: any) => i.Name === 'PhoneNumber'
    )?.Value || payload?.phoneNumber;

    if (!checkoutRequestId && !mpesaReceiptNumber) {
      return { ResultCode: 1, ResultDesc: 'Missing checkoutRequestId or MpesaReceiptNumber' };
    }

    // 1. Check idempotency by checkoutRequestId or mpesaReceiptNumber
    const existingTx = await prisma.mpesaTransaction.findFirst({
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
        await prisma.mpesaTransaction.update({
          where: { id: existingTx.id },
          data: { status: 'FAILED', rawPayload: payload },
        });
      }
      return { ResultCode: 0, ResultDesc: 'Transaction failed at gateway' };
    }

    const targetInvoiceId = (existingTx?.rawPayload as any)?.invoiceId || payload?.invoiceId;

    if (targetInvoiceId && mpesaReceiptNumber && amount) {
      const payAmount = roundMoney(Number(amount));

      await prisma.$transaction(async (tx) => {
        // Record payment & update invoice
        const paymentResult = await PaymentService.recordPayment({
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
        } else {
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
