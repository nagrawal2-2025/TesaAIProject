import { Request, Response } from 'express';
import { query } from '../db';

// Alle Use Cases abrufen
export async function getAllUseCases(req: Request, res: Response) {
  try {
    const result = await query('SELECT * FROM use_cases ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Fehler beim Laden der Use Cases:', error);
    res.status(500).json({ error: 'Fehler beim Laden der Use Cases' });
  }
}

// Einzelnen Use Case abrufen
export async function getUseCaseById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM use_cases WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Use Case nicht gefunden' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Fehler beim Abrufen des Use Cases:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen des Use Cases' });
  }
}

// Neuen Use Case erstellen
export async function createUseCase(req: Request, res: Response) {
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
      technology_stack,
      tags,
      internal_links,
      related_use_case_ids,
      application_url
    } = req.body;

    const result = await query(
      `INSERT INTO use_cases
      (title, short_description, full_description, department, status, owner_name, owner_email, image_url, business_impact, technology_stack, tags, internal_links, related_use_case_ids, application_url, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,NOW(),NOW())
      RETURNING *`,
      [title, short_description, full_description, department, status, owner_name, owner_email, image_url, business_impact, technology_stack, tags, internal_links, related_use_case_ids, application_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Fehler beim Erstellen des Use Cases:', error);
    res.status(500).json({ error: 'Fehler beim Erstellen des Use Cases' });
  }
}

// Use Case aktualisieren
export async function updateUseCase(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const fields = req.body;

    const setClause = Object.keys(fields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = Object.values(fields);
    values.push(id);

    const result = await query(
      `UPDATE use_cases SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Use Case nicht gefunden' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Use Cases:', error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Use Cases' });
  }
}

// Use Case löschen
export async function deleteUseCase(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM use_cases WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Use Case nicht gefunden' });
    }

    res.json({ message: 'Use Case erfolgreich gelöscht' });
  } catch (error) {
    console.error('Fehler beim Löschen des Use Cases:', error);
    res.status(500).json({ error: 'Fehler beim Löschen des Use Cases' });
  }
}
