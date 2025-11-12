import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllUseCases = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM use_cases ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching use cases:', error);
    res.status(500).json({ error: 'Failed to fetch use cases' });
  }
};

export const getUseCaseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM use_cases WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Use case not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching use case:', error);
    res.status(500).json({ error: 'Failed to fetch use case' });
  }
};

export const createUseCase = async (req: Request, res: Response) => {
  try {
    const {
      title,
      short_description,
      full_description,
      department,
      status,
      owner_name,
      owner_email,
      image_url,
      business_impact,
      application_url,
      technology_stack,
      tags,
      internal_links,
      related_use_case_ids
    } = req.body;

    const result = await pool.query(
      `INSERT INTO use_cases (
        title, short_description, full_description, department, status,
        owner_name, owner_email, image_url, business_impact, application_url,
        technology_stack, tags, internal_links, related_use_case_ids
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        title, short_description, full_description, department, status,
        owner_name, owner_email, image_url, business_impact, application_url,
        JSON.stringify(technology_stack || []),
        JSON.stringify(tags || []),
        JSON.stringify(internal_links || []),
        JSON.stringify(related_use_case_ids || [])
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating use case:', error);
    res.status(500).json({ error: 'Failed to create use case' });
  }
};

export const updateUseCase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      short_description,
      full_description,
      department,
      status,
      owner_name,
      owner_email,
      image_url,
      business_impact,
      application_url,
      technology_stack,
      tags,
      internal_links,
      related_use_case_ids
    } = req.body;

    const result = await pool.query(
      `UPDATE use_cases SET
        title = $1,
        short_description = $2,
        full_description = $3,
        department = $4,
        status = $5,
        owner_name = $6,
        owner_email = $7,
        image_url = $8,
        business_impact = $9,
        application_url = $10,
        technology_stack = $11,
        tags = $12,
        internal_links = $13,
        related_use_case_ids = $14,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $15
      RETURNING *`,
      [
        title, short_description, full_description, department, status,
        owner_name, owner_email, image_url, business_impact, application_url,
        JSON.stringify(technology_stack || []),
        JSON.stringify(tags || []),
        JSON.stringify(internal_links || []),
        JSON.stringify(related_use_case_ids || []),
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Use case not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating use case:', error);
    res.status(500).json({ error: 'Failed to update use case' });
  }
};

export const deleteUseCase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM use_cases WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Use case not found' });
    }

    res.json({ message: 'Use case deleted successfully' });
  } catch (error) {
    console.error('Error deleting use case:', error);
    res.status(500).json({ error: 'Failed to delete use case' });
  }
};
