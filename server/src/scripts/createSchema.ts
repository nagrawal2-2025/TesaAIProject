import pool from '../config/database';

const createSchema = async () => {
  const client = await pool.connect();

  try {
    console.log('Creating use_cases table...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS use_cases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        short_description TEXT NOT NULL,
        full_description TEXT NOT NULL,
        department VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'in_development', 'planned')),
        owner_name VARCHAR(255) NOT NULL,
        owner_email VARCHAR(255) NOT NULL CHECK (owner_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
        image_url TEXT,
        business_impact TEXT,
        application_url TEXT,
        technology_stack JSONB DEFAULT '[]'::jsonb,
        tags JSONB DEFAULT '[]'::jsonb,
        internal_links JSONB DEFAULT '[]'::jsonb,
        related_use_case_ids JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating indexes...');

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_use_cases_department ON use_cases(department);
      CREATE INDEX IF NOT EXISTS idx_use_cases_status ON use_cases(status);
      CREATE INDEX IF NOT EXISTS idx_use_cases_tags ON use_cases USING GIN (tags);
      CREATE INDEX IF NOT EXISTS idx_use_cases_created_at ON use_cases(created_at DESC);
    `);

    console.log('Creating trigger for updated_at...');

    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await client.query(`
      DROP TRIGGER IF EXISTS update_use_cases_updated_at ON use_cases;
    `);

    await client.query(`
      CREATE TRIGGER update_use_cases_updated_at
        BEFORE UPDATE ON use_cases
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log('Schema created successfully!');
  } catch (error) {
    console.error('Error creating schema:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

createSchema();
