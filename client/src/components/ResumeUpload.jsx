import React, { useRef, useState } from 'react';
import { Upload, FileCheck2, X, AlertCircle } from 'lucide-react';

export default function ResumeUpload({ file, onFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError]       = useState('');

  const validate = (f) => {
    setError('');
    if (!f) return;
    if (f.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.');
      return;
    }
    onFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    validate(e.dataTransfer.files[0]);
  };

  const fmt = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 ** 2) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 ** 2).toFixed(1) + ' MB';
  };

  return (
    <div>
      <div className="label">
        <Upload size={13} />
        Resume / CV
        <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 500, textTransform: 'none', letterSpacing: 0, color: 'var(--text-muted)' }}>
          Optional &middot; PDF only &middot; max 10 MB
        </span>
      </div>

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 10,
            padding: '28px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragging ? 'var(--accent-glow)' : 'var(--bg-input)',
            transition: 'all 0.18s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Upload size={18} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginBottom: 3 }}>
                Drop your PDF here or{' '}
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>click to browse</span>
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>PDF documents up to 10 MB</p>
            </div>
          </div>
          <input ref={inputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => validate(e.target.files[0])} />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '13px 16px',
            background: 'rgba(16,185,129,0.06)',
            border: '1px solid rgba(16,185,129,0.22)',
            borderRadius: 10,
          }}
        >
          <FileCheck2 size={20} style={{ color: 'var(--green)', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {file.name}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 2 }}>
              {fmt(file.size)} &middot; Ready for analysis
            </div>
          </div>
          <button
            onClick={() => { onFile(null); setError(''); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 4, borderRadius: 6, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {error && (
        <p style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 7, fontSize: 12, color: 'var(--red)' }}>
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}
