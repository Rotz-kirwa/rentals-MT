import { Router } from 'express';
import { UtilityController } from '../controllers/utility.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/utilities', UtilityController.listUtilities);
router.get('/utility-readings', UtilityController.listReadings);
router.post('/utility-readings', requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER', 'CARETAKER']), UtilityController.recordReading);

export default router;
