import { query } from '../config/database';

export interface UseCaseInput {
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

export interface UseCase extends UseCaseInput {
  id: string;
  image_url?: string;
  related_use_case_ids?: string[];
  created_at: string;
  updated_at: string;
}

export const useCaseService = {
  async getAllUseCases(): Promise<UseCase[]> {
    const result = await query(
      'SELECT * FROM use_cases ORDER BY created_at DESC'
    );
    return result.rows;
  },

  async getUseCaseById(id: string): Promise<UseCase | null> {
    const result = await query(
      'SELECT * FROM use_cases WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async createUseCase(input: UseCaseInput): Promise<UseCase> {
    const result = await query(
      `INSERT INTO use_cases (
        title, short_description, full_description, department, status,
        owner_name, owner_email, business_impact, technology_stack,
        tags, application_url, internal_links, related_use_case_ids
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        input.title,
        input.short_description,
        input.full_description,
        input.department,
        input.status,
        input.owner_name,
        input.owner_email,
        input.business_impact || null,
        JSON.stringify(input.technology_stack || []),
        JSON.stringify(input.tags || []),
        input.application_url || null,
        JSON.stringify(input.internal_links || {}),
        JSON.stringify([])
      ]
    );
    return result.rows[0];
  },

  async updateUseCase(id: string, input: Partial<UseCaseInput>): Promise<UseCase> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        if (key === 'technology_stack' || key === 'tags' || key === 'internal_links') {
          values.push(JSON.stringify(value));
        } else {
          values.push(value);
        }
        paramIndex++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const result = await query(
      `UPDATE use_cases SET ${fields.join(', ')}, updated_at = NOW()
       WHERE id = $${paramIndex}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      throw new Error('Use case not found');
    }

    return result.rows[0];
  },

  async deleteUseCase(id: string): Promise<void> {
    const result = await query(
      'DELETE FROM use_cases WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error('Use case not found');
    }
  }
};
