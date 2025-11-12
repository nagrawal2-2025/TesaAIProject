import { Router } from 'express';
import {
  getAllUseCases,
  getUseCaseById,
  createUseCase,
  updateUseCase,
  deleteUseCase
} from '../controllers/useCaseController';

const router = Router();

router.get('/use-cases', getAllUseCases);
router.get('/use-cases/:id', getUseCaseById);
router.post('/use-cases', createUseCase);
router.put('/use-cases/:id', updateUseCase);
router.delete('/use-cases/:id', deleteUseCase);

export default router;
