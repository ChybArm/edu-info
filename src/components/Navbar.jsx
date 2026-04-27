import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Գլխավոր' },
  { to: '/exam-structure', label: 'Քննության կառուցվածք' },
  { to: '/topic-bank', label: 'Թեմաների բազա' },
  { to: '/methodology', label: 'Մեթոդաբանություն' },
  { to: '/essay-examples', label: 'էսսեի օրինակներ' },
  { to: '/knowledge-check', label: 'Գիտելիքի ստուգում' },
  { to: '/sources', label: 'Օգտագործված աղբյուրներ' },
  { to: '/about', label: 'Մեր մասին' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkStyle = (isActive) => ({
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: isActive ? 600 : 400,
    color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.78)',
    textDecoration: 'none',
    padding: '4px 0',
    borderBottom: isActive ? '2px solid var(--gold)' : '2px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
    whiteSpace: 'nowrap',
  });

  return (
    <nav style={{
      background: 'var(--blue)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 16px rgba(14,30,61,0.25)',
    }}>
      {/* Thin gold decorative line at top */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))' }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '58px',
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Decorative Armenian letter Ա as logo mark */}
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--gold)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 900,
            color: 'var(--blue)',
            flexShrink: 0,
          }}>Է</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.2px',
          }}>
            Էսսեա<span style={{ color: 'var(--gold-light)' }}>գիր</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="desktop-nav">
          {links.slice(1).map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              style={({ isActive }) => linkStyle(isActive)}
              onMouseEnter={e => { if (!e.target.style.borderBottomColor.includes('gold')) e.target.style.color = '#fff'; }}
              onMouseLeave={e => { if (!e.target.style.borderBottomColor.includes('gold')) e.target.style.color = 'rgba(255,255,255,0.78)'; }}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="hamburger"
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            padding: '6px 10px',
            fontSize: '18px',
            color: '#fff',
            cursor: 'pointer',
          }}
          aria-label="Ցանկ"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'var(--blue)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({ ...linkStyle(isActive), fontSize: '16px' })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}