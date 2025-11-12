import express from 'express';
import { getAllUseCases, getUseCaseById, createUseCase, updateUseCase, deleteUseCase } from '../controllers/useCasesController';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminOnly } from '../middleware/roleMiddleware';

const router = express.Router();

// Alle Use Cases abrufen
router.get('/', getAllUseCases);

// Einzelnen Use Case abrufen
router.get('/:id', getUseCaseById);

// Neuen Use Case anlegen (erfordert Authentifizierung)
router.post('/', authMiddleware, createUseCase);

// Use Case aktualisieren (erfordert Authentifizierung)
router.put('/:id', authMiddleware, updateUseCase);

// Use Case löschen (nur Admin)
router.delete('/:id', authMiddleware, adminOnly, deleteUseCase);

export default router;
