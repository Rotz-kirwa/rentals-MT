import { Router } from 'express';
import { MaintenanceController } from '../controllers/maintenance.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/maintenance', MaintenanceController.listTickets);
router.post('/maintenance', MaintenanceController.createTicket);
router.patch('/maintenance/:id', requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER', 'CARETAKER']), MaintenanceController.updateTicket);

export default router;
