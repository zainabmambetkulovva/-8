import './Header.css';

function Header({ onShowFavorites, onShowSearch, favoritesCount, activeView }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          <span className="logo-icon">🎬</span>
          Movie Search
        </h1>
        <nav className="nav">
          <button
            className={`nav-button ${activeView === 'search' ? 'active' : ''}`}
            onClick={onShowSearch}
          >
            🔍 Поиск
          </button>
          <button
            className={`nav-button ${activeView === 'favorites' ? 'active' : ''}`}
            onClick={onShowFavorites}
          >
            ❤️ Избранное
            {favoritesCount > 0 && (
              <span className="favorites-badge">{favoritesCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
