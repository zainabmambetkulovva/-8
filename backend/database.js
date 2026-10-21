import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'movies.db'));

// Создание таблицы избранных фильмов
db.exec(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imdb_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    year TEXT,
    poster TEXT,
    type TEXT,
    plot TEXT,
    director TEXT,
    actors TEXT,
    genre TEXT,
    runtime TEXT,
    imdb_rating TEXT,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
