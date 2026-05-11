import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const linkStyle = ({ isActive }) => ({
  fontSize: 12.5,
  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
  textDecoration: 'none',
  fontWeight: isActive ? 700 : 500,
});

export default function Navbar() {
  return (
    <header style={{ borderBottom: '1px solid var(--border-subtle)', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(14px)', background: 'rgba(7,9,15,0.85)' }}>
      <div className="navbar-inner" style={{ maxWidth: 1100, margin: '0 auto', minHeight: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '8px 0' }}>
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, var(--accent), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(59,130,246,0.3)' }}>
            <Sparkles size={14} style={{ color: '#fff' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            AI Career Coach
          </span>
        </NavLink>

        <nav className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <NavLink to="/" className="nav-link" style={linkStyle}>Home</NavLink>
          <NavLink to="/analysis" className="nav-link" style={linkStyle}>Analysis</NavLink>
          <NavLink to="/about" className="nav-link" style={linkStyle}>About</NavLink>
          <NavLink to="/terms" className="nav-link" style={linkStyle}>Terms</NavLink>
          <NavLink to="/privacy" className="nav-link" style={linkStyle}>Privacy</NavLink>
        </nav>
      </div>
    </header>
  );
}
