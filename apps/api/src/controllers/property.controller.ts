import { Request, Response, NextFunction } from 'express';
import { PropertyService } from '../services/property.service.js';

export class PropertyController {
  static async listProperties(req: Request, res: Response, next: NextFunction) {
    try {
      const properties = await PropertyService.listProperties();
      res.json({ properties });
    } catch (err) {
      next(err);
    }
  }

  static async createProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const property = await PropertyService.createProperty(req.body);
      res.status(201).json({ property });
    } catch (err) {
      next(err);
    }
  }

  static async getPropertyById(req: Request, res: Response, next: NextFunction) {
    try {
      const property = await PropertyService.getPropertyById(req.params.id);
      res.json({ property });
    } catch (err) {
      next(err);
    }
  }

  static async listHouses(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, status } = req.query;
      const houses = await PropertyService.listHouses(propertyId as string, status as string);
      res.json({ houses });
    } catch (err) {
      next(err);
    }
  }

  static async createHouse(req: Request, res: Response, next: NextFunction) {
    try {
      const house = await PropertyService.createHouse(req.body);
      res.status(201).json({ house });
    } catch (err) {
      next(err);
    }
  }
}
