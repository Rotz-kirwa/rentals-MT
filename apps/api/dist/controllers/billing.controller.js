"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingController = void 0;
const billing_service_js_1 = require("../services/billing.service.js");
class BillingController {
    static async listInvoices(req, res, next) {
        try {
            const { status, tenantId, houseId } = req.query;
            const invoices = await billing_service_js_1.BillingService.listInvoices({
                status: status,
                tenantId: tenantId,
                houseId: houseId,
            });
            res.json({ invoices });
        }
        catch (err) {
            next(err);
        }
    }
    static async getInvoiceById(req, res, next) {
        try {
            const invoice = await billing_service_js_1.BillingService.getInvoiceById(req.params.id);
            res.json({ invoice });
        }
        catch (err) {
            next(err);
        }
    }
    static async generateMonthlyInvoices(req, res, next) {
        try {
            const { month, year } = req.body;
            const m = month || new Date().getMonth() + 1;
            const y = year || new Date().getFullYear();
            const result = await billing_service_js_1.BillingService.generateMonthlyInvoices(m, y);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.BillingController = BillingController;
