import React from 'react';
import { FileText } from 'lucide-react';

export default function PortfolioInput({ value, onChange }) {
  const count = value.length;
  const isGood = count >= 150;

  return (
    <div>
      <div className="label">
        <FileText size={13} />
        Portfolio Description
        <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 500, textTransform: 'none', letterSpacing: 0, color: 'var(--text-muted)' }}>
          Optional — improves accuracy
        </span>
      </div>

      <textarea
        className="input"
        rows={5}
        placeholder="Describe your projects, tech stack, and experience. The more specific you are, the sharper the AI analysis. E.g. 'I built a real-time dashboard using React, Node.js, and WebSockets, deployed on AWS with CI/CD via GitHub Actions...'"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ resize: 'vertical', lineHeight: 1.65 }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
        <span style={{ fontSize: 11.5, color: isGood ? 'var(--green)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
          {isGood
            ? <><CheckIcon size={11} color="var(--green)" /> Good detail level</>
            : `${Math.max(0, 150 - count)} more characters recommended`
          }
        </span>
        <span style={{ fontSize: 11.5, color: isGood ? 'var(--green)' : 'var(--text-muted)', fontWeight: 600 }}>
          {count}
        </span>
      </div>
    </div>
  );
}

// Inline tiny check icon
function CheckIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
