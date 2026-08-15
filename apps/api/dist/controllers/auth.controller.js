"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_js_1 = require("../services/auth.service.js");
class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_js_1.AuthService.login(email, password);
            res.cookie('mn_token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async register(req, res, next) {
        try {
            const result = await auth_service_js_1.AuthService.register(req.body);
            res.cookie('mn_token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async logout(_req, res) {
        res.clearCookie('mn_token');
        res.json({ success: true, message: 'Logged out successfully.' });
    }
    static async getProfile(req, res, next) {
        try {
            const userId = req.user.userId;
            const user = await auth_service_js_1.AuthService.getProfile(userId);
            res.json({ user });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
