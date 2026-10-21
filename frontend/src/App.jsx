import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import FavoritesList from './components/FavoritesList';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Загрузка избранных фильмов при монтировании
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites');
      if (!response.ok) throw new Error('Ошибка загрузки избранных фильмов');
      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      console.error('Ошибка загрузки избранного:', err);
    }
  };

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Ошибка при поиске фильмов');
      }

      const data = await response.json();
      
      if (data.Search && data.Search.length > 0) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка при поиске');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchMovies(query);
    setShowFavorites(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setMovies([]);
    setError(null);
    setHasSearched(false);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleToggleFavorite = async (movie) => {
    const isFavorite = favorites.some(fav => fav.imdb_id === movie.imdbID);

    if (isFavorite) {
      // Удалить из избранного
      try {
        const response = await fetch(`/api/favorites/${movie.imdbID}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setFavorites(favorites.filter(fav => fav.imdb_id !== movie.imdbID));
        }
      } catch (err) {
        console.error('Ошибка удаления из избранного:', err);
      }
    } else {
      // Добавить в избранное
      try {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            imdb_id: movie.imdbID || movie.imdb_id,
            title: movie.Title || movie.title,
            year: movie.Year || movie.year,
            poster: movie.Poster || movie.poster,
            type: movie.Type || movie.type,
            plot: movie.Plot || movie.plot,
            director: movie.Director || movie.director,
            actors: movie.Actors || movie.actors,
            genre: movie.Genre || movie.genre,
            runtime: movie.Runtime || movie.runtime,
            imdb_rating: movie.imdbRating || movie.imdb_rating
          })
        });

        if (response.ok) {
          await fetchFavorites();
        }
      } catch (err) {
        console.error('Ошибка добавления в избранное:', err);
      }
    }
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
    setSearchQuery('');
    setMovies([]);
    setHasSearched(false);
  };

  const handleShowSearch = () => {
    setShowFavorites(false);
  };

  const isFavorite = (imdbID) => {
    return favorites.some(fav => fav.imdb_id === imdbID);
  };

  return (
    <div className="app">
      <Header 
        onShowFavorites={handleShowFavorites}
        onShowSearch={handleShowSearch}
        favoritesCount={favorites.length}
        activeView={showFavorites ? 'favorites' : 'search'}
      />
      
      {!showFavorites && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            onClear={handleClearSearch}
          />

          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Поиск фильмов...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <h3>Произошла ошибка</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && hasSearched && movies.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🎬</div>
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить поисковый запрос</p>
            </div>
          )}

          {!loading && !error && movies.length > 0 && (
            <MovieGrid
              movies={movies}
              onMovieClick={handleMovieClick}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          )}

          {!loading && !error && !hasSearched && (
            <div className="welcome-message">
              <div className="welcome-icon">🍿</div>
              <h2>Добро пожаловать в Movie Search</h2>
              <p>Начните поиск, чтобы найти свои любимые фильмы</p>
            </div>
          )}
        </>
      )}

      {showFavorites && (
        <FavoritesList
          favorites={favorites}
          onMovieClick={handleMovieClick}
          onRemoveFavorite={handleToggleFavorite}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite(selectedMovie.imdbID || selectedMovie.imdb_id)}
        />
      )}
    </div>
  );
}

export default App;
