import { useState, useEffect } from 'react';
import './MovieModal.css';

function MovieModal({ movie, onClose, onToggleFavorite, isFavorite }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const imdbId = movie.imdbID || movie.imdb_id;
        const response = await fetch(`/api/movie/${imdbId}`);
        
        if (response.ok) {
          const data = await response.json();
          setMovieDetails(data);
        } else {
          setMovieDetails(movie);
        }
      } catch (error) {
        console.error('Ошибка загрузки деталей:', error);
        setMovieDetails(movie);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const posterUrl = movieDetails?.Poster && movieDetails.Poster !== 'N/A'
    ? movieDetails.Poster
    : movie?.poster || 'https://via.placeholder.com/300x450/1f1f1f/666?text=No+Poster';

  const displayMovie = movieDetails || movie;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        
        {loading ? (
          <div className="modal-loading">
            <div className="spinner"></div>
            <p>Загрузка деталей...</p>
          </div>
        ) : (
          <div className="modal-body">
            <div className="modal-poster">
              <img src={posterUrl} alt={displayMovie.Title || displayMovie.title} />
            </div>
            
            <div className="modal-details">
              <div className="modal-header">
                <h2>{displayMovie.Title || displayMovie.title}</h2>
                <button
                  className={`modal-favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => onToggleFavorite(displayMovie)}
                >
                  {isFavorite ? '❤️ В избранном' : '🤍 В избранное'}
                </button>
              </div>

              <div className="modal-meta">
                {displayMovie.Year && (
                  <span className="meta-item">📅 {displayMovie.Year}</span>
                )}
                {displayMovie.Runtime && displayMovie.Runtime !== 'N/A' && (
                  <span className="meta-item">⏱️ {displayMovie.Runtime}</span>
                )}
                {displayMovie.imdbRating && displayMovie.imdbRating !== 'N/A' && (
                  <span className="meta-item rating">⭐ {displayMovie.imdbRating}/10</span>
                )}
              </div>

              {displayMovie.Genre && displayMovie.Genre !== 'N/A' && (
                <div className="modal-section">
                  <h3>Жанры</h3>
                  <div className="genre-tags">
                    {displayMovie.Genre.split(', ').map((genre, index) => (
                      <span key={index} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                </div>
              )}

              {displayMovie.Plot && displayMovie.Plot !== 'N/A' && (
                <div className="modal-section">
                  <h3>Описание</h3>
                  <p className="plot-text">{displayMovie.Plot}</p>
                </div>
              )}

              {displayMovie.Director && displayMovie.Director !== 'N/A' && (
                <div className="modal-section">
                  <h3>Режиссёр</h3>
                  <p>{displayMovie.Director}</p>
                </div>
              )}

              {displayMovie.Actors && displayMovie.Actors !== 'N/A' && (
                <div className="modal-section">
                  <h3>Актёры</h3>
                  <p>{displayMovie.Actors}</p>
                </div>
              )}

              {displayMovie.Writer && displayMovie.Writer !== 'N/A' && (
                <div className="modal-section">
                  <h3>Сценарист</h3>
                  <p>{displayMovie.Writer}</p>
                </div>
              )}

              {displayMovie.Awards && displayMovie.Awards !== 'N/A' && (
                <div className="modal-section">
                  <h3>Награды</h3>
                  <p>{displayMovie.Awards}</p>
                </div>
              )}

              {displayMovie.Country && displayMovie.Country !== 'N/A' && (
                <div className="modal-section">
                  <h3>Страна</h3>
                  <p>{displayMovie.Country}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
