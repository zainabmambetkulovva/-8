# 🎬 Movie Search - Приложение для поиска фильмов

Современное веб-приложение для поиска фильмов с использованием OMDb API, React и Node.js.

## 🚀 Функциональность

- ✅ **Поиск фильмов** по названию через OMDb API
- ✅ **Детальная информация** о фильме в модальном окне
- ✅ **Избранное** с сохранением в базе данных SQLite
- ✅ **Адаптивный дизайн** для всех устройств
- ✅ **Состояния загрузки и ошибок**
- ✅ **Кнопка очистки поиска**
- ✅ **Отображение постера, названия, года, жанра, рейтинга**

## 🛠 Технологии

### Frontend
- React 18
- Vite
- CSS3 (адаптивная вёрстка)

### Backend
- Node.js
- Express
- SQLite (better-sqlite3)
- OMDb API

## 📋 Требования

- Node.js версии 16 или выше
- npm или yarn
- API ключ от OMDb (бесплатный)

## 🔧 Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/zainabmambetkulovva/-8.git
cd проект8
```

### 2. Получение API ключа OMDb

1. Перейдите на https://www.omdbapi.com/apikey.aspx
2. Выберите FREE план (1000 запросов в день)
3. Введите email и получите ключ
4. Активируйте ключ по ссылке из письма

### 3. Настройка переменных окружения

Создайте файл `.env` в корневой папке проекта:

```bash
OMDB_API_KEY=ваш_api_ключ_здесь
PORT=5000
```

### 4. Установка зависимостей Backend

```bash
cd backend
npm install
```

### 5. Установка зависимостей Frontend

```bash
cd ../frontend
npm install
```

### 6. Запуск приложения

#### Вариант 1: Запуск отдельно (рекомендуется для разработки)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Сервер запустится на http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Приложение откроется на http://localhost:3000

#### Вариант 2: Запуск для продакшена

```bash
# Сборка frontend
cd frontend
npm run build

# Запуск backend (будет раздавать собранный frontend)
cd ../backend
npm start
```

## 📁 Структура проекта

```
проект8/
├── backend/
│   ├── server.js          # Express сервер и API routes
│   ├── database.js        # Настройка SQLite
│   ├── package.json
│   └── movies.db          # База данных (создаётся автоматически)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SearchBar.css
│   │   │   ├── MovieGrid.jsx
│   │   │   ├── MovieGrid.css
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieCard.css
│   │   │   ├── MovieModal.jsx
│   │   │   ├── MovieModal.css
│   │   │   ├── FavoritesList.jsx
│   │   │   └── FavoritesList.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Backend API

- `GET /api/search?query=<название>` - Поиск фильмов
- `GET /api/movie/:id` - Получение деталей фильма
- `GET /api/favorites` - Получение всех избранных фильмов
- `POST /api/favorites` - Добавление фильма в избранное
- `DELETE /api/favorites/:imdbId` - Удаление из избранного
- `GET /api/favorites/:imdbId` - Проверка, в избранном ли фильм
- `GET /api/health` - Проверка работы сервера

## 🎨 Особенности интерфейса

- Современный тёмный дизайн
- Плавные анимации и переходы
- Адаптивная сетка карточек фильмов
- Модальное окно с подробной информацией
- Визуальная обратная связь (состояния загрузки, ошибок)
- Иконки и эмодзи для улучшения UX

## 🔒 Безопасность

- API ключи хранятся в `.env` файле (не в репозитории)
- Валидация входных данных на backend
- Обработка ошибок API
- CORS настроен для безопасности

## 🐛 Решение проблем

### Ошибка "OMDB_API_KEY не найден"
- Убедитесь, что создали `.env` файл в корневой папке
- Проверьте, что ключ активирован по ссылке из email

### Ошибка подключения к backend
- Убедитесь, что backend запущен на порту 5000
- Проверьте, что порт не занят другим приложением

### Фильмы не загружаются
- Проверьте интернет-соединение
- Убедитесь, что API ключ активен
- Проверьте лимиты запросов (1000 в день для free плана)

## 📝 Лицензия

MIT

## 👤 Автор

Проект создан как демонстрация работы с React, Node.js и внешними API.

## 🤝 Вклад

Pull requests приветствуются! Для крупных изменений сначала откройте issue для обсуждения.
