"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().default('4000').transform((val) => parseInt(val, 10)),
    JWT_SECRET: zod_1.z.string().min(16).default('my-nyumba-super-secret-jwt-key-2026'),
    DATABASE_URL: zod_1.z.string().optional(),
    MPESA_CONSUMER_KEY: zod_1.z.string().optional(),
    MPESA_CONSUMER_SECRET: zod_1.z.string().optional(),
    MPESA_PASSKEY: zod_1.z.string().optional(),
    MPESA_SHORTCODE: zod_1.z.string().optional(),
});
exports.env = envSchema.parse(process.env);
