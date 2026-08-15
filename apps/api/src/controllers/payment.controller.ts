import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service.js';

export class PaymentController {
  static async listPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await PaymentService.listPayments();
      res.json({ payments });
    } catch (err) {
      next(err);
    }
  }

  static async recordPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;
      const result = await PaymentService.recordPayment({
        ...req.body,
        recordedBy: userId,
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
