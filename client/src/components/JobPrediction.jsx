import React, { useEffect, useState } from 'react';
import { Briefcase, Zap } from 'lucide-react';

function RoleCard({ role, index }) {
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setBarWidth(role.match), 400 + index * 80);
    return () => clearTimeout(t);
  }, [role.match, index]);

  const color =
    role.match >= 80 ? 'var(--green)'
    : role.match >= 60 ? 'var(--accent)'
    : 'var(--amber)';

  return (
    <div
      className="card--flat"
      style={{ padding: '16px 18px', opacity: 0, animation: `fadeUp 0.45s ease ${index * 0.09}s both` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={14} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>
            {role.title}
          </span>
        </div>
        <div style={{ padding: '3px 9px', background: `${color}18`, border: `1px solid ${color}35`, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800, color }}>{role.match}%</span>
        </div>
      </div>

      <div className="progress-track" style={{ marginBottom: 10 }}>
        <div style={{
          height: '100%',
          width: `${barWidth}%`,
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          borderRadius: 99,
          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${index * 0.08 + 0.3}s`,
        }} />
      </div>

      <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{role.reason}</p>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const impactColor = project.impact === 'High' ? 'var(--green)' : 'var(--amber)';
  return (
    <div
      className="card--flat"
      style={{ padding: '18px 20px', opacity: 0, animation: `fadeUp 0.45s ease ${index * 0.1}s both` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {project.title}
        </span>
        <span
          className="badge"
          style={{ background: `${impactColor}15`, color: impactColor, border: `1px solid ${impactColor}30`, flexShrink: 0 }}
        >
          {project.impact}
        </span>
      </div>

      <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 13 }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {(project.techStack || []).map((tech, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 5, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function JobPrediction({ jobRoles, recommendedProjects }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Job Roles */}
      <div className="card anim-fade-up d2" style={{ padding: '24px 28px' }}>
        <div className="section-label">
          <div className="section-label-icon" style={{ background: 'var(--purple-dim)' }}>
            <Briefcase size={15} style={{ color: 'var(--purple)' }} />
          </div>
          <div>
            <div className="section-label-title">Job Role Predictions</div>
            <div className="section-label-sub">Best-fit roles based on your profile</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))', gap: 10 }}>
          {(jobRoles || []).map((role, i) => <RoleCard key={i} role={role} index={i} />)}
        </div>
      </div>

      {/* Recommended Projects */}
      <div className="card anim-fade-up d3" style={{ padding: '24px 28px' }}>
        <div className="section-label">
          <div className="section-label-icon" style={{ background: 'var(--amber-dim)' }}>
            <Zap size={15} style={{ color: 'var(--amber)' }} />
          </div>
          <div>
            <div className="section-label-title">Recommended Projects</div>
            <div className="section-label-sub">High-impact builds to level up your portfolio</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 10 }}>
          {(recommendedProjects || []).map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
