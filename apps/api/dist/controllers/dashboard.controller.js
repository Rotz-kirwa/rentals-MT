"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_js_1 = require("../services/dashboard.service.js");
class DashboardController {
    static async getStats(req, res, next) {
        try {
            const stats = await dashboard_service_js_1.DashboardService.getStats();
            res.json(stats);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.DashboardController = DashboardController;
