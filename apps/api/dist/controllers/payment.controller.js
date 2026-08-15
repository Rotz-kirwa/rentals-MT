"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_js_1 = require("../services/payment.service.js");
class PaymentController {
    static async listPayments(req, res, next) {
        try {
            const payments = await payment_service_js_1.PaymentService.listPayments();
            res.json({ payments });
        }
        catch (err) {
            next(err);
        }
    }
    static async recordPayment(req, res, next) {
        try {
            const userId = req.user?.userId;
            const result = await payment_service_js_1.PaymentService.recordPayment({
                ...req.body,
                recordedBy: userId,
            });
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.PaymentController = PaymentController;
