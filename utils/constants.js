export const COLORS = {
  primary: '#1E3A8A',
  accent: '#3B82F6',
  background: '#F8FAFC',
  card: '#FFFFFF',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
};

export const CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'Technology',
  'History',
  'Biography',
  'Business',
  'Education',
  'Art',
  'Philosophy',
  'Other',
];

export const BOOK_STATUS = {
  AVAILABLE: 'available',
  ISSUED: 'issued',
};

export const STORAGE_KEY = 'bookmanagement_books';

export const DEFAULT_BOOKS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    isbn: '978-0-7432-7356-5',
    status: BOOK_STATUS.AVAILABLE,
    issuedTo: '',
    addedDate: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Technology',
    isbn: '978-0-13-235088-4',
    status: BOOK_STATUS.ISSUED,
    issuedTo: 'John Doe',
    addedDate: new Date('2024-01-20').toISOString(),
  },
  {
    id: '3',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'History',
    isbn: '978-0-06-231609-7',
    status: BOOK_STATUS.AVAILABLE,
    issuedTo: '',
    addedDate: new Date('2024-02-01').toISOString(),
  },
  {
    id: '4',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    category: 'Design',
    isbn: '978-0-465-05065-9',
    status: BOOK_STATUS.AVAILABLE,
    issuedTo: '',
    addedDate: new Date('2024-02-10').toISOString(),
  },
];
