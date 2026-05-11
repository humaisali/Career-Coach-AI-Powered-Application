import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github, Key, Shield, Sparkles, Zap } from 'lucide-react';
import PageBackground from '../components/layout/PageBackground';

function HowItWorks() {
  const steps = [
    { icon: <Github size={18} />, color: 'var(--accent)', bg: 'rgba(59,130,246,0.1)', n: '01', title: 'Connect GitHub', desc: 'Paste your GitHub URL. We fetch repos, stars, languages, and activity.' },
    { icon: <Key size={18} />, color: 'var(--purple)', bg: 'var(--purple-dim)', n: '02', title: 'Add API Key', desc: 'Provide your free Gemini API key from Google AI Studio.' },
    { icon: <Sparkles size={18} />, color: 'var(--amber)', bg: 'var(--amber-dim)', n: '03', title: 'Run Analysis', desc: 'Submit once and let AI evaluate your profile data.' },
    { icon: <ArrowRight size={18} />, color: 'var(--green)', bg: 'var(--green-dim)', n: '04', title: 'Get Report', desc: 'See score, decision, skill gaps, and growth roadmap in a popup.' },
  ];

  return (
    <section style={{ padding: '0 24px 72px', maxWidth: 980, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <span className="badge" style={{ background: 'var(--purple-dim)', color: 'var(--purple)', border: '1px solid rgba(139,92,246,0.2)', marginBottom: 16, display: 'inline-flex' }}>
          How it works
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
          Four steps to career clarity
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14 }}>
        {steps.map((s) => (
          <div key={s.n} className="card anim-fade-up" style={{ padding: '22px 20px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 13, background: s.bg, color: s.color, marginBottom: 14, position: 'relative' }}>
              {s.icon}
              <span style={{ position: 'absolute', top: -7, right: -7, width: 18, height: 18, borderRadius: '50%', background: 'var(--bg-base)', border: `1px solid ${s.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: s.color, fontFamily: 'var(--font-display)' }}>
                {s.n}
              </span>
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 9 }}>{s.title}</h4>
            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100%' }}>
      <PageBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section style={{ padding: 'clamp(56px,8vw,96px) 24px clamp(40px,5vw,64px)', textAlign: 'center', maxWidth: 740, margin: '0 auto' }}>
          <div className="anim-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 13px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)', borderRadius: 99, marginBottom: 26, fontSize: 11, fontWeight: 700, color: 'var(--accent-bright)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            <Sparkles size={11} />
            Senior Engineer · Recruiter · Career Mentor
          </div>

          <h1 className="anim-fade-up d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,7vw,62px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 20 }}>
            Know exactly where you
            <br />
            <span style={{ background: 'linear-gradient(128deg, #60a5fa 20%, #a78bfa 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              stand as a developer.
            </span>
          </h1>

          <p className="anim-fade-up d2" style={{ fontSize: 'clamp(14px,2.2vw,16.5px)', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 40px' }}>
            Move to the analysis page, submit your profile details, and get your full recruiter-level report in a popup.
          </p>

          <div className="anim-fade-up d3" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px,4vw,40px)', flexWrap: 'wrap', marginBottom: 36 }}>
            {[
              { Icon: Zap, label: '~30 sec', sub: 'Analysis time' },
              { Icon: Shield, label: 'Private', sub: 'Key stays local' },
              { Icon: Github, label: 'Live data', sub: 'GitHub REST API' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <Icon size={18} style={{ color: 'var(--text-muted)', marginBottom: 7, display: 'block', margin: '0 auto 7px' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub}</div>
              </div>
            ))}
          </div>

          <button className="btn btn-primary anim-fade-up d4" onClick={() => navigate('/analysis')} style={{ margin: '0 auto' }}>
            <Sparkles size={15} /> Start Your Analysis <ArrowRight size={15} />
          </button>
        </section>

        <HowItWorks />
      </div>
    </div>
  );
}
