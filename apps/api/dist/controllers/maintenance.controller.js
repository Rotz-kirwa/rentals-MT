"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceController = void 0;
const maintenance_service_js_1 = require("../services/maintenance.service.js");
class MaintenanceController {
    static async listTickets(req, res, next) {
        try {
            const tickets = await maintenance_service_js_1.MaintenanceService.listTickets();
            res.json({ tickets });
        }
        catch (err) {
            next(err);
        }
    }
    static async createTicket(req, res, next) {
        try {
            const ticket = await maintenance_service_js_1.MaintenanceService.createTicket(req.body);
            res.status(201).json({ ticket });
        }
        catch (err) {
            next(err);
        }
    }
    static async updateTicket(req, res, next) {
        try {
            const ticket = await maintenance_service_js_1.MaintenanceService.updateTicket(req.params.id, req.body);
            res.json({ ticket });
        }
        catch (err) {
            next(err);
        }
    }
    static async listExpenses(req, res, next) {
        try {
            const expenses = await maintenance_service_js_1.MaintenanceService.listExpenses();
            res.json({ expenses });
        }
        catch (err) {
            next(err);
        }
    }
    static async createExpense(req, res, next) {
        try {
            const expense = await maintenance_service_js_1.MaintenanceService.createExpense(req.body);
            res.status(201).json({ expense });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.MaintenanceController = MaintenanceController;
