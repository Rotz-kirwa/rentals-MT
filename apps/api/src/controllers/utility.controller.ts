import { Request, Response, NextFunction } from 'express';
import { UtilityService } from '../services/utility.service.js';

export class UtilityController {
  static async listUtilities(req: Request, res: Response, next: NextFunction) {
    try {
      const utilities = await UtilityService.listUtilities();
      res.json({ utilities });
    } catch (err) {
      next(err);
    }
  }

  static async listReadings(req: Request, res: Response, next: NextFunction) {
    try {
      const houseId = req.query.houseId as string;
      const readings = await UtilityService.listReadings(houseId);
      res.json({ readings });
    } catch (err) {
      next(err);
    }
  }

  static async recordReading(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;
      const reading = await UtilityService.recordReading({
        ...req.body,
        recordedBy: userId,
      });
      res.status(201).json({ reading });
    } catch (err) {
      next(err);
    }
  }
}
