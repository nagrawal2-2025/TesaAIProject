"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("../src/db");
// Absoluter Pfad zu deiner SQL-Datei
const filePath = path_1.default.join(__dirname, '../db/migrations/001_init.sql');
async function runMigration() {
    try {
        console.log('🚀 Starte Datenbank-Migration…');
        const sql = fs_1.default.readFileSync(filePath, 'utf8');
        await (0, db_1.query)(sql);
        console.log('✅ Migration erfolgreich abgeschlossen!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Fehler bei der Migration:', error);
        process.exit(1);
    }
}
runMigration();
