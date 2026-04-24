export default function Card({ title, body, icon, variant = 'default', onClick, accentColor, badge }) {
  const variants = {
    default:   { border: 'var(--border)',     accent: 'var(--blue-mid)' },
    highlight: { border: 'var(--gold)',        accent: 'var(--gold)' },
    author:    { border: 'var(--teal)',        accent: 'var(--teal)' },
    era:       { border: 'var(--blue)',        accent: 'var(--blue)' },
  };

  const v = variants[variant] || variants.default;
  const accent = accentColor || v.accent;

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--white)',
        border: `1.5px solid ${v.border}`,
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s, transform 0.15s',
        boxShadow: 'var(--shadow)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (onClick) {
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${accent}, ${accent}99)`,
        borderRadius: '14px 14px 0 0',
      }} />

      {badge && (
        <span style={{
          display: 'inline-block',
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.5px',
          padding: '3px 8px',
          borderRadius: '4px',
          background: accent + '18',
          color: accent,
          marginBottom: '10px',
          border: `1px solid ${accent}35`,
          fontFamily: 'var(--font-body)',
        }}>
          {badge}
        </span>
      )}

      {icon && <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>}

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '17px',
        fontWeight: 700,
        marginBottom: body ? '8px' : 0,
        color: 'var(--ink)',
        lineHeight: 1.35,
      }}>
        {title}
      </h3>

      {body && (
        <p style={{
          fontSize: '14px',
          color: 'var(--ink-light)',
          lineHeight: 1.7,
          margin: 0,
          fontFamily: 'var(--font-body)',
        }}>
          {body}
        </p>
      )}
    </div>
  );
}