import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
}

export async function migrate() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      category TEXT,
      tags TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )
  `);
}

migrate().then(() => {
  console.log('Migration completed');
});
