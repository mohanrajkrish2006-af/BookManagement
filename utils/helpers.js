export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function validateBook(book) {
  const errors = {};

  if (!book.title || book.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (book.title.trim().length < 2) {
    errors.title = 'Title must be at least 2 characters';
  }

  if (!book.author || book.author.trim().length === 0) {
    errors.author = 'Author is required';
  } else if (book.author.trim().length < 2) {
    errors.author = 'Author must be at least 2 characters';
  }

  if (!book.category || book.category.trim().length === 0) {
    errors.category = 'Category is required';
  }

  if (!book.isbn || book.isbn.trim().length === 0) {
    errors.isbn = 'ISBN is required';
  } else {
    const isbnRegex = /^(?:\d{10}|\d{13}|(?:\d{3}-)?\d{10}|(?:\d{3}-)?\d{13})$/;
    if (!isbnRegex.test(book.isbn.replace(/-/g, ''))) {
      errors.isbn = 'Please enter a valid ISBN (10 or 13 digits)';
    }
  }

  if (book.status === 'issued' && (!book.issuedTo || book.issuedTo.trim().length === 0)) {
    errors.issuedTo = 'Issued to name is required when status is Issued';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterBooks(books, searchQuery, categoryFilter) {
  return books.filter((book) => {
    const matchesSearch =
      !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !categoryFilter || book.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });
}

export function calculateStats(books) {
  const total = books.length;
  const available = books.filter((book) => book.status === 'available').length;
  const issued = books.filter((book) => book.status === 'issued').length;

  return { total, available, issued };
}
