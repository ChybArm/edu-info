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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--ink)',
      borderTop: '2px solid var(--gold)',
      marginTop: '80px',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '52px 24px 32px',
      }}>
        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '40px',
          marginBottom: '44px',
        }}>
          {/* Brand + tagline */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '34px', height: '34px',
                background: 'var(--gold)',
                borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: '19px', fontWeight: 900,
                color: 'var(--ink)',
              }}>Է</div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px', fontWeight: 700,
                color: '#fff',
              }}>
                Էսսեա<span style={{ color: 'var(--gold-light)' }}>գիր</span>
              </span>
            </div>
            <p style={{
              fontSize: '14.5px',
              color: 'rgba(255,255,255,0.48)',
              lineHeight: 1.75,
              fontStyle: 'italic',
              margin: 0,
              fontFamily: 'var(--font-display)',
            }}>
              Խորամուխ եղի՛ր։ Գրի՛ր ավելի լավ։<br />
              Կապի՛ր պատմությունն ու գրականությունը — թող գաղափարները խոսեն։
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '14px',
            }}>Բաժիններ</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 32px' }}>
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  style={({ isActive }) => ({
                    fontSize: '13.5px',
                    color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    fontFamily: 'var(--font-body)',
                  })}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '14px',
            }}>Կապ</div>
            <a
              href="mailto:hello@essay.am"
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '6px',
                transition: 'color 0.2s',
              }}
            >
              Էլ․ հասցեն շուտով հասանելի կլինի։
            </a>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.28)',
              margin: 0, lineHeight: 1.55,
            }}>
              Հարցեր, կարծիքներ,<br />առաջարկներ։
            </p>
          </div>
        </div>

        {/* Divider + copyright */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.22)', margin: 0 }}>
            © {year} Էսսեագիր։ Բոլոր իրավունքները պաշտպանված են։
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.22)', margin: 0, fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
            Կայքը ստեղծված է 7-9րդ դասարաններում սովորողների համար, որոնք ուզում են զարգացնել քննական մտածողություն, վերլուծական հմտություններ և էսսե գրելու կարողություն։
          </p>
        </div>
      </div>
    </footer>
  );
}