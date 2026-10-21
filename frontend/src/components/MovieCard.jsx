import './MovieCard.css';

function MovieCard({ movie, onClick, onToggleFavorite, isFavorite }) {
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450/1f1f1f/666?text=No+Poster';

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-card-poster">
        <img src={posterUrl} alt={movie.Title} loading="lazy" />
        <div className="movie-card-overlay">
          <button 
            className="view-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Подробнее
          </button>
        </div>
      </div>
      <div className="movie-card-content">
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-info">
          <span className="movie-year">{movie.Year}</span>
          {movie.Type && (
            <span className="movie-type">
              {movie.Type === 'movie' ? '🎬 Фильм' : 
               movie.Type === 'series' ? '📺 Сериал' : 
               '🎮 Игра'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
