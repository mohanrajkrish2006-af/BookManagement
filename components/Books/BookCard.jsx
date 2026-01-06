import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteIcon } from '../Icons/DeleteIcon';
import { ShoppingCartIcon } from '../Icons/ShoppingCartIcon';
import { formatDate } from '../../utils/helpers';
import { BOOK_STATUS, COLORS } from '../../utils/constants';
import '../styles/BookCard.css';

export function BookCard({ book, onEdit, onDelete }) {
  const navigate = useNavigate();
  const isAvailable = book.status === BOOK_STATUS.AVAILABLE;

  const handleBuy = () => {
    navigate(`/buy-book/${book.id}`);
  };

  return (
    <div className="book-card hover-lift">
      <div className="book-card-header">
        <h3 className="book-card-title">{book.title}</h3>
        <span
          className={`book-card-status ${isAvailable ? 'status-available' : 'status-issued'}`}
        >
          {isAvailable ? 'Available' : 'Issued'}
        </span>
      </div>

      <div className="book-card-body">
        <p className="book-card-author">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="book-card-isbn">
          <strong>ISBN:</strong> {book.isbn}
        </p>
        {!isAvailable && book.issuedTo && (
          <p className="book-card-issued-to">
            <strong>Issued to:</strong> {book.issuedTo}
          </p>
        )}
      </div>

      <div className="book-card-footer">
        <span className="book-card-category">{book.category}</span>
        <div className="book-card-actions">
          <button
            className="book-card-action-btn book-card-action-btn-buy"
            onClick={handleBuy}
            aria-label={`Buy ${book.title}`}
            title="Buy book"
          >
            <ShoppingCartIcon size={18} color={COLORS.success} />
          </button>
          <button
            className="book-card-action-btn"
            onClick={() => onEdit(book.id)}
            aria-label={`Edit ${book.title}`}
            title="Edit book"
          >
            <EditIcon size={18} color={COLORS.textSecondary} />
          </button>
          <button
            className="book-card-action-btn book-card-action-btn-danger"
            onClick={() => onDelete(book.id)}
            aria-label={`Delete ${book.title}`}
            title="Delete book"
          >
            <DeleteIcon size={18} color={COLORS.danger} />
          </button>
        </div>
      </div>

      <div className="book-card-meta">
        <span className="book-card-date">Added {formatDate(book.addedDate)}</span>
      </div>
    </div>
  );
}
