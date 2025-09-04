import { Router } from 'express';
import { register, login, getMe } from './controller.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', isAuthenticated, getMe);

export default router;
