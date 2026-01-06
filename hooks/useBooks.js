import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId, validateBook } from '../utils/helpers';
import { STORAGE_KEY, DEFAULT_BOOKS, BOOK_STATUS } from '../utils/constants';

export function useBooks() {
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, DEFAULT_BOOKS);
  const [error, setError] = useState(null);

  const initializeBooks = useCallback(() => {
    if (books.length === 0) {
      setBooks(DEFAULT_BOOKS);
    }
  }, [books.length, setBooks]);

  const getAllBooks = useCallback(() => {
    return books;
  }, [books]);

  const getBookById = useCallback(
    (id) => {
      return books.find((book) => book.id === id) || null;
    },
    [books]
  );

  const addBook = useCallback(
    (bookData) => {
      const validation = validateBook(bookData);
      if (!validation.isValid) {
        setError(validation.errors);
        return { success: false, errors: validation.errors };
      }

      const newBook = {
        id: generateId(),
        ...bookData,
        addedDate: new Date().toISOString(),
        issuedTo: bookData.status === BOOK_STATUS.ISSUED ? bookData.issuedTo || '' : '',
      };

      setBooks((prevBooks) => [...prevBooks, newBook]);
      setError(null);
      return { success: true, book: newBook };
    },
    [setBooks]
  );

  const updateBook = useCallback(
    (id, bookData) => {
      const validation = validateBook(bookData);
      if (!validation.isValid) {
        setError(validation.errors);
        return { success: false, errors: validation.errors };
      }

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id
            ? {
                ...book,
                ...bookData,
                issuedTo: bookData.status === BOOK_STATUS.ISSUED ? bookData.issuedTo || '' : '',
              }
            : book
        )
      );
      setError(null);
      return { success: true };
    },
    [setBooks]
  );

  const deleteBook = useCallback(
    (id) => {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      setError(null);
      return { success: true };
    },
    [setBooks]
  );

  const toggleBookStatus = useCallback(
    (id) => {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id
            ? {
                ...book,
                status:
                  book.status === BOOK_STATUS.AVAILABLE
                    ? BOOK_STATUS.ISSUED
                    : BOOK_STATUS.AVAILABLE,
                issuedTo:
                  book.status === BOOK_STATUS.AVAILABLE
                    ? book.issuedTo || 'Unknown'
                    : '',
              }
            : book
        )
      );
      setError(null);
      return { success: true };
    },
    [setBooks]
  );

  return {
    books,
    error,
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    toggleBookStatus,
    initializeBooks,
  };
}
