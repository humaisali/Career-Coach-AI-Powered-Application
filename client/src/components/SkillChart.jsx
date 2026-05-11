import React, { useEffect, useState } from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis,
  Radar, ResponsiveContainer, Tooltip,
} from 'recharts';
import { BarChart2 } from 'lucide-react';
import { SKILL_COLORS } from '../constants';

function SkillBar({ label, value, color, delay }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 300 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 9, height: 9, borderRadius: 3, background: color, display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color }}>{value}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            transition: `width 1.3s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{payload[0].payload.skill}</span>
      <span style={{ color: 'var(--accent)', marginLeft: 8, fontWeight: 700 }}>{payload[0].value}%</span>
    </div>
  );
};

export default function SkillChart({ skills }) {
  const entries    = Object.entries(skills || {});
  const radarData  = entries.map(([skill, value]) => ({ skill, value, fullMark: 100 }));

  return (
    <div className="card anim-fade-up d1" style={{ padding: 'clamp(16px, 3vw, 24px) clamp(14px, 3vw, 28px)' }}>
      <div className="section-label">
        <div className="section-label-icon" style={{ background: 'rgba(59,130,246,0.1)' }}>
          <BarChart2 size={15} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <div className="section-label-title">Skill Breakdown</div>
          <div className="section-label-sub">AI-estimated proficiency levels</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, alignItems: 'center' }}>
        {/* Progress bars */}
        <div>
          {entries.map(([label, value], i) => (
            <SkillBar
              key={label}
              label={label}
              value={value}
              color={SKILL_COLORS[label] || 'var(--accent)'}
              delay={i * 100}
            />
          ))}
        </div>

        {/* Radar */}
        <div style={{ height: 210 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border-subtle)" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-body)' }}
              />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="var(--accent)"
                fill="var(--accent)"
                fillOpacity={0.12}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
