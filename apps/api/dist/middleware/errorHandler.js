"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const logger_js_1 = require("../config/logger.js");
function errorHandler(err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) {
    const statusCode = err.statusCode || 500;
    const errorResponse = {
        type: `https://api.mynyumba.co.ke/errors/${err.code || 'INTERNAL_SERVER_ERROR'}`,
        title: err.name || 'Internal Server Error',
        status: statusCode,
        detail: err.message || 'An unexpected error occurred.',
        instance: req.originalUrl,
        code: err.code || 'INTERNAL_SERVER_ERROR',
        timestamp: new Date().toISOString(),
    };
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            ...errorResponse,
            status: 400,
            title: 'Validation Error',
            code: 'INVALID_INPUT',
            detail: 'One or more request parameters failed validation.',
            errors: err.errors,
        });
        return;
    }
    logger_js_1.logger.error({ err, req: { method: req.method, url: req.url } }, 'API Error');
    res.status(statusCode).json(errorResponse);
}
