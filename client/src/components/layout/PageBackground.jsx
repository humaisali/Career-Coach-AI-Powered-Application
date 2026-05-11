import React from 'react';

export default function PageBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-25%', left: '-15%', width: '65vw', height: '65vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', bottom: '-25%', right: '-15%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          opacity: 0.3,
        }}
      />
    </div>
  );
}
