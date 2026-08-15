import { Router } from 'express';
import { BillingController } from '../controllers/billing.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/invoices', BillingController.listInvoices);
router.get('/invoices/:id', BillingController.getInvoiceById);
router.post('/invoices/generate-monthly', requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER', 'FINANCE_OFFICER']), BillingController.generateMonthlyInvoices);

export default router;
