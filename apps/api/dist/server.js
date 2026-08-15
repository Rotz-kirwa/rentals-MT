"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const health_js_1 = require("./routes/health.js");
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const properties_js_1 = __importDefault(require("./routes/properties.js"));
const tenants_js_1 = __importDefault(require("./routes/tenants.js"));
const invoices_js_1 = __importDefault(require("./routes/invoices.js"));
const payments_js_1 = __importDefault(require("./routes/payments.js"));
const utilities_js_1 = __importDefault(require("./routes/utilities.js"));
const maintenance_js_1 = __importDefault(require("./routes/maintenance.js"));
const expenses_js_1 = __importDefault(require("./routes/expenses.js"));
const dashboard_js_1 = __importDefault(require("./routes/dashboard.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const logger_js_1 = require("./config/logger.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Rate limiting setup
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests from this IP, please try again later.' },
});
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20, // 20 login/register attempts per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many login attempts. Please try again after 15 minutes.' },
});
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(globalLimiter);
// Health Check
app.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Register REST API Routes
app.use('/api/v1', health_js_1.healthRouter);
app.use('/api/v1/auth', authLimiter, auth_js_1.default);
app.use('/api/v1', properties_js_1.default);
app.use('/api/v1', tenants_js_1.default);
app.use('/api/v1', invoices_js_1.default);
app.use('/api/v1', payments_js_1.default);
app.use('/api/v1', utilities_js_1.default);
app.use('/api/v1', maintenance_js_1.default);
app.use('/api/v1', expenses_js_1.default);
app.use('/api/v1', dashboard_js_1.default);
// Serve Web UI Frontend Static Build (if present)
const possibleWebDistPaths = [
    path_1.default.resolve(process.cwd(), 'apps/web/dist'),
    path_1.default.resolve(process.cwd(), '../web/dist'),
    path_1.default.resolve(process.cwd(), '../../web/dist'),
];
const webDistPath = possibleWebDistPaths.find((p) => fs_1.default.existsSync(p));
if (webDistPath) {
    app.use(express_1.default.static(webDistPath));
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/'))
            return next();
        res.sendFile(path_1.default.join(webDistPath, 'index.html'));
    });
}
else {
    app.get('/', (_req, res) => {
        res.json({
            name: 'My Nyumba Property Management REST API',
            version: '1.0.0',
            status: 'ONLINE',
            timestamp: new Date().toISOString(),
            endpoints: {
                health: '/api/v1/health',
                auth: '/api/v1/auth',
                dashboard: '/api/v1/dashboard/stats',
                properties: '/api/v1/properties',
                invoices: '/api/v1/invoices',
            },
        });
    });
}
// Error Middleware
app.use(errorHandler_js_1.errorHandler);
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        logger_js_1.logger.info(`🚀 My Nyumba REST API running on http://localhost:${PORT}`);
    });
}
exports.default = app;
