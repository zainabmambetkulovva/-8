import MovieCard from './MovieCard';
import './FavoritesList.css';

function FavoritesList({ favorites, onMovieClick, onRemoveFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="favorites-empty-icon">💔</div>
        <h2>Избранное пусто</h2>
        <p>Добавьте фильмы в избранное, чтобы они появились здесь</p>
      </div>
    );
  }

  // Преобразуем данные из базы в формат, понятный MovieCard
  const convertedMovies = favorites.map(fav => ({
    imdbID: fav.imdb_id,
    Title: fav.title,
    Year: fav.year,
    Poster: fav.poster,
    Type: fav.type,
    Plot: fav.plot,
    Director: fav.director,
    Actors: fav.actors,
    Genre: fav.genre,
    Runtime: fav.runtime,
    imdbRating: fav.imdb_rating
  }));

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>
          <span className="favorites-icon">❤️</span>
          Избранные фильмы
        </h2>
        <p className="favorites-count">
          {favorites.length} {favorites.length === 1 ? 'фильм' : favorites.length < 5 ? 'фильма' : 'фильмов'}
        </p>
      </div>
      <div className="movie-grid">
        {convertedMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => onMovieClick(movie)}
            onToggleFavorite={() => onRemoveFavorite(movie)}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;
