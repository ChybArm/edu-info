import { useNavigate } from 'react-router-dom';
import Diagram from '../components/Diagram';

const sections = [
  {
    to: '/exam-structure',
    icon: '📋',
    title: 'Էսսեի կառուցվածք',
    body: 'Ծանոթացի՛ր գնահատման չափանիշներին, ձևաչափին և բնորոշ սխալներին՝ նախքան գրելը։',
    color: 'var(--blue)',
  },
  {
    to: '/topic-bank',
    icon: '📚',
    title: 'Թեմաների բազա',
    body: 'Դիտի՛ր պատմությունն ըստ դարաշրջանի, գրականությունն ըստ հեղինակի։ Հիմնական փաստեր և գաղափարներ յուրաքանչյուր գործի մասին։',
    color: 'var(--teal)',
  },
  {
    to: '/methodology',
    icon: '🔗',
    title: 'Մեթոդաբանություն',
    body: 'Տիրապետի՛ր «Դարաշրջան → Գործ → Գաղափար → Համատեքստ» շղթային, որն ապահովում է բարձր գնահատականներ։',
    color: 'var(--blue-mid)',
  },
  {
    to: '/essay-examples',
    icon: '✍️',
    title: 'էսսեի օրինակներ',
    body: 'Կարդա՛ ծանոթագրված միջին և բարձր մակարդակի Էսսեներ։ Հասկացիր, թե ինչն է տարբերում դրանք։',
    color: 'var(--gold)',
  },
  {
    to: '/knowledge-check',
    icon: '🧠',
    title: 'Գիտելիքի ստուգում',
    body: 'Ստուգի՛ր քեզ թեստերով, համապատասխանեցման և ինքնագնահատման առաջադրանքներով։',
    color: 'var(--blue)',
  },
];

const chainSteps = [
  {
    label: 'Դարաշրջան',
    detail: 'Որոշի՛ր, թե պատմական որ ժամանակաշրջանին է պատկանում գործը։ Ի՞նչ էր կատարվում աշխարհում, ի՞նչ միջավայրում էր ապրում հեղինակը։',
    example: 'Ռոմանտիզմ՝ 19-րդ դար՝ ազգային ազատագրական շարժումների, ժողովրդական ոգու և լեզվի վերածննդի ժամանակ։',
  },
  {
    label: 'Գրական գործ',
    detail: 'Նշի՛ր հեղինակին և հստակ ստեղծագործությունը։ Ի՞նչ ժանրի ստեղծագործություն է այն, ե՞րբ և ինչի՞ համար է գրվել։',
    example: 'Խաչատուր Աբովյան, «Վերք Հայաստանի», 1841 թ., առաջին հայ վեպը՝ գրված աշխարհաբար։',
  },
  {
    label: 'Հիմնական գաղափար',
    detail: 'Ո՞ր կենտրոնական գաղափարն ես ուզում վերլուծել։ Միտքդ հստակ ձևակերպի՛ր։ Ոչ թե «ազատություն», այլ «ազատության կարոտն ու ազգային ինքնությունը»։',
    example: 'Ազգային ինքնությունն ու ժողովրդի զարթոնքը ռուսական տիրապետության ժամանակ։'
    ,
  },
  {
    label: 'Պատմական համատեքստ',
    detail: 'Գաղաթարի և պատմական իրադարձության կապ ստեղծիր։ Հենց սա է տարբերում վերլուծությունը վերապատմումից։',
    example: 'Ռուսական կայսրության և Պարսկաստանի տիրապետության ներքո հայ ժողովրուրդը պայքարում էր հանուն ինքնության պահպանման՝ դեմ գնալով բոլոր ճնշումներին և չկորցնելով պայծառ ապագայի հույսը։',
  },
];

