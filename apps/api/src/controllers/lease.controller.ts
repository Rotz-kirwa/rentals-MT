import { Request, Response, NextFunction } from 'express';
import { LeaseService } from '../services/lease.service.js';

export class LeaseController {
  static async listTenants(req: Request, res: Response, next: NextFunction) {
    try {
      const tenants = await LeaseService.listTenants();
      res.json({ tenants });
    } catch (err) {
      next(err);
    }
  }

  static async registerTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const tenant = await LeaseService.registerTenant(req.body);
      res.status(201).json({ tenant });
    } catch (err) {
      next(err);
    }
  }

  static async listLeases(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status as string;
      const leases = await LeaseService.listLeases(status);
      res.json({ leases });
    } catch (err) {
      next(err);
    }
  }

  static async executeLease(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await LeaseService.executeLease(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async terminateLease(req: Request, res: Response, next: NextFunction) {
    try {
      await LeaseService.terminateLease(req.params.id);
      res.json({ message: 'Lease terminated successfully.' });
    } catch (err) {
      next(err);
    }
  }
}
