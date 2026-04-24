import { useState } from 'react';
import {
  literatureThemes,
  historyTopics,
  getRelatedHistoryTopics,
  getRelatedLiteratureThemes,
} from '../data/topicBank';

// ─────────────────────────────────────────────
//  SHARED UI PRIMITIVES
// ─────────────────────────────────────────────

function SectionPill({ active, onClick, icon, label, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '14px 28px',
        borderRadius: '10px',
        border: `2px solid ${active ? color : 'var(--border)'}`,
        background: active ? color : 'var(--white)',
        color: active ? 'var(--white)' : 'var(--ink)',
        fontFamily: 'var(--font-display)',
        fontSize: '17px', fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: active ? '0 4px 18px rgba(26,58,107,0.18)' : 'var(--shadow)',
        flex: '1 1 200px',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: '22px' }}>{icon}</span>
      {label}
    </button>
  );
}

function ThemeCard({ item, onClick, section }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--white)',
        border: `1.5px solid ${hovered ? item.color : 'var(--border)'}`,
        borderRadius: '14px',
        padding: '22px 24px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
        borderRadius: '14px 14px 0 0',
      }} />

<div
  style={{
    fontSize: '22px',
    marginBottom: '12px',
    color: 'var(--ink)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    letterSpacing: '1px'
  }}
>
  {item.icon}
</div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '17px', fontWeight: 700,
        color: 'var(--ink)', marginBottom: '6px', lineHeight: 1.35,
      }}>
        {item.title}
      </h3>
      <p style={{
        fontSize: '12.5px', color: 'var(--ink-muted)',
        lineHeight: 1.55, margin: '0 0 14px',
        fontStyle: 'italic',
      }}>
        {item.titleEn}
      </p>

      {section === 'literature' && item.relatedHistoryIds?.length > 0 && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          fontSize: '11px', fontFamily: 'var(--font-body)',
          background: 'var(--blue-pale)', color: 'var(--blue-mid)',
          border: '1px solid var(--blue-light)',
          borderRadius: '20px', padding: '3px 10px',
        }}>
          🔗 {item.relatedHistoryIds.length} Պատմական կապ
        </div>
      )}
      {section === 'history' && item.relatedLiteratureIds?.length > 0 && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          fontSize: '11px', fontFamily: 'var(--font-body)',
          background: 'var(--gold-pale)', color: 'var(--gold)',
          border: '1px solid var(--gold-light)',
          borderRadius: '20px', padding: '3px 10px',
        }}>
          🔗 {item.relatedLiteratureIds.length} Գրական կապ
        </div>
      )}

      <div style={{
        position: 'absolute', bottom: '20px', right: '20px',
        fontSize: '18px', color: hovered ? item.color : 'var(--border)',
        transition: 'color 0.2s',
      }}>→</div>
    </div>
  );
}

function BackButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: 'none', border: '1px solid var(--border)',
        borderRadius: '8px', padding: '9px 18px',
        fontSize: '14px', color: 'var(--ink-muted)',
        cursor: 'pointer', fontFamily: 'var(--font-body)',
        marginBottom: '28px',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-mid)'; e.currentTarget.style.color = 'var(--blue-mid)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink-muted)'; }}
    >
      ← {label}
    </button>
  );
}

