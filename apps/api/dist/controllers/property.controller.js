"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const property_service_js_1 = require("../services/property.service.js");
class PropertyController {
    static async listProperties(req, res, next) {
        try {
            const properties = await property_service_js_1.PropertyService.listProperties();
            res.json({ properties });
        }
        catch (err) {
            next(err);
        }
    }
    static async createProperty(req, res, next) {
        try {
            const property = await property_service_js_1.PropertyService.createProperty(req.body);
            res.status(201).json({ property });
        }
        catch (err) {
            next(err);
        }
    }
    static async getPropertyById(req, res, next) {
        try {
            const property = await property_service_js_1.PropertyService.getPropertyById(req.params.id);
            res.json({ property });
        }
        catch (err) {
            next(err);
        }
    }
    static async listHouses(req, res, next) {
        try {
            const { propertyId, status } = req.query;
            const houses = await property_service_js_1.PropertyService.listHouses(propertyId, status);
            res.json({ houses });
        }
        catch (err) {
            next(err);
        }
    }
    static async createHouse(req, res, next) {
        try {
            const house = await property_service_js_1.PropertyService.createHouse(req.body);
            res.status(201).json({ house });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.PropertyController = PropertyController;
