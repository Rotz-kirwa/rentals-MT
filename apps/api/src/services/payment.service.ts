import { prisma } from '@my-nyumba/database';
import { roundMoney, calculateInvoiceBalance } from '../utils/financial.js';

export class PaymentService {
  static async listPayments() {
    return prisma.payment.findMany({
      include: {
        invoice: { select: { invoiceNumber: true, house: { select: { houseNumber: true } } } },
        tenant: { select: { fullName: true, phoneNumber: true } },
        receipt: true,
      },
      orderBy: { paymentDate: 'desc' },
    });
  }

  static async recordPayment(data: { invoiceId: string; amountPaid: number; method: any; transactionReference?: string; notes?: string; recordedBy?: string }) {
    const invoice = await prisma.invoice.findUnique({ where: { id: data.invoiceId } });
    if (!invoice) {
      const err: any = new Error('Target invoice not found.');
      err.statusCode = 404;
      err.code = 'NOT_FOUND';
      throw err;
    }

    const payAmt = roundMoney(data.amountPaid);
    if (payAmt <= 0) {
      const err: any = new Error('Payment amount must be greater than 0.');
      err.statusCode = 400;
      err.code = 'INVALID_AMOUNT';
      throw err;
    }

    return prisma.$transaction(async (tx: any) => {
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

      const newPaidAmount = roundMoney(Number(invoice.paidAmount) + payAmt);
      const totalAmt = roundMoney(invoice.totalAmount);
      const newBalance = calculateInvoiceBalance(totalAmt, newPaidAmount);

      let newStatus: any = 'PARTIAL';
      if (newPaidAmount >= totalAmt) {
        newStatus = 'PAID';
      } else if (newPaidAmount === 0) {
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
