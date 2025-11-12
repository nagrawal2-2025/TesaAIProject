-- Extension für UUIDs (wird für IDs benutzt)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-------------------------------------------------
-- USERS TABELLE
-------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Index für schnelle Suche nach Email (Login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-------------------------------------------------
-- USE_CASES TABELLE
-------------------------------------------------

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
    technology_stack TEXT[],          -- z.B. ['Azure OpenAI','Graph RAG','Event Bus']
    tags TEXT[],                      -- z.B. ['high ROI','automation']
    internal_links JSONB,             -- z.B. {"Confluence": "...", "TeamsChannel": "..."}
    related_use_case_ids TEXT[],      -- Liste verwandter Use Case IDs
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Indexe für typische Filter/Listen im UI
CREATE INDEX IF NOT EXISTS idx_use_cases_department ON use_cases(department);
CREATE INDEX IF NOT EXISTS idx_use_cases_status ON use_cases(status);
CREATE INDEX IF NOT EXISTS idx_use_cases_tags ON use_cases USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_use_cases_tech_stack ON use_cases USING GIN (technology_stack);

-------------------------------------------------
-- ADMIN-SEED (optional fürs erste Login)
-------------------------------------------------
-- Hinweis:
-- Das Passwort musst du selber hashen (bcrypt) bevor du hier insertest.
-- Wir legen hier nur die Zeile als Kommentar ab, damit du weißt wie:
--
-- INSERT INTO users (email, password_hash, name, role)
-- VALUES (
--   'philipp.poeschke@tesa.com',
--   '$2b$10$abcdefghijklmnopqrstuv...',  -- <-- bcrypt Hash, kein Klartext
--   'Philipp Pöschke',
--   'admin'
-- )
-- ON CONFLICT (email) DO NOTHING;
--
-- Sobald du einen Admin-User drin hast, kannst du dich im Frontend einloggen,
-- bekommst ein JWT vom /api/auth/login Endpoint
-- und darfst dann Use Cases anlegen / löschen.
