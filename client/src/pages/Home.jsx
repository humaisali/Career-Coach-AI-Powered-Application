import React, { useState, useRef } from 'react';
import {
  ArrowRight, RotateCcw, Github, Sparkles,
  Shield, Zap, AlertTriangle, Key, Eye, EyeOff,
  ExternalLink, ChevronDown, Download, Copy, Check,
} from 'lucide-react';

import GitHubInput     from '../components/GitHubInput';
import PortfolioInput  from '../components/PortfolioInput';
import ResumeUpload    from '../components/ResumeUpload';
import Loader          from '../components/Loader';
import ReviewPanel     from '../components/ReviewPanel';
import SkillChart      from '../components/SkillChart';
import JobPrediction   from '../components/JobPrediction';
import CareerGrowth    from '../components/CareerGrowth';

import { analyzeCareer } from '../services/aiService';
import { LANG_COLORS }   from '../constants';

// ─── API Key input ──────────────────────────────────────────────────────────
function ApiKeyInput({ value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="label">
        <Key size={13} />
        Gemini API Key
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}
        >
          Get free key <ExternalLink size={9} />
        </a>
      </div>
      <div style={{ position: 'relative' }}>
        <input
          className="input"
          type={show ? 'text' : 'password'}
          placeholder="AIza..."
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ paddingLeft: 40, paddingRight: 40 }}
        />
        <Key size={14} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 4 }}
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      <p style={{ marginTop: 7, fontSize: 11.5, color: 'var(--text-muted)' }}>
        Your key is used only in this session and sent directly to Google — never stored on our server.
      </p>
    </div>
  );
}

