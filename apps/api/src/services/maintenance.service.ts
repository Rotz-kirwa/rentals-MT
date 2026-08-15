import { prisma } from '@my-nyumba/database';
import { roundMoney } from '../utils/financial.js';

export class MaintenanceService {
  static async listTickets() {
    return prisma.maintenanceTicket.findMany({
      include: {
        house: { select: { houseNumber: true, property: { select: { name: true } } } },
        tenant: { select: { fullName: true, phoneNumber: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createTicket(data: { houseId: string; title: string; description: string; priority?: any; tenantId?: string }) {
    return prisma.maintenanceTicket.create({
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

  static async updateTicket(id: string, data: { status?: any; costEstimate?: number }) {
    const updateData: any = {};
    if (data.status) updateData.status = data.status;
    if (data.costEstimate !== undefined) updateData.costEstimate = roundMoney(data.costEstimate);

    return prisma.maintenanceTicket.update({
      where: { id },
      data: updateData,
    });
  }

  static async listExpenses() {
    return prisma.expense.findMany({
      include: {
        property: { select: { name: true } },
        house: { select: { houseNumber: true } },
      },
      orderBy: { expenseDate: 'desc' },
    });
  }

  static async createExpense(data: { propertyId: string; houseId?: string; title: string; amount: number; category: string; vendorName?: string; expenseDate: string }) {
    return prisma.expense.create({
      data: {
        propertyId: data.propertyId,
        houseId: data.houseId || null,
        title: data.title,
        amount: roundMoney(data.amount),
        category: data.category,
        vendorName: data.vendorName || null,
        expenseDate: new Date(data.expenseDate),
      },
    });
  }
}
