import MovieCard from './MovieCard';
import './MovieGrid.css';

function MovieGrid({ movies, onMovieClick, onToggleFavorite, isFavorite }) {
  return (
    <div className="movie-grid-container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => onMovieClick(movie)}
            onToggleFavorite={() => onToggleFavorite(movie)}
            isFavorite={isFavorite(movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieGrid;
