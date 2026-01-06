import { SearchIcon } from '../Icons/SearchIcon';
import '../styles/SearchBar.css';

export function SearchBar({ value, onChange, placeholder = 'Search books...' }) {
  return (
    <div className="search-bar">
      <SearchIcon size={20} color="var(--color-text-secondary)" />
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search books"
      />
      {value && (
        <button
          className="search-bar-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
          title="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
