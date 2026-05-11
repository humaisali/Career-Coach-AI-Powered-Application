import React from 'react';
import PageBackground from '../components/layout/PageBackground';

const sections = [
  {
    title: 'Data Collected',
    text: 'The UI accepts GitHub profile links, optional portfolio descriptions, optional resume uploads, and a Gemini API key entered by the user.',
  },
  {
    title: 'How Data Is Used',
    text: 'Data is used only to generate career analysis results. Inputs are processed to fetch profile data and produce AI-generated recommendations.',
  },
  {
    title: 'Data Retention',
    text: 'This sample policy uses dummy text. In your implementation, update this section with exact retention timelines and deletion workflows.',
  },
  {
    title: 'Third-Party Services',
    text: 'The app may contact GitHub APIs and AI model providers to fulfill analysis requests. Their terms and policies apply to those services.',
  },
];

export default function Privacy() {
  return (
    <div style={{ minHeight: '100%' }}>
      <PageBackground />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '54px 24px 80px' }}>
        <span className="badge" style={{ background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 14 }}>
          Privacy
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 12 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
          This page currently contains dummy policy content as requested.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sections.map((item) => (
            <div key={item.title} className="card" style={{ padding: '18px 16px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 8, color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
