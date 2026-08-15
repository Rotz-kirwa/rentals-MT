import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/properties', PropertyController.listProperties);
router.post('/properties', requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER']), PropertyController.createProperty);
router.get('/properties/:id', PropertyController.getPropertyById);

router.get('/houses', PropertyController.listHouses);
router.post('/houses', requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER']), PropertyController.createHouse);

export default router;
