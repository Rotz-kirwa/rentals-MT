import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller.js';
import { MpesaController } from '../controllers/mpesa.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/payments', requireAuth, PaymentController.listPayments);
router.post('/payments', requireAuth, requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER', 'FINANCE_OFFICER']), PaymentController.recordPayment);

router.post('/payments/mpesa/stk-push', requireAuth, MpesaController.initiateStkPush);
router.post('/payments/mpesa/callback', MpesaController.handleCallback);

export default router;
