"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("@my-nyumba/database");
const auth_js_1 = require("../utils/auth.js");
class AuthService {
    static async login(email, password) {
        const user = await database_1.prisma.user.findUnique({ where: { email } });
        if (!user || !user.isActive) {
            const err = new Error('Invalid email or password.');
            err.statusCode = 401;
            err.code = 'INVALID_CREDENTIALS';
            throw err;
        }
        const isMatch = await (0, auth_js_1.comparePassword)(password, user.passwordHash);
        if (!isMatch) {
            const err = new Error('Invalid email or password.');
            err.statusCode = 401;
            err.code = 'INVALID_CREDENTIALS';
            throw err;
        }
        const token = (0, auth_js_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            },
        };
    }
    static async register(data) {
        const existingUser = await database_1.prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            const err = new Error('User with this email already exists.');
            err.statusCode = 400;
            err.code = 'EMAIL_EXISTS';
            throw err;
        }
        const passwordHash = await (0, auth_js_1.hashPassword)(data.password);
        const user = await database_1.prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                passwordHash,
                role: data.role || 'TENANT',
            },
        });
        const token = (0, auth_js_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            },
        };
    }
    static async getProfile(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                fullName: true,
                phoneNumber: true,
                role: true,
                createdAt: true,
            },
        });
        if (!user) {
            const err = new Error('User profile not found.');
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        return user;
    }
}
exports.AuthService = AuthService;
