import { Router } from 'express';
import { useCaseController } from '../controllers/useCaseController';

const router = Router();

router.get('/', useCaseController.getAll);
router.get('/:id', useCaseController.getById);
router.post('/', useCaseController.create);
router.put('/:id', useCaseController.update);
router.delete('/:id', useCaseController.delete);

export default router;
