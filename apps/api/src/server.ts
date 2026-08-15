import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { healthRouter } from './routes/health.js';
import authRouter from './routes/auth.js';
import propertiesRouter from './routes/properties.js';
import tenantsRouter from './routes/tenants.js';
import invoicesRouter from './routes/invoices.js';
import paymentsRouter from './routes/payments.js';
import utilitiesRouter from './routes/utilities.js';
import maintenanceRouter from './routes/maintenance.js';
import expensesRouter from './routes/expenses.js';
import dashboardRouter from './routes/dashboard.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './config/logger.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Rate limiting setup
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests from this IP, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 login/register attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts. Please try again after 15 minutes.' },
});

app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(globalLimiter);

// Root & Health Endpoints
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

app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Register API Routes
app.use('/api/v1', healthRouter);
app.use('/api/v1/auth', authLimiter, authRouter);
app.use('/api/v1', propertiesRouter);
app.use('/api/v1', tenantsRouter);
app.use('/api/v1', invoicesRouter);
app.use('/api/v1', paymentsRouter);
app.use('/api/v1', utilitiesRouter);
app.use('/api/v1', maintenanceRouter);
app.use('/api/v1', expensesRouter);
app.use('/api/v1', dashboardRouter);

// Error Middleware
app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    logger.info(`🚀 My Nyumba REST API running on http://localhost:${PORT}`);
  });
}

export default app;
