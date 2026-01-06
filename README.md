# Books Management SaaS Dashboard

A modern, premium React.js Books Management application with a beautiful SaaS-style dashboard interface. Built with Vite, React Router, and LocalStorage for data persistence.

## Features

- 📊 **Dashboard** - Overview with animated statistics cards
- 📚 **Books Management** - Full CRUD operations for books
- 🔍 **Search & Filter** - Real-time search and category filtering
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI/UX** - Premium design with smooth animations
- 💾 **LocalStorage** - Data persists in browser storage
- ♿ **Accessible** - WCAG compliant with keyboard navigation

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **JavaScript** - No TypeScript
- **CSS** - Custom design system with CSS variables
- **LocalStorage** - Data persistence (no backend required)

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
bookmanagement/
├── src/
│   ├── components/        # React components
│   │   ├── Layout/        # Navbar, Layout wrapper
│   │   ├── Dashboard/     # Dashboard page and stat cards
│   │   ├── Books/         # Books list, card, table views
│   │   ├── Forms/         # Book form components
│   │   ├── Common/        # Reusable components (Modal, Toast, etc.)
│   │   └── Icons/         # SVG icon components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions and constants
│   ├── styles/            # Animation utilities
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles and design system
├── public/                # Static assets
├── index.html             # HTML template
└── package.json           # Dependencies
```

## Design System

The application uses a comprehensive design system with CSS custom properties:

- **Colors**: Primary (#1E3A8A), Accent (#3B82F6), Success, Warning, Danger
- **Spacing**: 4px base unit system
- **Typography**: System font stack with clear hierarchy
- **Shadows**: Subtle elevation system
- **Animations**: Smooth transitions and micro-interactions

## Features in Detail

### Dashboard
- Animated count-up statistics
- Total books, available, and issued counts
- Welcome card with illustration

### Books Management
- **Card View**: Mobile-optimized card layout
- **Table View**: Desktop-optimized table layout
- Toggle between views
- Real-time search by title, author, or ISBN
- Category filtering
- Edit and delete operations

### Forms
- Floating label inputs
- Real-time validation
- Inline error messages
- Support for adding and editing books

### Data Model

```javascript
{
  id: string,
  title: string,
  author: string,
  category: string,
  isbn: string,
  status: 'available' | 'issued',
  issuedTo: string (optional),
  addedDate: string (ISO date)
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for portfolio use.
