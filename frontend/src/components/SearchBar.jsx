import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange, onClear }) {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Введите название фильма..."
            value={inputValue}
            onChange={handleInputChange}
          />
          {inputValue && (
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
              title="Очистить поиск"
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-button">
          Найти
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
