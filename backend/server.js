import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

app.use(cors());
app.use(express.json());

// Валидация API ключа
if (!OMDB_API_KEY) {
  console.error('Ошибка: OMDB_API_KEY не найден в переменных окружения');
  process.exit(1);
}

// Поиск фильмов через OMDb API
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Параметр query обязателен' });
    }

    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`
    );
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      return res.json({ Search: [], totalResults: '0' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Ошибка поиска:', error);
    res.status(500).json({ error: 'Ошибка при поиске фильмов' });
  }
});

// Получение деталей фильма
app.get('/api/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'ID фильма обязателен' });
    }

    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    );
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      return res.status(404).json({ error: data.Error || 'Фильм не найден' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Ошибка получения деталей:', error);
    res.status(500).json({ error: 'Ошибка при получении деталей фильма' });
  }
});

// Получить все избранные фильмы
app.get('/api/favorites', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM favorites ORDER BY added_at DESC');
    const favorites = stmt.all();
    res.json(favorites);
  } catch (error) {
    console.error('Ошибка получения избранного:', error);
    res.status(500).json({ error: 'Ошибка при получении избранных фильмов' });
  }
});

// Добавить фильм в избранное
app.post('/api/favorites', (req, res) => {
  try {
    const { 
      imdb_id, 
      title, 
      year, 
      poster, 
      type,
      plot,
      director,
      actors,
      genre,
      runtime,
      imdb_rating
    } = req.body;
    
    if (!imdb_id || !title) {
      return res.status(400).json({ error: 'imdb_id и title обязательны' });
    }

    const stmt = db.prepare(`
      INSERT INTO favorites (imdb_id, title, year, poster, type, plot, director, actors, genre, runtime, imdb_rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      imdb_id, 
      title, 
      year || null, 
      poster || null, 
      type || null,
      plot || null,
      director || null,
      actors || null,
      genre || null,
      runtime || null,
      imdb_rating || null
    );
    
    res.status(201).json({ 
      id: result.lastInsertRowid,
      imdb_id,
      title,
      message: 'Фильм добавлен в избранное' 
    });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Фильм уже в избранном' });
    }
    console.error('Ошибка добавления в избранное:', error);
    res.status(500).json({ error: 'Ошибка при добавлении фильма в избранное' });
  }
});

// Удалить фильм из избранного
app.delete('/api/favorites/:imdbId', (req, res) => {
  try {
    const { imdbId } = req.params;
    
    if (!imdbId) {
      return res.status(400).json({ error: 'ID фильма обязателен' });
    }

    const stmt = db.prepare('DELETE FROM favorites WHERE imdb_id = ?');
    const result = stmt.run(imdbId);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Фильм не найден в избранном' });
    }
    
    res.json({ message: 'Фильм удален из избранного' });
  } catch (error) {
    console.error('Ошибка удаления из избранного:', error);
    res.status(500).json({ error: 'Ошибка при удалении фильма из избранного' });
  }
});

// Проверить, находится ли фильм в избранном
app.get('/api/favorites/:imdbId', (req, res) => {
  try {
    const { imdbId } = req.params;
    
    const stmt = db.prepare('SELECT * FROM favorites WHERE imdb_id = ?');
    const favorite = stmt.get(imdbId);
    
    res.json({ isFavorite: !!favorite, favorite });
  } catch (error) {
    console.error('Ошибка проверки избранного:', error);
    res.status(500).json({ error: 'Ошибка при проверке избранного' });
  }
});

// Проверка здоровья сервера
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Сервер работает' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`API доступно по адресу http://localhost:${PORT}/api`);
});
