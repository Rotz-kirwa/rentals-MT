import { Request, Response, NextFunction } from 'express';
import { MpesaService } from '../services/mpesa.service.js';

export class MpesaController {
  static async initiateStkPush(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MpesaService.initiateStkPush(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async handleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await MpesaService.processCallback(req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
}
