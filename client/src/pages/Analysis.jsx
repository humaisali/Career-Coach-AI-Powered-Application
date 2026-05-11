import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Github,
  Key,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import GitHubInput from '../components/GitHubInput';
import PortfolioInput from '../components/PortfolioInput';
import ResumeUpload from '../components/ResumeUpload';
import Loader from '../components/Loader';
import ReviewPanel from '../components/ReviewPanel';
import SkillChart from '../components/SkillChart';
import JobPrediction from '../components/JobPrediction';
import CareerGrowth from '../components/CareerGrowth';
import { analyzeCareer } from '../services/aiService';
import PageBackground from '../components/layout/PageBackground';

const INIT = { githubUrl: '', portfolioDesc: '', resumeFile: null, apiKey: '' };

function ApiKeyInput({ value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="label">
        <Key size={13} />
        Gemini API Key
        <a
          className="interactive-link"
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
          onChange={(e) => onChange(e.target.value)}
          style={{ paddingLeft: 40, paddingRight: 40 }}
        />
        <Key size={14} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 4 }}
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      <p style={{ marginTop: 7, fontSize: 11.5, color: 'var(--text-muted)' }}>
        Your key is used only in this session and sent directly to Google.
      </p>
    </div>
  );
}

export default function Analysis() {
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | report
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState(false);

  const canAnalyze = useMemo(
    () => form.githubUrl.trim() && form.apiKey.trim() && status !== 'loading',
    [form.githubUrl, form.apiKey, status]
  );

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    setStatus('loading');
    setErrorMsg('');
    setResults(null);

    try {
      const data = await analyzeCareer({
        githubLink: form.githubUrl.trim(),
        description: form.portfolioDesc,
        resumeFile: form.resumeFile,
        apiKey: form.apiKey.trim(),
      });
      setResults(data);
      setStatus('ready');
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  const handleReset = () => {
    setForm(INIT);
    setStatus('idle');
    setErrorMsg('');
    setResults(null);
  };

  const handleDownload = () => {
    if (!results) return;
    const payload = { ...results, generatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = `career-analysis-${results.github?.username || 'report'}.json`;
    a.click();
    URL.revokeObjectURL(href);
  };

  const handleCopy = async () => {
    if (!results) return;
    const lines = [
      'AI CAREER COACH — ANALYSIS REPORT',
      '='.repeat(50),
      `Developer : ${results.github?.name || results.github?.username || '-'}`,
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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100%' }}>
      <PageBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section style={{ padding: '56px 24px 24px', textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 10 }}>
            {status === 'report' ? 'Your Career Report' : 'Start Your Analysis'}
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
            {status === 'report'
              ? 'Your full analysis is now rendered below with actionable feedback and next-step recommendations.'
              : 'Fill the form below and submit. Loading and analysis progress will appear below the form.'}
          </p>
        </section>

        {status !== 'report' && (
          <section style={{ padding: '0 24px 80px', maxWidth: 820, margin: '0 auto' }}>
            <div className="card scan anim-fade-up d5" style={{ padding: 'clamp(22px, 4vw, 42px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                <ApiKeyInput value={form.apiKey} onChange={(v) => setForm((f) => ({ ...f, apiKey: v }))} />
                <div className="divider" />
                <GitHubInput value={form.githubUrl} onChange={(v) => setForm((f) => ({ ...f, githubUrl: v }))} />
                <PortfolioInput value={form.portfolioDesc} onChange={(v) => setForm((f) => ({ ...f, portfolioDesc: v }))} />
                <ResumeUpload file={form.resumeFile} onFile={(f) => setForm((p) => ({ ...p, resumeFile: f }))} />
                <div className="divider" />

                {errorMsg && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '13px 15px', background: 'var(--red-dim)', border: '1px solid rgba(239,68,68,0.22)', borderRadius: 9, color: 'var(--red)', fontSize: 13 }}>
                    <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ lineHeight: 1.6 }}>{errorMsg}</span>
                  </div>
                )}

                <button className="btn btn-primary" onClick={handleAnalyze} disabled={!canAnalyze} style={{ width: '100%', fontSize: 15 }}>
                  {status === 'loading' ? (
                    <>
                      <div style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.75s linear infinite' }} />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} /> Analyze My Profile <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
                  {[{ Icon: Key, text: 'Bring your Gemini key' }, { Icon: Sparkles, text: 'AI-based report' }, { Icon: Github, text: 'Live GitHub data' }].map(({ Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--text-muted)' }}>
                      <Icon size={11} /> {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {status === 'loading' && (
          <section style={{ padding: '0 24px 70px', maxWidth: 820, margin: '-48px auto 0' }}>
            <div className="card scan" style={{ padding: '32px 22px' }}>
              <Loader />
            </div>
          </section>
        )}

        {status === 'ready' && results && (
          <section style={{ padding: '0 24px 80px', maxWidth: 820, margin: '-48px auto 0' }}>
            <div className="card anim-fade-up" style={{ padding: '22px 20px', textAlign: 'center' }}>
              <span className="badge" style={{ background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 12 }}>
                Analysis Complete
              </span>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                Your analysis is ready. Click below to view your full career report.
              </p>
              <button className="btn btn-primary" onClick={() => setStatus('report')}>
                View Career Report <ArrowRight size={15} />
              </button>
            </div>
          </section>
        )}

        {status === 'report' && results && (
          <section className="analysis-report-section" style={{ padding: '0 24px 90px', maxWidth: 1120, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
              <div>
                <span className="badge" style={{ background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 10, display: 'inline-flex', gap: 5 }}>
                  Analysis Complete
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: 5 }}>
                  Career Report
                </h3>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>@{results.github?.username}</span>
                  {results.github?.name && ` · ${results.github.name}`}
                </p>
              </div>
              <div className="report-action-row" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn btn-ghost" onClick={handleCopy}>
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied!' : 'Copy Report'}
                </button>
                <button className="btn btn-ghost" onClick={handleDownload}>
                  <Download size={12} /> Export JSON
                </button>
                <button className="btn btn-ghost" onClick={handleReset}>
                  <RotateCcw size={12} /> New Analysis
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ReviewPanel data={results} />
              {results.skills && <SkillChart skills={results.skills} />}
              {(results.jobRoles?.length || results.recommendedProjects?.length) && (
                <JobPrediction jobRoles={results.jobRoles} recommendedProjects={results.recommendedProjects} />
              )}
              {(results.skillLevel || results.careerAdvice) && <CareerGrowth data={results} />}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
