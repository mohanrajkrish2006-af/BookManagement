import { Link } from 'react-router-dom';
import { BookIcon } from '../Icons/BookIcon';
import { Button } from '../Common/Button';
import { PlusIcon } from '../Icons/PlusIcon';
import '../styles/Home.css';

export function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-highlight">Discover</span> Your Next
              <br />
              Great Read
            </h1>
            <p className="hero-subtitle">
              Manage your personal library with ease. Track your collection, discover new books,
              and build your reading journey—all in one beautiful place.
            </p>
            <div className="hero-actions">
              <Link to="/books">
                <Button variant="primary" size="lg">
                  Explore Library
                </Button>
              </Link>
              <Link to="/add-book">
                <Button variant="secondary" size="lg">
                  <PlusIcon size={20} />
                  Add Book
                </Button>
              </Link>
            </div>
          </div>
          <div className="hero-illustration">
            <svg
              width="600"
              height="500"
              viewBox="0 0 600 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background gradient circle */}
              <circle cx="300" cy="250" r="200" fill="url(#gradient1)" opacity="0.1" />
              
              {/* Floating books */}
              <g className="book-group-1">
                <rect x="100" y="150" width="80" height="120" rx="6" fill="#1E3A8A" opacity="0.9" />
                <rect x="105" y="155" width="70" height="8" rx="2" fill="white" opacity="0.3" />
                <rect x="105" y="168" width="60" height="4" rx="1" fill="white" opacity="0.2" />
                <rect x="105" y="176" width="50" height="4" rx="1" fill="white" opacity="0.2" />
                <rect x="100" y="150" width="80" height="120" rx="6" stroke="#3B82F6" strokeWidth="2" opacity="0.3" />
              </g>
              
              <g className="book-group-2">
                <rect x="200" y="100" width="80" height="120" rx="6" fill="#3B82F6" opacity="0.9" />
                <rect x="205" y="105" width="70" height="8" rx="2" fill="white" opacity="0.3" />
                <rect x="205" y="118" width="60" height="4" rx="1" fill="white" opacity="0.2" />
                <rect x="205" y="126" width="50" height="4" rx="1" fill="white" opacity="0.2" />
                <rect x="200" y="100" width="80" height="120" rx="6" stroke="#1E3A8A" strokeWidth="2" opacity="0.3" />
              </g>
              
              <g className="book-group-3">
                <rect x="320" y="180" width="80" height="120" rx="6" fill="#22C55E" opacity="0.9" />
                <rect x="325" y="185" width="70" height="8" rx="2" fill="white" opacity="0.3" />
                <rect x="325" y="198" width="60" height="4" rx="1" fill="white" opacity="0.2" />
                <rect x="325" y="206" width="50" height="4" rx="1" fill="white" opacity="0.2" />
                <rect x="320" y="180" width="80" height="120" rx="6" stroke="#16A34A" strokeWidth="2" opacity="0.3" />
              </g>
              
              <g className="book-group-4">
                <rect x="420" y="120" width="80" height="120" rx="6" fill="#F59E0B" opacity="0.9" />
                <rect x="425" y="125" width="70" height="8" rx="2" fill="white" opacity="0.3" />
                <rect x="425" y="138" width="60" height="4" rx="1" fill="white" opacity="0.2" />
                <rect x="425" y="146" width="50" height="4" rx="1" fill="white" opacity="0.2" />
                <rect x="420" y="120" width="80" height="120" rx="6" stroke="#D97706" strokeWidth="2" opacity="0.3" />
              </g>
              
              {/* Decorative elements */}
              <circle cx="150" cy="80" r="4" fill="#3B82F6" opacity="0.4" />
              <circle cx="450" cy="300" r="3" fill="#22C55E" opacity="0.4" />
              <circle cx="80" cy="280" r="3" fill="#F59E0B" opacity="0.4" />
              <circle cx="520" cy="180" r="4" fill="#1E3A8A" opacity="0.4" />
              
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E3A8A" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="features-title">Why Choose Our Library?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3>Organize Your Collection</h3>
              <p>Keep track of all your books in one place. Categorize, search, and manage your library effortlessly.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3>Smart Search</h3>
              <p>Find any book instantly with our powerful search. Filter by category, author, or ISBN.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>Easy Purchase</h3>
              <p>Buy books directly from your library. Secure UPI payments make it simple and fast.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Track Status</h3>
              <p>Monitor which books are available or issued. Never lose track of your collection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Quote Section */}
      <section className="quote-section">
        <div className="quote-content">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="quote-icon"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
          <blockquote className="quote-text">
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
          </blockquote>
          <p className="quote-author">— George R.R. Martin</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Build Your Library?</h2>
          <p className="cta-subtitle">Start organizing your books today and discover the joy of a well-managed collection.</p>
          <Link to="/books">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
