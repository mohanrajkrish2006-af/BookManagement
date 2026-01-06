import { GridIcon } from '../Icons/GridIcon';
import { ListIcon } from '../Icons/ListIcon';
import '../styles/ViewToggle.css';

export function ViewToggle({ view, onViewChange }) {
  return (
    <div className="view-toggle" role="group" aria-label="View toggle">
      <button
        className={`view-toggle-btn ${view === 'card' ? 'active' : ''}`}
        onClick={() => onViewChange('card')}
        aria-label="Card view"
        aria-pressed={view === 'card'}
      >
        <GridIcon size={20} />
        <span>Cards</span>
      </button>
      <button
        className={`view-toggle-btn ${view === 'table' ? 'active' : ''}`}
        onClick={() => onViewChange('table')}
        aria-label="Table view"
        aria-pressed={view === 'table'}
      >
        <ListIcon size={20} />
        <span>Table</span>
      </button>
    </div>
  );
}
