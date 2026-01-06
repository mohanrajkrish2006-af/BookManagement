import { BookIcon } from '../Icons/BookIcon';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import '../styles/EmptyState.css';

export function EmptyState({ title, message, actionLabel, onAction }) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      navigate('/add-book');
    }
  };

  return (
    <div className="empty-state">
      <div className="empty-state-illustration">
        <div className="empty-state-image-placeholder">
          <svg
            width="280"
            height="200"
            viewBox="0 0 280 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect width="280" height="200" fill="var(--color-background)" rx="8" />
            
            {/* Book Stack Illustration */}
            <g opacity="0.6">
              {/* Book 1 */}
              <rect x="80" y="60" width="60" height="80" rx="4" fill="var(--color-card)" stroke="var(--color-text-secondary)" strokeWidth="2" />
              <rect x="85" y="65" width="50" height="6" rx="2" fill="var(--color-primary)" opacity="0.3" />
              <rect x="85" y="75" width="40" height="4" rx="2" fill="var(--color-text-secondary)" opacity="0.2" />
              <rect x="85" y="82" width="35" height="4" rx="2" fill="var(--color-text-secondary)" opacity="0.2" />
              
              {/* Book 2 */}
              <rect x="100" y="50" width="60" height="80" rx="4" fill="var(--color-card)" stroke="var(--color-text-secondary)" strokeWidth="2" />
              <rect x="105" y="55" width="50" height="6" rx="2" fill="var(--color-accent)" opacity="0.3" />
              <rect x="105" y="65" width="40" height="4" rx="2" fill="var(--color-text-secondary)" opacity="0.2" />
              <rect x="105" y="72" width="35" height="4" rx="2" fill="var(--color-text-secondary)" opacity="0.2" />
              
              {/* Book 3 */}
              <rect x="120" y="70" width="60" height="80" rx="4" fill="var(--color-card)" stroke="var(--color-text-secondary)" strokeWidth="2" />
              <rect x="125" y="75" width="50" height="6" rx="2" fill="var(--color-success)" opacity="0.3" />
              <rect x="125" y="85" width="40" height="4" rx="2" fill="var(--color-text-secondary)" opacity="0.2" />
              <rect x="125" y="92" width="35" height="4" rx="2" fill="var(--color-text-secondary)" opacity="0.2" />
            </g>
            
            {/* Decorative elements */}
            <circle cx="140" cy="100" r="3" fill="var(--color-accent)" opacity="0.4" />
            <circle cx="50" cy="120" r="2" fill="var(--color-text-secondary)" opacity="0.3" />
            <circle cx="230" cy="80" r="2" fill="var(--color-text-secondary)" opacity="0.3" />
          </svg>
        </div>
      </div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-message">{message}</p>
      {actionLabel && (
        <Button variant="primary" onClick={handleAction} size="lg">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
