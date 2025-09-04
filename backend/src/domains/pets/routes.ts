import { Router } from 'express';
import { getAllPets, getPetById, createPet, updatePet, deletePet } from './controller.js';
import { isAuthenticated, isAdmin } from '../../middlewares/isAuthenticated.js';

const router = Router();

router.get('/', getAllPets);
router.get('/:id', getPetById);
router.post('/', isAuthenticated, isAdmin, createPet);
router.put('/:id', isAuthenticated, isAdmin, updatePet);
router.delete('/:id', isAuthenticated, isAdmin, deletePet);

export default router;