function RelatedLinkButton({ item, onClick, direction }) {
  const isToHistory = direction === 'to-history';
  const accent = isToHistory ? 'var(--blue)' : 'var(--gold)';
  const bgPale = isToHistory ? 'var(--blue-pale)' : 'var(--gold-pale)';

  return (
    <div
      onClick={() => onClick(item)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        background: bgPale,
        border: `1.5px solid ${accent}44`,
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.15s',
        marginBottom: '10px',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = accent + '18'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = accent + '44'; e.currentTarget.style.background = bgPale; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span
  style={{
    fontSize: '18px',
    fontWeight: 700,
    fontFamily: 'var(--font-display)',
    color: accent,
    letterSpacing: '1px',
    minWidth: '28px'
  }}
>
  {item.icon}
</span>
        <div>
          <div style={{
            fontSize: '11px', fontFamily: 'var(--font-body)',
            color: accent, fontWeight: 600, marginBottom: '3px',
            letterSpacing: '0.5px',
          }}>
            {isToHistory ? 'ԱՆՑՆԵԼ ՊԱՏՄՈՒԹՅԱՆԸ' : 'ԱՆՑՆԵԼ ԳՐԱԿԱՆՈՒԹՅԱՆԸ'}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>
            {item.title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', fontStyle: 'italic', marginTop: '2px' }}>
            {item.titleEn}
          </div>
        </div>
      </div>
      <span style={{ fontSize: '20px', color: accent, flexShrink: 0 }}>→</span>
    </div>
  );
}

// ─────────────────────────────────────────────
//  DETAIL PAGE — Literature Theme
// ─────────────────────────────────────────────
function LiteratureDetailPage({ theme, onBack, onNavigateToHistory }) {
  const relatedTopics = getRelatedHistoryTopics(theme);

  return (
    <div className="page-enter">
      <BackButton onClick={onBack} label="Գրականություն — Բոլոր Թեմաները" />

      {/* Header band */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue) 0%, #0e2550 100%)',
        borderRadius: '16px',
        padding: 'clamp(28px,4vw,52px) clamp(24px,4vw,48px)',
        marginBottom: '32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'radial-gradient(circle at 80% 50%, rgba(184,150,10,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div
  style={{
    fontSize: '28px',
    fontWeight: 700,
    fontFamily: 'var(--font-display)',
    color: 'var(--white)',
    letterSpacing: '2px',
    marginBottom: '14px'
  }}
>
  {theme.icon}
</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '4px', color: 'var(--gold-light)', marginBottom: '8px', textTransform: 'uppercase' }}>
          Գրականության Թեմա
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,4vw,38px)', fontWeight: 700, color: '#fff', marginBottom: '6px', lineHeight: 1.2 }}>
          {theme.title}
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', margin: 0 }}>
          {theme.titleEn}
        </p>
      </div>

      {/* Metadata row */}
      {(theme.keyAuthors?.length > 0 || theme.keyWorks?.length > 0) && (
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {theme.keyAuthors?.length > 0 && (
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px 18px', flex: '1 1 180px', minWidth: 0 }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-body)', letterSpacing: '2px', color: 'var(--ink-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Հեղինակներ</div>
              {theme.keyAuthors.map(a => <div key={a} style={{ fontSize: '14px', color: 'var(--ink)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>✒️ {a}</div>)}
            </div>
          )}
          {theme.keyWorks?.length > 0 && (
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px 18px', flex: '1 1 180px', minWidth: 0 }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-body)', letterSpacing: '2px', color: 'var(--ink-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Գործեր</div>
              {theme.keyWorks.map(w => <div key={w} style={{ fontSize: '14px', color: 'var(--ink)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>📖 {w}</div>)}
            </div>
          )}
        </div>
      )}

      {/* Full text / placeholder */}
      <div style={{
        background: 'var(--white)', border: '1.5px solid var(--border)',
        borderRadius: '14px', padding: '32px 36px',
        marginBottom: '36px', boxShadow: 'var(--shadow)', minHeight: '260px',
      }}>
        {theme.fullText ? (
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', lineHeight: 1.9, color: 'var(--ink)', whiteSpace: 'pre-line', }}>
            {theme.fullText}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', textAlign: 'center', gap: '12px' }}>
            <div style={{ fontSize: '34px', opacity: 0.25 }}>📝</div>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>ԼՐԱՑՎԱԾ ՉԷ</div>
            <p style={{ fontSize: '15px', color: 'var(--ink-muted)', fontStyle: 'italic', maxWidth: '460px', lineHeight: 1.7 }}>
              {theme.placeholder}
            </p>
            <div style={{ marginTop: '6px', padding: '9px 16px', background: 'var(--blue-pale)', borderRadius: '8px', fontSize: '12.5px', color: 'var(--blue-mid)', fontFamily: 'var(--font-body)' }}>
              Լրացրեք <code style={{ background: 'rgba(0,0,0,0.07)', padding: '1px 5px', borderRadius: '3px' }}>topicBank.js</code> → <strong>fullText</strong> դաշտը
            </div>
          </div>
        )}
      </div>

      {/* Cross-links to History */}
      {relatedTopics.length > 0 && (
        <div style={{ background: 'var(--blue-pale)', border: '1.5px solid var(--blue-light)', borderRadius: '14px', padding: '24px 28px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '4px' }}>
            Կապված Պատմության Թեմաներին
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '18px', color: 'var(--ink)' }}>
            Տեսնել պատմական համատեքստը →
          </h3>
          {relatedTopics.map(topic => (
            <RelatedLinkButton key={topic.id} item={topic} onClick={() => onNavigateToHistory(topic)} direction="to-history" />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  DETAIL PAGE — History Topic
// ─────────────────────────────────────────────
function HistoryDetailPage({ topic, onBack, onNavigateToLiterature }) {
  const relatedThemes = getRelatedLiteratureThemes(topic);

  return (
    <div className="page-enter">
      <BackButton onClick={onBack} label="Պատմություն — Բոլոր Թեմաները" />

      {/* Header band */}
      <div style={{
        background: 'linear-gradient(135deg, #1a3a1a 0%, #0d240d 100%)',
        borderRadius: '16px',
        padding: 'clamp(28px,4vw,52px) clamp(24px,4vw,48px)',
        marginBottom: '32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'radial-gradient(circle at 80% 50%, rgba(184,150,10,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div
  style={{
    fontSize: '28px',
    fontWeight: 700,
    fontFamily: 'var(--font-display)',
    color: 'var(--gold)',
    letterSpacing: '2px',
    marginBottom: '14px'
  }}
>
  {topic.icon}
</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '4px', color: 'var(--gold-light)', marginBottom: '8px', textTransform: 'uppercase' }}>
          Պատմական Թեմա
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,4vw,38px)', fontWeight: 700, color: '#fff', marginBottom: '6px', lineHeight: 1.2 }}>
          {topic.title}
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', margin: 0 }}>
          {topic.titleEn}
        </p>
      </div>

      {/* Full text / placeholder */}
      <div style={{
        background: 'var(--white)', border: '1.5px solid var(--border)',
        borderRadius: '14px', padding: '32px 36px',
        marginBottom: '36px', boxShadow: 'var(--shadow)', minHeight: '260px',
      }}>
        {topic.fullText ? (
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', lineHeight: 1.9, color: 'var(--ink)', whiteSpace: 'pre-line', }}>
            {topic.fullText}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', textAlign: 'center', gap: '12px' }}>
            <div style={{ fontSize: '34px', opacity: 0.25 }}>📜</div>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>ԼՐԱՑՎԱԾ ՉԷ</div>
            <p style={{ fontSize: '15px', color: 'var(--ink-muted)', fontStyle: 'italic', maxWidth: '460px', lineHeight: 1.7 }}>
              {topic.placeholder}
            </p>
            <div style={{ marginTop: '6px', padding: '9px 16px', background: 'var(--green-light)', borderRadius: '8px', fontSize: '12.5px', color: 'var(--green)', fontFamily: 'var(--font-body)' }}>
              Լրացրեք <code style={{ background: 'rgba(0,0,0,0.07)', padding: '1px 5px', borderRadius: '3px' }}>topicBank.js</code> → <strong>fullText</strong> դաշտը
            </div>
          </div>
        )}
      </div>

      {/* Cross-links to Literature */}
      {relatedThemes.length > 0 && (
        <div style={{ background: 'var(--gold-pale)', border: '1.5px solid var(--gold-light)', borderRadius: '14px', padding: '24px 28px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>
            Կապված Գրականության Թեմաներին
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '18px', color: 'var(--ink)' }}>
            Տեսնել գրական արտահայտությունները →
          </h3>
          {relatedThemes.map(theme => (
            <RelatedLinkButton key={theme.id} item={theme} onClick={() => onNavigateToLiterature(theme)} direction="to-literature" />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
export default function TopicBank() {
  const [section, setSection] = useState('literature');
  const [selectedLit, setSelectedLit] = useState(null);
  const [selectedHist, setSelectedHist] = useState(null);

  const view = selectedLit ? 'lit-detail'
    : selectedHist ? 'hist-detail'
    : section === 'literature' ? 'lit-list'
    : 'hist-list';

  const handleNavigateToHistory = (topic) => {
    setSelectedLit(null);
    setSelectedHist(topic);
    setSection('history');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLiterature = (theme) => {
    setSelectedHist(null);
    setSelectedLit(theme);
    setSection('literature');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionSwitch = (s) => {
    setSection(s);
    setSelectedLit(null);
    setSelectedHist(null);
  };


  return (
    <div>
      {/* Page heading */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '8px' }}>
          02 — Թեմաների Բազա
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,5vw,42px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.3px', marginBottom: '10px' }}>
          Թեմաների Բազա
        </h1>
        <div style={{ width: '52px', height: '3px', background: 'linear-gradient(90deg, var(--blue-mid), var(--gold))', borderRadius: '2px', marginBottom: '14px' }} />
        <p style={{ fontSize: '16px', color: 'var(--ink-muted)', fontStyle: 'italic', maxWidth: '540px', lineHeight: 1.65 }}>
          Ընտրեք Գրականության կամ Պատմության բաժինը՝ թեմաներն ուսումնասիրելու համար:
        </p>
      </div>

      {/* Section switcher — always visible */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
        <SectionPill
          active={section === 'literature'}
          onClick={() => handleSectionSwitch('literature')}
          icon="📚"
          label="Գրականություն"
          color="var(--blue)"
        />
        <SectionPill
          active={section === 'history'}
          onClick={() => handleSectionSwitch('history')}
          icon="🏛"
          label="Պատմություն"
          color="var(--green)"
        />
      </div>

      {/* Active section label */}
      {(view === 'lit-list' || view === 'hist-list') && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '8px', marginBottom: '22px',
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,3vw,24px)', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
            {section === 'literature' ? 'Գրականության Թեմաներ' : 'Պատմական Թեմաներ'}
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
            {section === 'literature' ? `${literatureThemes.length} թեմա` : `${historyTopics.length} թեմա`}
          </span>
        </div>
      )}

      {/* Literature list */}
      {view === 'lit-list' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))', gap: '16px' }}>
          {literatureThemes.map(theme => (
            <ThemeCard
              key={theme.id}
              item={theme}
              section="literature"
              onClick={item => { setSelectedLit(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          ))}
        </div>
      )}

      {/* History list */}
      {view === 'hist-list' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))', gap: '16px' }}>
          {historyTopics.map(topic => (
            <ThemeCard
              key={topic.id}
              item={topic}
              section="history"
              onClick={item => { setSelectedHist(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          ))}
        </div>
      )}

      {/* Literature detail */}
      {view === 'lit-detail' && selectedLit && (
        <LiteratureDetailPage
          theme={selectedLit}
          onBack={() => setSelectedLit(null)}
          onNavigateToHistory={handleNavigateToHistory}
        />
      )}

      {/* History detail */}
      {view === 'hist-detail' && selectedHist && (
        <HistoryDetailPage
          topic={selectedHist}
          onBack={() => setSelectedHist(null)}
          onNavigateToLiterature={handleNavigateToLiterature}
        />
      )}
    </div>
  );
}