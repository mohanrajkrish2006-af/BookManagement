import { useEffect } from 'react';
import { CheckIcon } from '../Icons/CheckIcon';
import { CloseIcon } from '../Icons/CloseIcon';
import '../styles/Toast.css';

export function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`} role="alert" aria-live="polite">
      <div className="toast-icon">
        {type === 'success' && <CheckIcon size={20} color="white" />}
        {type === 'error' && <span className="toast-error-icon">!</span>}
      </div>
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <CloseIcon size={16} color="currentColor" />
      </button>
    </div>
  );
}
