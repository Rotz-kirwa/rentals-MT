import { Request, Response, NextFunction } from 'express';
import { BillingService } from '../services/billing.service.js';

export class BillingController {
  static async listInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, tenantId, houseId } = req.query;
      const invoices = await BillingService.listInvoices({
        status: status as string,
        tenantId: tenantId as string,
        houseId: houseId as string,
      });
      res.json({ invoices });
    } catch (err) {
      next(err);
    }
  }

  static async getInvoiceById(req: Request, res: Response, next: NextFunction) {
    try {
      const invoice = await BillingService.getInvoiceById(req.params.id);
      res.json({ invoice });
    } catch (err) {
      next(err);
    }
  }

  static async generateMonthlyInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      const { month, year } = req.body;
      const m = month || new Date().getMonth() + 1;
      const y = year || new Date().getFullYear();
      const result = await BillingService.generateMonthlyInvoices(m, y);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
