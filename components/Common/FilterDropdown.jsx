import { CATEGORIES } from '../../utils/constants';
import '../styles/FilterDropdown.css';

export function FilterDropdown({ value, onChange }) {
  return (
    <div className="filter-dropdown">
      <select
        className="filter-dropdown-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
