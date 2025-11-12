import { supabase } from '../config/supabase';

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
    const { data, error } = await supabase
      .from('use_cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch use cases: ${error.message}`);
    }

    return data || [];
  },

  async getUseCaseById(id: string): Promise<UseCase | null> {
    const { data, error } = await supabase
      .from('use_cases')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch use case: ${error.message}`);
    }

    return data;
  },

  async createUseCase(input: UseCaseInput): Promise<UseCase> {
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

    return data;
  },

  async updateUseCase(id: string, input: Partial<UseCaseInput>): Promise<UseCase> {
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

    return data;
  },

  async deleteUseCase(id: string): Promise<void> {
    const { error } = await supabase
      .from('use_cases')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete use case: ${error.message}`);
    }
  }
};
