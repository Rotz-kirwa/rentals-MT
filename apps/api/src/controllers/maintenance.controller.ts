import { Request, Response, NextFunction } from 'express';
import { MaintenanceService } from '../services/maintenance.service.js';

export class MaintenanceController {
  static async listTickets(req: Request, res: Response, next: NextFunction) {
    try {
      const tickets = await MaintenanceService.listTickets();
      res.json({ tickets });
    } catch (err) {
      next(err);
    }
  }

  static async createTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await MaintenanceService.createTicket(req.body);
      res.status(201).json({ ticket });
    } catch (err) {
      next(err);
    }
  }

  static async updateTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await MaintenanceService.updateTicket(req.params.id, req.body);
      res.json({ ticket });
    } catch (err) {
      next(err);
    }
  }

  static async listExpenses(req: Request, res: Response, next: NextFunction) {
    try {
      const expenses = await MaintenanceService.listExpenses();
      res.json({ expenses });
    } catch (err) {
      next(err);
    }
  }

  static async createExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const expense = await MaintenanceService.createExpense(req.body);
      res.status(201).json({ expense });
    } catch (err) {
      next(err);
    }
  }
}
