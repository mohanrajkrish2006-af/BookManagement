import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteIcon } from '../Icons/DeleteIcon';
import { ShoppingCartIcon } from '../Icons/ShoppingCartIcon';
import { formatDate } from '../../utils/helpers';
import { BOOK_STATUS, COLORS } from '../../utils/constants';
import '../styles/BookTable.css';

export function BookTable({ books, onEdit, onDelete }) {
  const navigate = useNavigate();

  if (books.length === 0) {
    return null;
  }

  const handleBuy = (bookId) => {
    navigate(`/buy-book/${bookId}`);
  };

  return (
    <div className="book-table-container">
      <table className="book-table" role="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Status</th>
            <th>Issued To</th>
            <th>Added Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const isAvailable = book.status === BOOK_STATUS.AVAILABLE;
            return (
              <tr key={book.id}>
                <td className="book-table-title">{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <span className="book-table-category">{book.category}</span>
                </td>
                <td className="book-table-isbn">{book.isbn}</td>
                <td>
                  <span
                    className={`book-table-status ${isAvailable ? 'status-available' : 'status-issued'}`}
                  >
                    {isAvailable ? 'Available' : 'Issued'}
                  </span>
                </td>
                <td>{book.issuedTo || '-'}</td>
                <td className="book-table-date">{formatDate(book.addedDate)}</td>
                <td>
                  <div className="book-table-actions">
                    <button
                      className="book-table-action-btn book-table-action-btn-buy"
                      onClick={() => handleBuy(book.id)}
                      aria-label={`Buy ${book.title}`}
                      title="Buy book"
                    >
                      <ShoppingCartIcon size={18} color={COLORS.success} />
                    </button>
                    <button
                      className="book-table-action-btn"
                      onClick={() => onEdit(book.id)}
                      aria-label={`Edit ${book.title}`}
                      title="Edit book"
                    >
                      <EditIcon size={18} color={COLORS.textSecondary} />
                    </button>
                    <button
                      className="book-table-action-btn book-table-action-btn-danger"
                      onClick={() => onDelete(book.id)}
                      aria-label={`Delete ${book.title}`}
                      title="Delete book"
                    >
                      <DeleteIcon size={18} color={COLORS.danger} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
