import { Router } from 'express';
import { MaintenanceController } from '../controllers/maintenance.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/expenses', MaintenanceController.listExpenses);
router.post('/expenses', requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER', 'FINANCE_OFFICER']), MaintenanceController.createExpense);

export default router;
