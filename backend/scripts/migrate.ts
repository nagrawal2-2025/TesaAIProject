import fs from 'fs';
import path from 'path';
import { query } from '../src/db';

// Absoluter Pfad zu deiner SQL-Datei
const filePath = path.join(__dirname, '../db/migrations/001_init.sql');

async function runMigration() {
  try {
    console.log('🚀 Starte Datenbank-Migration…');

    const sql = fs.readFileSync(filePath, 'utf8');
    await query(sql);

    console.log('✅ Migration erfolgreich abgeschlossen!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler bei der Migration:', error);
    process.exit(1);
  }
}

runMigration();
