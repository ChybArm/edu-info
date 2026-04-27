export default function SectionHeader({ number, title, subtitle, color = 'var(--blue-mid)' }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {number && (
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '88px',
          fontWeight: 900,
          color: color,
          opacity: 0.08,
          lineHeight: 1,
          marginBottom: '-28px',
          userSelect: 'none',
          letterSpacing: '-2px',
        }}>
          {number}
        </div>
      )}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(26px, 5vw, 42px)',
        fontWeight: 700,
        color: 'var(--ink)',
        letterSpacing: '-0.3px',
        marginBottom: subtitle ? '12px' : 0,
        position: 'relative',
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{
          fontSize: '16px',
          color: 'var(--ink-muted)',
          fontStyle: 'italic',
          maxWidth: '600px',
          lineHeight: 1.7,
          fontFamily: 'var(--font-display)',
        }}>
          {subtitle}
        </p>
      )}
<div style={{
        width: '52px',
        height: '3px',
        background: color, 
        borderRadius: '2px',
        marginTop: '18px',
      }} />
    </div>
  );
}