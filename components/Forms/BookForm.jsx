import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';
import { CATEGORIES, BOOK_STATUS } from '../../utils/constants';
import { FormField } from './FormField';
import { Button } from '../Common/Button';
import { Toast } from '../Common/Toast';
import '../styles/BookForm.css';

export function BookForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookById, addBook, updateBook } = useBooks();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
    status: BOOK_STATUS.AVAILABLE,
    issuedTo: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (isEditMode) {
      const book = getBookById(id);
      if (book) {
        setFormData({
          title: book.title || '',
          author: book.author || '',
          category: book.category || '',
          isbn: book.isbn || '',
          status: book.status || BOOK_STATUS.AVAILABLE,
          issuedTo: book.issuedTo || '',
        });
      } else {
        navigate('/books');
      }
    }
  }, [id, isEditMode, getBookById, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const bookData = {
      ...formData,
      issuedTo: formData.status === BOOK_STATUS.ISSUED ? formData.issuedTo : '',
    };

    const result = isEditMode ? updateBook(id, bookData) : addBook(bookData);

    if (result.success) {
      setToast({
        show: true,
        message: isEditMode ? 'Book updated successfully!' : 'Book added successfully!',
        type: 'success',
      });
      setTimeout(() => {
        navigate('/books');
      }, 1500);
    } else {
      setErrors(result.errors || {});
      setToast({
        show: true,
        message: 'Please fix the errors in the form.',
        type: 'error',
      });
    }

    setIsSubmitting(false);
  };

  const handleReset = () => {
    if (isEditMode) {
      const book = getBookById(id);
      if (book) {
        setFormData({
          title: book.title || '',
          author: book.author || '',
          category: book.category || '',
          isbn: book.isbn || '',
          status: book.status || BOOK_STATUS.AVAILABLE,
          issuedTo: book.issuedTo || '',
        });
      }
    } else {
      setFormData({
        title: '',
        author: '',
        category: '',
        isbn: '',
        status: BOOK_STATUS.AVAILABLE,
        issuedTo: '',
      });
    }
    setErrors({});
  };

  return (
    <div className="book-form-container">
      <div className="book-form-header">
        <h1 className="book-form-title">{isEditMode ? 'Edit Book' : 'Add New Book'}</h1>
        <p className="book-form-subtitle">
          {isEditMode ? 'Update book information' : 'Fill in the details to add a new book'}
        </p>
      </div>

      <form className="book-form" onSubmit={handleSubmit}>
        <div className="book-form-grid">
          <FormField
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            required
          />

          <FormField
            label="Author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            error={errors.author}
            required
          />

          <FormField
            label="Category"
            name="category"
            type="select"
            value={formData.category}
            onChange={handleChange}
            error={errors.category}
            options={CATEGORIES}
            required
          />

          <FormField
            label="ISBN"
            name="isbn"
            type="text"
            value={formData.isbn}
            onChange={handleChange}
            error={errors.isbn}
            placeholder="978-0-123456-78-9"
            required
          />

          <FormField
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleChange}
            error={errors.status}
            options={[BOOK_STATUS.AVAILABLE, BOOK_STATUS.ISSUED]}
            required
          />

          {formData.status === BOOK_STATUS.ISSUED && (
            <FormField
              label="Issued To"
              name="issuedTo"
              type="text"
              value={formData.issuedTo}
              onChange={handleChange}
              error={errors.issuedTo}
              placeholder="Enter person's name"
              required
            />
          )}
        </div>

        <div className="book-form-actions">
          <Button type="button" variant="secondary" onClick={() => navigate('/books')}>
            Cancel
          </Button>
          <Button type="button" variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Book' : 'Add Book'}
          </Button>
        </div>
      </form>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}
