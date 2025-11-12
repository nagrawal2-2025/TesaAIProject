import { UseCase } from '../types';

const API_BASE_URL = 'http://localhost:3001/api/usecases';

export interface CreateUseCaseInput {
  title: string;
  short_description: string;
  full_description: string;
  department: string;
  status: string;
  owner_name: string;
  owner_email: string;
  business_impact?: string;
  technology_stack?: string[];
  tags?: string[];
  application_url?: string;
  internal_links?: {
    sharepoint?: string;
    confluence?: string;
    demo?: string;
    bits?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

export const useCaseApi = {
  async getAll(): Promise<UseCase[]> {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch use cases');
    }

    const result: ApiResponse<UseCase[]> = await response.json();
    return result.data || [];
  },

  async getById(id: string): Promise<UseCase> {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch use case');
    }

    const result: ApiResponse<UseCase> = await response.json();

    if (!result.data) {
      throw new Error('Use case not found');
    }

    return result.data;
  },

  async create(input: CreateUseCaseInput): Promise<UseCase> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const result: ApiResponse<never> = await response.json();
      throw new Error(result.message || 'Failed to create use case');
    }

    const result: ApiResponse<UseCase> = await response.json();

    if (!result.data) {
      throw new Error('Failed to create use case');
    }

    return result.data;
  },

  async update(id: string, input: Partial<CreateUseCaseInput>): Promise<UseCase> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const result: ApiResponse<never> = await response.json();
      throw new Error(result.message || 'Failed to update use case');
    }

    const result: ApiResponse<UseCase> = await response.json();

    if (!result.data) {
      throw new Error('Failed to update use case');
    }

    return result.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const result: ApiResponse<never> = await response.json();
      throw new Error(result.message || 'Failed to delete use case');
    }
  },
};
