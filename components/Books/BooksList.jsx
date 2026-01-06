import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';
import { filterBooks } from '../../utils/helpers';
import { BookCard } from './BookCard';
import { BookTable } from './BookTable';
import { ViewToggle } from './ViewToggle';
import { SearchBar } from '../Common/SearchBar';
import { FilterDropdown } from '../Common/FilterDropdown';
import { EmptyState } from '../Common/EmptyState';
import { Modal } from '../Common/Modal';
import { Button } from '../Common/Button';
import '../styles/BooksList.css';

export function BooksList() {
  const navigate = useNavigate();
  const { books, deleteBook } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [view, setView] = useState(() => {
    return window.innerWidth >= 1024 ? 'table' : 'card';
  });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, bookId: null, bookTitle: '' });

  const filteredBooks = useMemo(
    () => filterBooks(books, searchQuery, categoryFilter),
    [books, searchQuery, categoryFilter]
  );

  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleDeleteClick = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      setDeleteModal({ isOpen: true, bookId, bookTitle: book.title });
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.bookId) {
      deleteBook(deleteModal.bookId);
      setDeleteModal({ isOpen: false, bookId: null, bookTitle: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, bookId: null, bookTitle: '' });
  };

  return (
    <div className="books-list">
      <div className="books-list-header">
        <div>
          <h1 className="books-list-title">Books</h1>
          <p className="books-list-subtitle">Manage your book collection</p>
        </div>
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      <div className="books-list-filters">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterDropdown value={categoryFilter} onChange={setCategoryFilter} />
      </div>

      {filteredBooks.length === 0 ? (
        <EmptyState
          title={books.length === 0 ? 'No books yet' : 'No books found'}
          message={
            books.length === 0
              ? 'Get started by adding your first book to the collection.'
              : 'Try adjusting your search or filter criteria.'
          }
          actionLabel={books.length === 0 ? 'Add Your First Book' : undefined}
        />
      ) : (
        <>
          {view === 'card' ? (
            <div className="books-list-grid">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          ) : (
            <BookTable books={filteredBooks} onEdit={handleEdit} onDelete={handleDeleteClick} />
          )}
        </>
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        title="Delete Book"
        size="sm"
      >
        <div className="delete-modal-content">
          <p>Are you sure you want to delete &quot;{deleteModal.bookTitle}&quot;?</p>
          <p className="delete-modal-warning">This action cannot be undone.</p>
          <div className="delete-modal-actions">
            <Button variant="secondary" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
