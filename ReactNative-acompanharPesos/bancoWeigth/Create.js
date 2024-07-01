import * as SQLite from 'expo-sqlite';

export const create = async () => {
    let db = null;
    try {
        db = await SQLite.openDatabaseAsync('databaseName');
        await db.execSync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS weights (
                id INTEGER PRIMARY KEY NOT NULL,
                weight float not null,
                date DATE not null 
            );
        `);
        console.log("[LOG] Table 'weights' created or already exists.");
    } catch (error) {
        console.log("[ERROR] Error executing SQL:", error);
    }
    return db;
}
