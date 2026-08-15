import { Router } from 'express';
import { LeaseController } from '../controllers/lease.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/tenants', LeaseController.listTenants);
router.post('/tenants', requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER']), LeaseController.registerTenant);

router.get('/leases', LeaseController.listLeases);
router.post('/leases', requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER']), LeaseController.executeLease);
router.patch('/leases/:id/terminate', requireRole(['SUPER_ADMIN', 'PROPERTY_MANAGER']), LeaseController.terminateLease);

export default router;
