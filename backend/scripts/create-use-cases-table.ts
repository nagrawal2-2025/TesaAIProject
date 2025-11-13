import { query } from '../src/db';

async function createUseCasesTable() {
  try {
    console.log('🚀 Creating use_cases table...');

    // Create the use_cases table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS use_cases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        short_description TEXT,
        full_description TEXT,
        department TEXT,
        status TEXT,
        owner_name TEXT,
        owner_email TEXT,
        image_url TEXT,
        business_impact TEXT,
        application_url TEXT,
        technology_stack TEXT[],
        tags TEXT[],
        internal_links JSONB,
        related_use_case_ids TEXT[],
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
      );
    `;

    await query(createTableSQL);

    // Create indexes
    const createIndexesSQL = `
      CREATE INDEX IF NOT EXISTS idx_use_cases_department ON use_cases(department);
      CREATE INDEX IF NOT EXISTS idx_use_cases_status ON use_cases(status);
      CREATE INDEX IF NOT EXISTS idx_use_cases_tags ON use_cases USING GIN (tags);
      CREATE INDEX IF NOT EXISTS idx_use_cases_tech_stack ON use_cases USING GIN (technology_stack);
    `;

    await query(createIndexesSQL);

    console.log('✅ use_cases table created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create use_cases table:', error);
    process.exit(1);
  }
}

createUseCasesTable();