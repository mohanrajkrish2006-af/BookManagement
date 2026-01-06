import { useEffect, useState } from 'react';
import '../styles/StatCard.css';

export function StatCard({ title, value, icon: Icon, color, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const targetValue = value;
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current = Math.min(increment * step, targetValue);
        setDisplayValue(Math.floor(current));

        if (step >= steps) {
          setDisplayValue(targetValue);
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, duration / steps);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return (
    <div className={`stat-card hover-lift ${isAnimating ? 'animating' : ''}`} style={{ '--accent-color': color }}>
      <div className="stat-card-icon" style={{ backgroundColor: `${color}15`, color }}>
        {Icon && <Icon size={32} color={color} />}
      </div>
      <div className="stat-card-content">
        <h3 className="stat-card-value">{displayValue.toLocaleString()}</h3>
        <p className="stat-card-title">{title}</p>
      </div>
    </div>
  );
}
