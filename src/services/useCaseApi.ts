import { UseCase } from '../types';
import { supabase } from '../lib/supabase';

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

export const useCaseApi = {
  async getAll(): Promise<UseCase[]> {
    const { data, error } = await supabase
      .from('use_cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch use cases: ${error.message}`);
    }

    return data || [];
  },

  async getById(id: string): Promise<UseCase> {
    const { data, error } = await supabase
      .from('use_cases')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch use case: ${error.message}`);
    }

    if (!data) {
      throw new Error('Use case not found');
    }

    return data as UseCase;
  },

  async create(input: CreateUseCaseInput): Promise<UseCase> {
    const { data, error } = await supabase
      .from('use_cases')
      .insert({
        title: input.title,
        short_description: input.short_description,
        full_description: input.full_description,
        department: input.department,
        status: input.status,
        owner_name: input.owner_name,
        owner_email: input.owner_email,
        business_impact: input.business_impact || null,
        technology_stack: input.technology_stack || [],
        tags: input.tags || [],
        application_url: input.application_url || null,
        internal_links: input.internal_links || {},
        related_use_case_ids: []
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create use case: ${error.message}`);
    }

    return data as UseCase;
  },

  async update(id: string, input: Partial<CreateUseCaseInput>): Promise<UseCase> {
    const updateData: any = {
      ...input,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('use_cases')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update use case: ${error.message}`);
    }

    return data as UseCase;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('use_cases')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete use case: ${error.message}`);
    }
  },
};
