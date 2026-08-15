"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaseController = void 0;
const lease_service_js_1 = require("../services/lease.service.js");
class LeaseController {
    static async listTenants(req, res, next) {
        try {
            const tenants = await lease_service_js_1.LeaseService.listTenants();
            res.json({ tenants });
        }
        catch (err) {
            next(err);
        }
    }
    static async registerTenant(req, res, next) {
        try {
            const tenant = await lease_service_js_1.LeaseService.registerTenant(req.body);
            res.status(201).json({ tenant });
        }
        catch (err) {
            next(err);
        }
    }
    static async listLeases(req, res, next) {
        try {
            const status = req.query.status;
            const leases = await lease_service_js_1.LeaseService.listLeases(status);
            res.json({ leases });
        }
        catch (err) {
            next(err);
        }
    }
    static async executeLease(req, res, next) {
        try {
            const result = await lease_service_js_1.LeaseService.executeLease(req.body);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async terminateLease(req, res, next) {
        try {
            await lease_service_js_1.LeaseService.terminateLease(req.params.id);
            res.json({ message: 'Lease terminated successfully.' });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.LeaseController = LeaseController;
