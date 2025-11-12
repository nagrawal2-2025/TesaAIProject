import { readFileSync } from 'fs';
import { join } from 'path';
import pool from '../src/config/database';

async function setupDatabase() {
  try {
    console.log('Setting up database schema...');

    const schemaPath = join(__dirname, '../db/schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    await pool.query(schema);

    console.log('✅ Database schema created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to setup database:', error);
    process.exit(1);
  }
}

setupDatabase();
