"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpesaController = void 0;
const mpesa_service_js_1 = require("../services/mpesa.service.js");
class MpesaController {
    static async initiateStkPush(req, res, next) {
        try {
            const result = await mpesa_service_js_1.MpesaService.initiateStkPush(req.body);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async handleCallback(req, res, next) {
        try {
            const response = await mpesa_service_js_1.MpesaService.processCallback(req.body);
            res.json(response);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.MpesaController = MpesaController;
