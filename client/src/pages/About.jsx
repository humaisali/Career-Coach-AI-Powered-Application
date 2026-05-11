import React from 'react';
import { Code2, Sparkles, Target, UserRound, ExternalLink } from 'lucide-react';
import PageBackground from '../components/layout/PageBackground';

function InfoCard({ icon, title, text }) {
  return (
    <div className="card" style={{ padding: '20px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        {icon}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)' }}>{title}</h3>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{text}</p>
    </div>
  );
}

export default function About() {
  return (
    <div style={{ minHeight: '100%' }}>
      <PageBackground />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 980, margin: '0 auto', padding: '54px 24px 80px' }}>
        <span className="badge" style={{ background: 'var(--purple-dim)', color: 'var(--purple)', border: '1px solid rgba(139,92,246,0.2)', marginBottom: 14 }}>
          About
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 12 }}>
          About AI Career Coach
        </h1>
        <p style={{ maxWidth: 760, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28 }}>
          AI Career Coach helps developers understand their current career readiness based on GitHub activity, portfolio context, and resume insights. It turns technical signals into practical feedback and a clearer improvement roadmap.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 26 }}>
          <InfoCard
            icon={<Sparkles size={16} style={{ color: 'var(--accent)' }} />}
            title="What It Does"
            text="Generates structured career analysis with strengths, weaknesses, suggested projects, job-fit predictions, and growth directions."
          />
          <InfoCard
            icon={<Target size={16} style={{ color: 'var(--green)' }} />}
            title="Core Goal"
            text="Provide actionable guidance so developers can prioritize the right skills and projects for better interviews and hiring outcomes."
          />
          <InfoCard
            icon={<Code2 size={16} style={{ color: 'var(--amber)' }} />}
            title="Tech Stack"
            text="Frontend on React + Vite, backend on Express, AI insights powered through Gemini, and profile signals fetched via GitHub API."
          />
        </div>

        <div className="card" style={{ padding: '20px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <UserRound size={16} style={{ color: 'var(--purple)' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)' }}>Developer Info (Dummy)</h3>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            Developer Name: Humais Ali<br />
            Role: Full-Stack Developer<br />
            Email: humais@example.com<br />
            Mission: Building AI tools that guide developers with clear, practical career feedback.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 8, marginTop: 14 }}>
            {[
              { label: 'Portfolio', href: 'https://portfolio.example.com' },
              { label: 'GitHub', href: 'https://github.com/example' },
              { label: 'Email', href: 'mailto:you@example.com' },
              { label: 'WhatsApp', href: 'https://wa.me/00000000000' },
            ].map((link) => (
              <a
                key={link.label}
                className="interactive-link"
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 6,
                  padding: '9px 11px',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: 12.5,
                }}
              >
                <span>{link.label}</span>
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
