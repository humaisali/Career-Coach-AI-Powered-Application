import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Sparkles, Zap } from 'lucide-react';

const footerLinkStyle = {
  fontSize: 11.5,
  color: 'var(--text-muted)',
  textDecoration: 'none',
};

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '28px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, var(--accent), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={12} style={{ color: '#fff' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 700, color: 'var(--text-secondary)' }}>AI Career Coach</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <NavLink to="/about" className="footer-link" style={footerLinkStyle}>About</NavLink>
          <NavLink to="/terms" className="footer-link" style={footerLinkStyle}>Terms</NavLink>
          <NavLink to="/privacy" className="footer-link" style={footerLinkStyle}>Privacy</NavLink>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          {[{ Icon: Shield, text: 'Privacy First' }, { Icon: Zap, text: 'Gemini AI' }].map(({ Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)' }}>
              <Icon size={10} /> {text}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
