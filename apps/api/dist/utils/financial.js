"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundMoney = roundMoney;
exports.calculateInvoiceBalance = calculateInvoiceBalance;
exports.formatCurrency = formatCurrency;
/**
 * Converts a number, string, or Prisma.Decimal into a rounded 2-decimal number.
 * Prevents floating point inaccuracies (e.g., 0.1 + 0.2 = 0.30000000000000004).
 */
function roundMoney(amount) {
    const num = typeof amount === 'object' && 'toNumber' in amount ? amount.toNumber() : Number(amount);
    if (isNaN(num))
        return 0;
    return Math.round((num + Number.EPSILON) * 100) / 100;
}
/**
 * Calculates remaining balance given total invoice amount and paid amount.
 */
function calculateInvoiceBalance(totalAmount, paidAmount) {
    const total = roundMoney(totalAmount);
    const paid = roundMoney(paidAmount);
    return Math.max(0, roundMoney(total - paid));
}
/**
 * Formats a monetary amount to KSh standard string representation.
 */
function formatCurrency(amount) {
    return `KSh ${roundMoney(amount).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