// Armenian literary motif: decorative geometric inspired by khachkar patterns
function KhachkarMotif({ size = 60, color = 'rgba(255,255,255,0.06)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <rect x="27" y="2" width="6" height="56" rx="3" fill={color} />
      <rect x="2" y="27" width="56" height="6" rx="3" fill={color} />
      <rect x="18" y="18" width="24" height="24" rx="4" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="6" fill={color} />
      <rect x="14" y="14" width="4" height="4" rx="1" fill={color} />
      <rect x="42" y="14" width="4" height="4" rx="1" fill={color} />
      <rect x="14" y="42" width="4" height="4" rx="1" fill={color} />
      <rect x="42" y="42" width="4" height="4" rx="1" fill={color} />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
{/* Hero */}
<div
  style={{
    background: 'linear-gradient(135deg, var(--blue) 0%, #0e2550 60%, #162d5e 100%)',
    borderRadius: '20px',
    padding: 'clamp(40px, 6vw, 80px) clamp(28px, 5vw, 68px)',
    marginBottom: '60px',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* subtle grid texture */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity: 0.04,
      backgroundImage: `
        linear-gradient(
          rgba(255,255,255,0.4) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255,255,255,0.4) 1px,
          transparent 1px
        )
      `,
      backgroundSize: '40px 40px',
      pointerEvents: 'none',
    }}
  />

  {/* soft gold glow */}
  <div
    style={{
      position: 'absolute',
      width: '320px',
      height: '320px',
      borderRadius: '50%',
      background: 'rgba(184,150,10,0.12)',
      filter: 'blur(90px)',
      top: '-80px',
      right: '-40px',
      pointerEvents: 'none',
    }}
  />

  {/* Content */}
  <div style={{ position: 'relative', zIndex: 2 }}>
    {/* Gold top label */}
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        color: 'var(--gold-light)',
        marginBottom: '18px',
        opacity: 0.9,
      }}
    >
      9-րդ դասարան · Հայոց պատմություն եւ գրականություն
    </div>

    <h1
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 5.5vw, 54px)',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.3px',
        lineHeight: 1.2,
        maxWidth: '580px',
        marginBottom: '20px',
      }}
    >
      Գրի՛ր էսսե,
      <br />
      <span
        style={{
          color: 'var(--gold-light)',
          fontStyle: 'italic',
        }}
      >
        որն արժանի է բարձր գնահատականի։
      </span>
    </h1>

    <p
      style={{
        fontSize: '16px',
        color: 'rgba(255,255,255,0.68)',
        maxWidth: '500px',
        lineHeight: 1.75,
        marginBottom: '36px',
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
      }}
    >
      Սովորի՛ր{' '}
      <em style={{ color: 'rgba(255,255,255,0.9)' }}>
        վերլուծաբար մտածել
      </em>{' '}
      ՝ կապելով պատմությունը, գրականությունն ու քո գաղափարները։
    </p>

    {/* Quote block */}
    <div
      style={{
        borderLeft: '3px solid var(--gold)',
        paddingLeft: '16px',
        marginBottom: '36px',
        maxWidth: '440px',
      }}
    >
      <p
        style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.55)',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        «Ճիշտ բառը միշտ ավելի ուժեղ է, քան երկար նախադասությունը»
      </p>

      <p
        style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.35)',
          marginTop: '6px',
          margin: '6px 0 0',
        }}
      >
        — Մարկ Տվեն
      </p>
    </div>

    <button
      onClick={() => navigate('/methodology')}
      style={{
        background: 'var(--gold)',
        color: 'var(--blue)',
        border: 'none',
        borderRadius: '8px',
        padding: '13px 30px',
        fontSize: '15px',
        fontWeight: 700,
        fontFamily: 'var(--font-body)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 16px rgba(184,150,10,0.35)',
      }}
      onMouseEnter={(e) => {
        e.target.style.opacity = '0.9';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      Սկսիր մեթոդաբանությունից →
    </button>
  </div>
</div>

      {/* Section cards */}
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '20px',
          color: 'var(--ink)',
        }}>
          Բոլոր բաժինները
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {sections.map(s => (
            <div
              key={s.to}
              onClick={() => navigate(s.to)}
              style={{
                background: 'var(--white)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '22px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, transform 0.15s, border-color 0.2s',
                boxShadow: 'var(--shadow)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = s.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'var(--shadow)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                borderRadius: '14px 14px 0 0',
              }} />
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{s.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '8px',
                color: 'var(--ink)',
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: 1.7, margin: 0 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}