import React, { useState, useEffect } from 'react';
import { Github, FileText, Upload, Brain, BarChart2, Sparkles } from 'lucide-react';

const STEPS = [
  { Icon: Github,    text: 'Fetching GitHub profile & repositories...' },
  { Icon: FileText,  text: 'Reading portfolio description...' },
  { Icon: Upload,    text: 'Processing resume content...' },
  { Icon: Brain,     text: 'Running AI career analysis...' },
  { Icon: BarChart2, text: 'Computing skill breakdown...' },
  { Icon: Sparkles,  text: 'Finalizing career insights...' },
];

export default function Loader() {
  const [activeStep, setActiveStep] = useState(0);
  const [dots, setDots]             = useState('');

  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => Math.min(p + 1, STEPS.length - 1)), 2000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setDots(p => p.length >= 3 ? '' : p + '.'), 450);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px' }}>

      {/* Ring */}
      <div style={{ position: 'relative', width: 108, height: 108, marginBottom: 36 }}>
        <svg width="108" height="108" viewBox="0 0 108 108" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="54" cy="54" r="46" stroke="var(--border-subtle)" strokeWidth="2" fill="none" />
          <circle
            cx="54" cy="54" r="46"
            stroke="var(--accent)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="289"
            strokeDashoffset="217"
            strokeLinecap="round"
            style={{ transformOrigin: 'center', animation: 'spin 2s linear infinite' }}
          />
        </svg>
        <svg width="108" height="108" viewBox="0 0 108 108" style={{ position: 'absolute', inset: 0 }}>
          <circle
            cx="54" cy="54" r="32"
            stroke="var(--purple)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="201"
            strokeDashoffset="151"
            strokeLinecap="round"
            style={{ transformOrigin: 'center', animation: 'spin 3.5s linear infinite reverse' }}
            opacity="0.5"
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={20} style={{ color: 'var(--accent)' }} />
          </div>
        </div>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 6 }}>
        Analyzing your profile{dots}
      </h3>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 36 }}>
        Gemini 2.5 Flash is reviewing your developer profile
      </p>

      {/* Steps */}
      <div style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {STEPS.map(({ Icon, text }, i) => {
          const done   = i < activeStep;
          const active = i === activeStep;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                padding: '9px 14px',
                borderRadius: 9,
                background: active ? 'rgba(59,130,246,0.07)' : 'transparent',
                border: `1px solid ${active ? 'rgba(59,130,246,0.2)' : 'transparent'}`,
                opacity: done ? 0.45 : active ? 1 : 0.25,
                transition: 'all 0.35s ease',
              }}
            >
              <Icon
                size={14}
                style={{ color: done ? 'var(--green)' : active ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: active ? 'var(--text-primary)' : 'var(--text-secondary)', flex: 1, fontWeight: active ? 500 : 400 }}>
                {text}
              </span>
              {active && (
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                  Running
                </span>
              )}
              {done && (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5l3 3 5-5" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
