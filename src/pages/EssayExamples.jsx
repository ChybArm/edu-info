import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { essays } from '../data/essays';
import { criteria } from '../data/grading';

const totalPoints = criteria.reduce((s, c) => s + c.maxPoints, 0);

function ScoreBar({ value, max, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, background: 'var(--border-light)', borderRadius: '4px', height: '7px', overflow: 'hidden' }}>
        <div style={{
          width: `${(value / max) * 100}%`,
          height: '100%',
          background: color,
          borderRadius: '4px',
          transition: 'width 0.5s ease',
        }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: 700, color, minWidth: '36px', textAlign: 'right', fontFamily: 'monospace' }}>
        {value}/{max}
      </span>
    </div>
  );
}

export default function EssayExamples() {
  const [selected, setSelected] = useState(null);
  const essay = essays.find(e => e.id === selected);
  const totalScore = essay ? Object.values(essay.scores).reduce((a, b) => a + b, 0) : 0;

  return (
    <div>
      <SectionHeader
        number="04"
        title="Էսսեի օրինակներ"
        subtitle="Ուսումնասիրեք ծանոթագրված միջին և բարձր մակարդակի աշխատանքները և հասկացեք, թե ինչպես են կիրառվում գնահատման չափանիշները։!"
        color="var(--gold)"
      />

      {!essay ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          {essays.map(e => {
            const score = Object.values(e.scores).reduce((a, b) => a + b, 0);
            const isHigh = e.level === 'high';
            return (
              <div
                key={e.id}
                onClick={() => setSelected(e.id)}
                style={{
                  background: 'var(--white)',
                  border: `1.5px solid ${isHigh ? 'var(--teal)' : 'var(--gold)'}`,
                  borderRadius: '14px', padding: '24px',
                  cursor: 'pointer', boxShadow: 'var(--shadow)',
                  transition: 'box-shadow 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{
                    display: 'inline-block', fontSize: '12px', fontWeight: 700,
                    padding: '4px 12px', borderRadius: '20px',
                    background: isHigh ? 'var(--teal-light)' : 'var(--gold-pale)',
                    color: isHigh ? 'var(--teal)' : 'var(--gold)',
                    border: `1px solid ${isHigh ? 'var(--teal)' : 'var(--gold)'}`,
                  }}>
                    {isHigh ? '⭐ Բարձր մակարդակ' : '📝 Միջին մակարդակ'}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700,
                    color: isHigh ? 'var(--teal)' : 'var(--gold)',
                  }}>
                    {score}/{totalPoints}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                  {e.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: '12px', lineHeight: 1.6 }}>
                  Հարց. «{e.prompt}»
                </p>
                <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: 1.7 }}>{e.feedback}</p>
                <div style={{ marginTop: '14px', fontSize: '14px', color: isHigh ? 'var(--teal)' : 'var(--gold)', fontWeight: 600 }}>
                  Կարդալ ամբողջական էսսեն →
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelected(null)}
            style={{
              background: 'none', border: '1px solid var(--border)', borderRadius: '8px',
              padding: '8px 16px', fontSize: '14px', color: 'var(--ink-light)',
              cursor: 'pointer', marginBottom: '28px', fontFamily: 'var(--font-body)',
            }}
          >
            ← Վերադառնալ բոլոր օրինակներին
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 290px', gap: '28px', alignItems: 'start' }}>
            <div>
              <span style={{
                display: 'inline-block', fontSize: '12px', fontWeight: 700,
                padding: '4px 12px', borderRadius: '20px',
                background: essay.level === 'high' ? 'var(--teal-light)' : 'var(--gold-pale)',
                color: essay.level === 'high' ? 'var(--teal)' : 'var(--gold)',
                marginBottom: '14px',
              }}>
                {essay.level === 'high' ? '⭐ Բարձր մակարդակ' : '📝 Միջին մակարդակ'}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>
                {essay.title}
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
                Հարց. «{essay.prompt}»
              </p>

              <div style={{ fontSize: '16px', lineHeight: 1.9, color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
                {(() => {
                  const text = essay.body;
                  const parts = [];
                  let lastIndex = 0;
                  const sorted = [...essay.annotations].sort((a, b) =>
                    text.indexOf(a.startText) - text.indexOf(b.startText)
                  );
                  sorted.forEach((ann, i) => {
                    const idx = text.indexOf(ann.startText, lastIndex);
                    if (idx === -1) return;
                    if (idx > lastIndex) parts.push(<span key={`t${i}`}>{text.slice(lastIndex, idx)}</span>);
                    parts.push(
                      <span key={`a${i}`} title={ann.note} style={{
                        background: ann.type === 'strength' ? 'rgba(14,92,107,0.1)' : 'rgba(139,26,26,0.08)',
                        borderBottom: `2px solid ${ann.type === 'strength' ? 'var(--teal)' : 'var(--red)'}`,
                        borderRadius: '2px', cursor: 'help', padding: '1px 0',
                      }}>
                        {ann.startText}
                      </span>
                    );
                    lastIndex = idx + ann.startText.length;
                  });
                  if (lastIndex < text.length) parts.push(<span key="end">{text.slice(lastIndex)}</span>);
                  return parts;
                })()}
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--ink-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'inline-block', width: '14px', height: '3px', background: 'var(--teal)', borderRadius: '2px', marginRight: '6px' }}></span>
                  Հաջողված հատված (պահեք մկնիկը)
                </span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'inline-block', width: '14px', height: '3px', background: 'var(--red)', borderRadius: '2px', marginRight: '6px' }}></span>
                  Թերություն/սխալ (պահեք մկնիկը)
                </span>
              </div>
            </div>

            {/* Score panel */}
            <div style={{ position: 'sticky', top: '80px' }}>
              <div style={{
                background: 'var(--white)', border: '1.5px solid var(--border)',
                borderRadius: '14px', padding: '22px', boxShadow: 'var(--shadow)', marginBottom: '14px',
              }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '50px', fontWeight: 700,
                    color: essay.level === 'high' ? 'var(--teal)' : 'var(--gold)', lineHeight: 1,
                  }}>
                    {totalScore}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>{totalPoints}-ից</div>
                </div>

                {criteria.map(c => (
                  <div key={c.id} style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-light)', marginBottom: '4px' }}>
                      {c.name}
                    </div>
                    {c.subCriteria.map(sub => (
                      <div key={sub.id} style={{ marginBottom: '6px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '3px' }}>
                          {sub.label} {sub.name}
                        </div>
                        <ScoreBar
                          value={essay.scores[sub.id] || 0}
                          max={sub.maxPoints}
                          color={essay.level === 'high' ? 'var(--teal)' : 'var(--gold)'}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{
                background: essay.level === 'high' ? 'var(--teal-light)' : 'var(--gold-pale)',
                border: `1px solid ${essay.level === 'high' ? 'var(--teal)' : 'var(--gold)'}`,
                borderRadius: '12px', padding: '16px 18px',
                fontSize: '14px', color: 'var(--ink)', lineHeight: 1.75,
              }}>
                <strong style={{ fontFamily: 'var(--font-display)', display: 'block', marginBottom: '6px' }}>
                  Ընդհանուր դիտարկում
                </strong>
                {essay.feedback}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}