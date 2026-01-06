import { Navbar } from './Navbar';
import '../styles/Layout.css';

export function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
