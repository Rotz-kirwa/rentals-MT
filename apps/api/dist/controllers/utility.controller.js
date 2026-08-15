"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityController = void 0;
const utility_service_js_1 = require("../services/utility.service.js");
class UtilityController {
    static async listUtilities(req, res, next) {
        try {
            const utilities = await utility_service_js_1.UtilityService.listUtilities();
            res.json({ utilities });
        }
        catch (err) {
            next(err);
        }
    }
    static async listReadings(req, res, next) {
        try {
            const houseId = req.query.houseId;
            const readings = await utility_service_js_1.UtilityService.listReadings(houseId);
            res.json({ readings });
        }
        catch (err) {
            next(err);
        }
    }
    static async recordReading(req, res, next) {
        try {
            const userId = req.user?.userId;
            const reading = await utility_service_js_1.UtilityService.recordReading({
                ...req.body,
                recordedBy: userId,
            });
            res.status(201).json({ reading });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UtilityController = UtilityController;