// ─── GitHub stats panel (shown in results) ──────────────────────────────────
function GitHubStats({ data }) {
  if (!data) return null;
  const total   = Object.values(data.languages || {}).reduce((a, b) => a + b, 0);
  const sorted  = Object.entries(data.languages || {}).sort(([, a], [, b]) => b - a).slice(0, 7);

  return (
    <div className="card anim-fade-up" style={{ padding: '24px 28px' }}>
      <div className="section-label">
        <div className="section-label-icon" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <Github size={15} style={{ color: 'var(--text-secondary)' }} />
        </div>
        <div>
          <div className="section-label-title">GitHub Overview</div>
          <div className="section-label-sub">Live data from @{data.username}</div>
        </div>
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
        >
          View Profile <ExternalLink size={11} />
        </a>
      </div>

      {/* Stat pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        {[
          { label: 'Repositories', value: data.publicRepos },
          { label: 'Total Stars',  value: data.totalStars  },
          { label: 'Total Forks',  value: data.totalForks  },
          { label: 'Followers',    value: data.followers   },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, minWidth: 80, padding: '13px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 11, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {s.value >= 1000 ? `${(s.value / 1000).toFixed(1)}k` : s.value}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 5, letterSpacing: '0.04em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Language bar */}
      {sorted.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
            Language Distribution
          </div>
          <div style={{ display: 'flex', height: 7, borderRadius: 99, overflow: 'hidden', gap: 2, marginBottom: 12 }}>
            {sorted.map(([lang, count]) => {
              const pct = (count / total) * 100;
              return (
                <div key={lang} title={`${lang}: ${pct.toFixed(1)}%`} style={{ width: `${pct}%`, background: LANG_COLORS[lang] || LANG_COLORS.default, borderRadius: 99, minWidth: pct > 1 ? 3 : 0 }} />
              );
            })}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 14px' }}>
            {sorted.map(([lang, count]) => (
              <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: LANG_COLORS[lang] || LANG_COLORS.default, flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', fontWeight: 500 }}>{lang}</span>
                <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{((count / total) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top repos */}
      {data.topRepos?.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
            Top Repositories
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {data.topRepos.slice(0, 4).map((repo, i) => (
              <a
                key={i}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 9, textDecoration: 'none', transition: 'border-color 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{repo.name}</div>
                  {repo.description && <div style={{ fontSize: 11.5, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{repo.description}</div>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  {repo.language && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: LANG_COLORS[repo.language] || LANG_COLORS.default }} />
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{repo.language}</span>
                    </div>
                  )}
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>&#9733; {repo.stars}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Export button ───────────────────────────────────────────────────────────
function ExportButton({ results, githubData }) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const payload = { ...results, github: githubData, generatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `career-analysis-${githubData?.username || 'report'}.json`;
    a.click();
  };

  const handleCopy = async () => {
    const lines = [
      'AI CAREER COACH — ANALYSIS REPORT',
      '='.repeat(50),
      `Developer : ${githubData?.name || githubData?.username}`,
      `Score     : ${results.score?.toFixed(1)} / 10`,
      `Decision  : ${results.decision}`,
      '',
      'STRENGTHS',
      ...(results.strengths || []).map((s, i) => `  ${i + 1}. ${s}`),
      '',
      'WEAKNESSES',
      ...(results.weaknesses || []).map((s, i) => `  ${i + 1}. ${s}`),
      '',
      'CAREER ADVICE',
      results.careerAdvice || '',
    ];
    await navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div style={{ display: 'flex', gap: 7 }}>
      <button className="btn btn-ghost" onClick={handleCopy} style={{ gap: 6 }}>
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? 'Copied!' : 'Copy Report'}
      </button>
      <button
        className="btn btn-ghost"
        onClick={handleDownload}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <Download size={12} /> Export JSON
      </button>
    </div>
  );
}

// ─── HOW IT WORKS section ─────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { icon: <Github size={18} />, color: 'var(--accent)', bg: 'rgba(59,130,246,0.1)', n: '01', title: 'Connect GitHub', desc: 'Paste your GitHub URL. We fetch repos, stars, languages, and activity — no auth needed.' },
    { icon: <Key size={18} />,    color: 'var(--purple)', bg: 'var(--purple-dim)',      n: '02', title: 'Add API Key',   desc: 'Provide your free Gemini API key from Google AI Studio. It never leaves your browser session.' },
    { icon: <Sparkles size={18} />, color: 'var(--amber)', bg: 'var(--amber-dim)',      n: '03', title: 'Run Analysis',  desc: 'Our backend fetches your data, parses your resume, and sends everything to Gemini 2.5 Flash.' },
    { icon: <ArrowRight size={18} />, color: 'var(--green)', bg: 'var(--green-dim)',    n: '04', title: 'Get Report',    desc: 'Receive a full career report: score, verdict, skill gaps, job fits, and your growth roadmap.' },
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
        {steps.map((s, i) => (
          <div key={i} className="card anim-fade-up" style={{ padding: '22px 20px', textAlign: 'center', animationDelay: `${i * 0.08}s` }}>
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

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
const INIT = { githubUrl: '', portfolioDesc: '', resumeFile: null, apiKey: '' };

export default function Home() {
  const [form,       setForm]       = useState(INIT);
  const [verifiedGH, setVerifiedGH] = useState(null);
  const [status,     setStatus]     = useState('idle'); // idle | loading | done | error
  const [errorMsg,   setErrorMsg]   = useState('');
  const [results,    setResults]    = useState(null);
  const formRef    = useRef(null);
  const resultsRef = useRef(null);

  const canAnalyze = form.githubUrl.trim() && form.apiKey.trim() && status !== 'loading';

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    setStatus('loading');
    setErrorMsg('');
    setResults(null);
    setTimeout(() => document.getElementById('loader-anchor')?.scrollIntoView({ behavior: 'smooth' }), 80);

    try {
      const data = await analyzeCareer({
        githubLink:   form.githubUrl.trim(),
        description:  form.portfolioDesc,
        resumeFile:   form.resumeFile,
        apiKey:       form.apiKey.trim(),
      });
      setResults(data);
      setStatus('done');
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setForm(INIT);
    setVerifiedGH(null);
    setResults(null);
    setStatus('idle');
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-25%', left: '-15%', width: '65vw', height: '65vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '-25%', right: '-15%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
          opacity: 0.3,
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ────────────────────────────────── */}
        <header style={{ borderBottom: '1px solid var(--border-subtle)', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(14px)', background: 'rgba(7,9,15,0.85)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, var(--accent), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(59,130,246,0.3)' }}>
                <Sparkles size={14} style={{ color: '#fff' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                AI Career Coach
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge" style={{ background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid rgba(16,185,129,0.2)', gap: 6 }}>
                <span className="dot-live" />
                Gemini 2.5 Flash
              </span>
              {status === 'done' && (
                <button className="btn btn-ghost" onClick={handleReset} style={{ gap: 6 }}>
                  <RotateCcw size={12} /> New Analysis
                </button>
              )}
            </div>
          </div>
        </header>

        {/* ── Hero ──────────────────────────────────── */}
        <section style={{ padding: 'clamp(56px,8vw,96px) 24px clamp(40px,5vw,64px)', textAlign: 'center', maxWidth: 740, margin: '0 auto' }}>
          <div className="anim-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 13px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)', borderRadius: 99, marginBottom: 26, fontSize: 11, fontWeight: 700, color: 'var(--accent-bright)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            <Sparkles size={11} />
            Senior Engineer &middot; Recruiter &middot; Career Mentor
          </div>

          <h1 className="anim-fade-up d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,7vw,62px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 20 }}>
            Know exactly where you
            <br />
            <span style={{ background: 'linear-gradient(128deg, #60a5fa 20%, #a78bfa 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              stand as a developer.
            </span>
          </h1>

          <p className="anim-fade-up d2" style={{ fontSize: 'clamp(14px,2.2vw,16.5px)', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 40px' }}>
            Drop your GitHub, portfolio description, and resume.
            Get an honest, recruiter-level career report in under 30 seconds.
          </p>

          <div className="anim-fade-up d3" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px,4vw,40px)', flexWrap: 'wrap', marginBottom: 36 }}>
            {[
              { Icon: Zap,    label: '~30 sec',    sub: 'Analysis time'  },
              { Icon: Shield, label: 'Private',    sub: 'Key stays local' },
              { Icon: Github, label: 'Live data',  sub: 'GitHub REST API' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <Icon size={18} style={{ color: 'var(--text-muted)', marginBottom: 7, display: 'block', margin: '0 auto 7px' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub}</div>
              </div>
            ))}
          </div>

          <button
            className="anim-fade-up d4"
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 17px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 99, cursor: 'pointer', color: 'var(--text-muted)', fontSize: 12.5, transition: 'all 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            Start your analysis <ChevronDown size={13} />
          </button>
        </section>

        {/* ── How it works (shown only on idle) ─────── */}
        {status === 'idle' && <HowItWorks />}

        {/* ── Input Form ────────────────────────────── */}
        <section ref={formRef} style={{ padding: '0 24px 80px', maxWidth: 820, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Start Your Analysis
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              GitHub URL and API key are required. Portfolio description and resume improve accuracy.
            </p>
          </div>

          <div className="card scan anim-fade-up d5" style={{ padding: 'clamp(22px, 4vw, 42px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <ApiKeyInput value={form.apiKey} onChange={v => setForm(f => ({ ...f, apiKey: v }))} />
              <div className="divider" />
              <GitHubInput
                value={form.githubUrl}
                onChange={v => setForm(f => ({ ...f, githubUrl: v }))}
                onVerified={setVerifiedGH}
              />
              <PortfolioInput value={form.portfolioDesc} onChange={v => setForm(f => ({ ...f, portfolioDesc: v }))} />
              <ResumeUpload file={form.resumeFile} onFile={f => setForm(p => ({ ...p, resumeFile: f }))} />
              <div className="divider" />

              {/* Error */}
              {status === 'error' && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '13px 15px', background: 'var(--red-dim)', border: '1px solid rgba(239,68,68,0.22)', borderRadius: 9, color: 'var(--red)', fontSize: 13 }}>
                  <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ lineHeight: 1.6 }}>{errorMsg}</span>
                </div>
              )}

              {/* Submit */}
              <button
                className="btn btn-primary"
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                style={{ width: '100%', fontSize: 15 }}
              >
                {status === 'loading' ? (
                  <>
                    <div style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.75s linear infinite' }} />
                    Analyzing...
                  </>
                ) : (
                  <><Sparkles size={15} /> Analyze My Profile <ArrowRight size={15} /></>
                )}
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
                {[
                  { Icon: Shield, text: 'Key never stored'  },
                  { Icon: Zap,    text: 'Gemini 2.5 Flash'  },
                  { Icon: Github, text: 'Live GitHub data'  },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--text-muted)' }}>
                    <Icon size={11} /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Loader ────────────────────────────────── */}
        {status === 'loading' && (
          <section id="loader-anchor" style={{ padding: '0 24px 80px', maxWidth: 820, margin: '0 auto' }}>
            <div className="card scan" style={{ padding: '36px 28px' }}>
              <Loader />
            </div>
          </section>
        )}

        {/* ── Results ───────────────────────────────── */}
        {status === 'done' && results && (
          <section ref={resultsRef} style={{ padding: '0 24px 100px', maxWidth: 1120, margin: '0 auto' }}>
            {/* Results header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
              <div>
                <span className="badge" style={{ background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 10, display: 'inline-flex', gap: 5 }}>
                  <span className="dot-live" /> Analysis Complete
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: 5 }}>
                  Career Report
                </h2>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>@{results.github?.username}</span>
                  {results.github?.name && ` · ${results.github.name}`}
                  {' '}· {results.github?.publicRepos} repos · {results.github?.totalStars} stars
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <ExportButton results={results} githubData={results.github} />
                <button
                  className="btn btn-ghost"
                  onClick={handleReset}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <RotateCcw size={12} /> New Analysis
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <GitHubStats data={results.github} />
              <ReviewPanel data={results} />
              {results.skills && <SkillChart skills={results.skills} />}
              {(results.jobRoles?.length || results.recommendedProjects?.length) && (
                <JobPrediction jobRoles={results.jobRoles} recommendedProjects={results.recommendedProjects} />
              )}
              {(results.skillLevel || results.careerAdvice) && (
                <CareerGrowth data={results} />
              )}
            </div>
          </section>
        )}

        {/* ── Footer ────────────────────────────────── */}
        <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '28px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, var(--accent), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={12} style={{ color: '#fff' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 700, color: 'var(--text-secondary)' }}>AI Career Coach</span>
            </div>
            <p style={{ fontSize: 11.5, color: 'var(--text-muted)', textAlign: 'center' }}>
              Powered by Gemini 2.5 Flash &middot; GitHub REST API &middot; Your API key is never stored
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              {[{ Icon: Shield, text: 'Privacy First' }, { Icon: Zap, text: 'Gemini AI' }].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                  <Icon size={10} /> {text}
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
