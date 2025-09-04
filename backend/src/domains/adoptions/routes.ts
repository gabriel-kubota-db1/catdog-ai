import { Router } from 'express';
import { getAllRequests, createRequest, updateRequestStatus } from './controller.js';
import { isAuthenticated, isAdmin } from '../../middlewares/isAuthenticated.js';

const router = Router();

router.get('/', isAuthenticated, isAdmin, getAllRequests);
router.post('/', isAuthenticated, createRequest);
router.patch('/:id/status', isAuthenticated, isAdmin, updateRequestStatus);

export default router;
