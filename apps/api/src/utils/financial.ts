import { Prisma } from '@prisma/client';

/**
 * Converts a number, string, or Prisma.Decimal into a rounded 2-decimal number.
 * Prevents floating point inaccuracies (e.g., 0.1 + 0.2 = 0.30000000000000004).
 */
export function roundMoney(amount: number | string | Prisma.Decimal): number {
  const num = typeof amount === 'object' && 'toNumber' in amount ? amount.toNumber() : Number(amount);
  if (isNaN(num)) return 0;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Calculates remaining balance given total invoice amount and paid amount.
 */
export function calculateInvoiceBalance(totalAmount: number | Prisma.Decimal, paidAmount: number | Prisma.Decimal): number {
  const total = roundMoney(totalAmount);
  const paid = roundMoney(paidAmount);
  return Math.max(0, roundMoney(total - paid));
}

/**
 * Formats a monetary amount to KSh standard string representation.
 */
export function formatCurrency(amount: number | string | Prisma.Decimal): string {
  return `KSh ${roundMoney(amount).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
