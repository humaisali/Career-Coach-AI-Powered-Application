import React from 'react';
import { TrendingUp, Cpu, Map } from 'lucide-react';
import { SKILL_LEVEL } from '../constants';

function LevelMeter({ level }) {
  const steps = ['Beginner', 'Intermediate', 'Advanced'];
  const idx   = steps.indexOf(level);
  const cfg   = SKILL_LEVEL[level] || SKILL_LEVEL.Intermediate;

  return (
    <div>
      <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
        {steps.map((s, i) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: 5,
              borderRadius: 99,
              background: i <= idx ? cfg.color : 'var(--border-subtle)',
              transition: `background 0.3s ease ${i * 0.12}s`,
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map((s, i) => (
          <span key={s} style={{ fontSize: 10, fontWeight: i === idx ? 700 : 400, color: i === idx ? cfg.color : 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CareerGrowth({ data }) {
  const { skillLevel, skillLevelReason, nextTechnologies, nextDomains, careerAdvice } = data;
  const cfg = SKILL_LEVEL[skillLevel] || SKILL_LEVEL.Intermediate;

  return (
    <div className="card anim-fade-up d4" style={{ padding: 'clamp(16px, 3vw, 28px) clamp(14px, 3vw, 32px)' }}>
      <div className="section-label">
        <div className="section-label-icon" style={{ background: 'var(--green-dim)' }}>
          <TrendingUp size={15} style={{ color: 'var(--green)' }} />
        </div>
        <div>
          <div className="section-label-title">Career Growth Path</div>
          <div className="section-label-sub">Roadmap to your next level</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>

        {/* Current Level */}
        <div style={{ padding: '18px 20px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Current Level
            </span>
            <span className="badge" style={{ background: `${cfg.color}18`, color: cfg.color, border: `1px solid ${cfg.color}35` }}>
              {skillLevel}
            </span>
          </div>
          <LevelMeter level={skillLevel} />
          {skillLevelReason && (
            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: 13 }}>
              {skillLevelReason}
            </p>
          )}
        </div>

        {/* Next Technologies */}
        <div style={{ padding: '18px 20px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
            <Cpu size={13} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Learn Next
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {(nextTechnologies || []).map((tech, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 11px',
                  background: 'rgba(59,130,246,0.07)',
                  border: '1px solid rgba(59,130,246,0.18)',
                  borderRadius: 7,
                  fontSize: 12.5, fontWeight: 500,
                  color: 'var(--accent-bright)',
                  fontFamily: 'monospace',
                  opacity: 0,
                  animation: `fadeUp 0.4s ease ${i * 0.07 + 0.15}s both`,
                }}
              >
                <span style={{ fontSize: 8, color: 'var(--accent)' }}>&#9656;</span>
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div style={{ padding: '18px 20px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
            <Map size={13} style={{ color: 'var(--purple)' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Explore Domains
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(nextDomains || []).map((d, i) => (
              <div
                key={i}
                style={{
                  padding: '11px 13px',
                  background: 'var(--bg-card)',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  opacity: 0,
                  animation: `fadeUp 0.4s ease ${i * 0.1 + 0.15}s both`,
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 700, color: '#c4b5fd', marginBottom: 4 }}>
                  {d.domain}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55 }}>{d.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Advice */}
      {careerAdvice && (
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05))',
          border: '1px solid rgba(59,130,246,0.18)',
          borderRadius: 12,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: 'linear-gradient(180deg, var(--accent), var(--purple))', borderRadius: '2px 0 0 2px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <TrendingUp size={14} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              Mentor&rsquo;s Advice
            </span>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {careerAdvice}
          </p>
        </div>
      )}
    </div>
  );
}
