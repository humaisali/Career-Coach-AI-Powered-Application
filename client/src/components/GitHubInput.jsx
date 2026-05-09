import React, { useState } from 'react';
import { Github, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { prefetchGitHub } from '../services/aiService';

export default function GitHubInput({ value, onChange, onVerified }) {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError]   = useState('');
  const [profile, setProfile] = useState(null);

  const handleBlur = async () => {
    if (!value.trim()) return;
    setStatus('loading');
    setError('');
    setProfile(null);
    try {
      const data = await prefetchGitHub(value.trim());
      setProfile(data);
      setStatus('success');
      onVerified?.(data);
    } catch (err) {
      setError(err.message || 'Could not fetch GitHub profile.');
      setStatus('error');
      onVerified?.(null);
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    if (status !== 'idle') {
      setStatus('idle');
      setError('');
      setProfile(null);
      onVerified?.(null);
    }
  };

  return (
    <div>
      <div className="label">
        <Github size={13} />
        GitHub Profile URL
        <a
          className="interactive-link"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}
        >
          Open GitHub <ExternalLink size={9} />
        </a>
      </div>

      <div style={{ position: 'relative' }}>
        <input
          className="input"
          type="text"
          placeholder="https://github.com/username"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ paddingLeft: 40, paddingRight: 40 }}
        />
        <Github
          size={15}
          style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}
        />
        {status === 'loading' && (
          <Loader2
            size={15}
            style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--accent)', animation: 'spin 0.8s linear infinite' }}
          />
        )}
        {status === 'success' && (
          <CheckCircle
            size={15}
            style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--green)' }}
          />
        )}
        {status === 'error' && (
          <AlertCircle
            size={15}
            style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--red)' }}
          />
        )}
      </div>

      {/* Error */}
      {status === 'error' && (
        <p style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 7, fontSize: 12, color: 'var(--red)' }}>
          <AlertCircle size={12} />
          {error}
        </p>
      )}

      {/* Verified profile pill */}
      {status === 'success' && profile && (
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 13px',
            background: 'rgba(16,185,129,0.07)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 10,
          }}
        >
          <img
            src={profile.avatar}
            alt={profile.username}
            style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid rgba(16,185,129,0.3)' }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 7 }}>
              {profile.name || profile.username}
              <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--green)', border: '1px solid rgba(16,185,129,0.2)' }}>
                Verified
              </span>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 2 }}>
              {profile.publicRepos} repos &middot; {profile.followers} followers &middot; {profile.totalStars} stars
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
