import { Request, Response } from 'express';
import { useCaseService, UseCaseInput } from '../services/useCaseService';

export const useCaseController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const useCases = await useCaseService.getAllUseCases();
      res.status(200).json({
        success: true,
        data: useCases,
        count: useCases.length
      });
    } catch (error) {
      console.error('Error fetching use cases:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch use cases',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = await useCaseService.getUseCaseById(id);

      if (!useCase) {
        res.status(404).json({
          success: false,
          message: 'Use case not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: useCase
      });
    } catch (error) {
      console.error('Error fetching use case:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch use case',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    try {
      const input: UseCaseInput = req.body;

      if (!input.title || !input.short_description || !input.full_description ||
          !input.department || !input.status || !input.owner_name || !input.owner_email) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.owner_email)) {
        res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
        return;
      }

      const newUseCase = await useCaseService.createUseCase(input);

      res.status(201).json({
        success: true,
        message: 'Use case created successfully',
        data: newUseCase
      });
    } catch (error) {
      console.error('Error creating use case:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create use case',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const input: Partial<UseCaseInput> = req.body;

      if (input.owner_email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.owner_email)) {
          res.status(400).json({
            success: false,
            message: 'Invalid email format'
          });
          return;
        }
      }

      const existingUseCase = await useCaseService.getUseCaseById(id);
      if (!existingUseCase) {
        res.status(404).json({
          success: false,
          message: 'Use case not found'
        });
        return;
      }

      const updatedUseCase = await useCaseService.updateUseCase(id, input);

      res.status(200).json({
        success: true,
        message: 'Use case updated successfully',
        data: updatedUseCase
      });
    } catch (error) {
      console.error('Error updating use case:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update use case',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const existingUseCase = await useCaseService.getUseCaseById(id);
      if (!existingUseCase) {
        res.status(404).json({
          success: false,
          message: 'Use case not found'
        });
        return;
      }

      await useCaseService.deleteUseCase(id);

      res.status(200).json({
        success: true,
        message: 'Use case deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting use case:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete use case',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};
