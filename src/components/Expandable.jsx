import { useState } from 'react';

export default function Expandable({ label, children, defaultOpen = false, accent = 'var(--blue-mid)' }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{
      border: `1px solid ${open ? accent : 'var(--border)'}`,
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      marginBottom: '8px',
      transition: 'border-color 0.2s',
      background: 'var(--white)',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 18px',
          background: open ? accent + '0e' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '12px',
          transition: 'background 0.2s',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          fontWeight: 600,
          color: open ? 'var(--ink)' : 'var(--ink-light)',
        }}>
          {label}
        </span>
        <span style={{
          color: accent,
          fontSize: '16px',
          flexShrink: 0,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>▼</span>
      </button>

      <div style={{
        maxHeight: open ? '1200px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <div style={{
          padding: '16px 18px 18px',
          borderTop: '1px solid var(--border-light)',
          fontSize: '15px',
          color: 'var(--ink-light)',
          lineHeight: 1.75,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}