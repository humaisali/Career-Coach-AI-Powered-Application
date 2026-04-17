import React from 'react';
import { CheckCircle2, XCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { DECISION_CONFIG } from '../constants';

function ScoreRing({ score }) {
  const r    = 50;
  const circ = 2 * Math.PI * r;
  const pct  = Math.min(Math.max(score / 10, 0), 1);
  const color =
    score >= 7.5 ? 'var(--green)'
    : score >= 5  ? 'var(--accent)'
    : 'var(--red)';

  return (
    <div style={{ position: 'relative', width: 126, height: 126, flexShrink: 0 }}>
      <svg width="126" height="126" viewBox="0 0 126 126">
        {/* Track */}
        <circle cx="63" cy="63" r={r} stroke="var(--border-subtle)" strokeWidth="9" fill="none" />
        {/* Fill */}
        <circle
          cx="63" cy="63" r={r}
          stroke={color}
          strokeWidth="9"
          fill="none"
          strokeDasharray={`${circ * pct} ${circ}`}
          strokeDashoffset={circ * 0.25}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.5s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>
          {score?.toFixed(1)}
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 3 }}>
          / 10
        </span>
      </div>
    </div>
  );
}

function DecisionBadge({ decision }) {
  const cfg = DECISION_CONFIG[decision] || DECISION_CONFIG.Consider;
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 18px',
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 99,
    }}>
      <TrendingUp size={13} style={{ color: cfg.color }} />
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, color: cfg.color, letterSpacing: '0.1em' }}>
        {cfg.label}
      </span>
    </div>
  );
}

function ListCard({ icon: Icon, iconColor, iconBg, title, items }) {
  return (
    <div className="card--flat" style={{ padding: '20px 22px' }}>
      <div className="section-label" style={{ marginBottom: 16 }}>
        <div className="section-label-icon" style={{ background: iconBg }}>
          <Icon size={14} style={{ color: iconColor }} />
        </div>
        <div>
          <div className="section-label-title" style={{ fontSize: 14 }}>{title}</div>
        </div>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {(items || []).map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <span style={{ color: iconColor, fontSize: 12, flexShrink: 0, marginTop: 2 }}>&#9656;</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ReviewPanel({ data }) {
  const { score, decision, decisionReason, summary, strengths, weaknesses, suggestions } = data;

  return (
    <section className="anim-fade-up">
      {/* Verdict card */}
      <div className="card" style={{ padding: '28px 30px', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          <ScoreRing score={score} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ marginBottom: 12 }}>
              <DecisionBadge decision={decision} />
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {decisionReason}
            </p>
          </div>
        </div>
        {summary && (
          <>
            <div className="divider" style={{ margin: '20px 0' }} />
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75, fontStyle: 'italic' }}>
              &ldquo;{summary}&rdquo;
            </p>
          </>
        )}
      </div>

      {/* Strengths / Weaknesses / Suggestions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
        <ListCard
          icon={CheckCircle2}
          iconColor="var(--green)"
          iconBg="var(--green-dim)"
          title="Strengths"
          items={strengths}
        />
        <ListCard
          icon={XCircle}
          iconColor="var(--red)"
          iconBg="var(--red-dim)"
          title="Weaknesses"
          items={weaknesses}
        />
        <ListCard
          icon={Lightbulb}
          iconColor="var(--amber)"
          iconBg="var(--amber-dim)"
          title="Suggestions"
          items={suggestions}
        />
      </div>
    </section>
  );
}
