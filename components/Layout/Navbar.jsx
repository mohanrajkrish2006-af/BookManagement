import { Link, useLocation } from 'react-router-dom';
import { BookIcon } from '../Icons/BookIcon';
import '../styles/Navbar.css';

export function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" aria-label="Books Management Home">
          <BookIcon size={28} color="var(--color-primary)" />
          <span className="navbar-brand-text">Books Management</span>
        </Link>

        <ul className="navbar-nav">
          <li>
            <Link
              to="/"
              className={`navbar-link ${isActive('/') && !isActive('/dashboard') ? 'active' : ''}`}
              aria-current={isActive('/') && !isActive('/dashboard') ? 'page' : undefined}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
              aria-current={isActive('/dashboard') ? 'page' : undefined}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className={`navbar-link ${isActive('/books') ? 'active' : ''}`}
              aria-current={isActive('/books') ? 'page' : undefined}
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/add-book"
              className={`navbar-link ${isActive('/add-book') ? 'active' : ''}`}
              aria-current={isActive('/add-book') ? 'page' : undefined}
            >
              Add Book
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
