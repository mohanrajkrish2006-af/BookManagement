import { useEffect } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { calculateStats } from '../../utils/helpers';
import { StatCard } from './StatCard';
import { BookIcon } from '../Icons/BookIcon';
import { StatsIcon } from '../Icons/StatsIcon';
import { COLORS } from '../../utils/constants';
import '../styles/Dashboard.css';

export function Dashboard() {
  const { books, initializeBooks } = useBooks();
  const stats = calculateStats(books);

  useEffect(() => {
    initializeBooks();
  }, [initializeBooks]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Overview of your book collection</p>
      </div>

      <div className="dashboard-stats">
        <StatCard
          title="Total Books"
          value={stats.total}
          icon={BookIcon}
          color={COLORS.primary}
          delay={0}
        />
        <StatCard
          title="Available"
          value={stats.available}
          icon={StatsIcon}
          color={COLORS.success}
          delay={200}
        />
        <StatCard
          title="Issued"
          value={stats.issued}
          icon={StatsIcon}
          color={COLORS.warning}
          delay={400}
        />
      </div>

      <div className="dashboard-welcome">
        <div className="welcome-card">
          <div className="welcome-card-content">
            <div>
              <h2>Welcome to Books Management</h2>
              <p>
                Manage your book collection efficiently. Add new books, track their status, and keep
                everything organized in one place.
              </p>
            </div>
            <div className="welcome-card-illustration">
              <svg
                width="180"
                height="140"
                viewBox="0 0 180 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Bookshelf illustration */}
                <g opacity="0.9">
                  {/* Shelf */}
                  <rect x="20" y="100" width="140" height="8" rx="4" fill="rgba(255, 255, 255, 0.3)" />
                  <rect x="20" y="60" width="140" height="8" rx="4" fill="rgba(255, 255, 255, 0.3)" />
                  
                  {/* Books on shelf */}
                  <rect x="30" y="30" width="25" height="70" rx="2" fill="rgba(255, 255, 255, 0.4)" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
                  <rect x="60" y="20" width="25" height="80" rx="2" fill="rgba(255, 255, 255, 0.4)" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
                  <rect x="90" y="35" width="25" height="65" rx="2" fill="rgba(255, 255, 255, 0.4)" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
                  <rect x="120" y="25" width="25" height="75" rx="2" fill="rgba(255, 255, 255, 0.4)" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
                  
                  {/* Book spines details */}
                  <rect x="32" y="35" width="21" height="4" rx="1" fill="rgba(255, 255, 255, 0.6)" />
                  <rect x="62" y="25" width="21" height="4" rx="1" fill="rgba(255, 255, 255, 0.6)" />
                  <rect x="92" y="40" width="21" height="4" rx="1" fill="rgba(255, 255, 255, 0.6)" />
                  <rect x="122" y="30" width="21" height="4" rx="1" fill="rgba(255, 255, 255, 0.6)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
