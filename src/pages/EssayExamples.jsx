import { useMemo } from 'react';
import { essays } from '../data/essays';
import { criteria } from '../data/grading';
import ScoreBar from '../components/ScoreBar';

const totalPoints = criteria.reduce((s, c) => s + c.maxPoints, 0);

function EssayExamples() {
  // берём первый essay (можешь заменить на выбор или map)
  const essay = essays?.[0];

  // безопасная проверка
  if (!essay) {
    return <div>Нет данных эссе</div>;
  }

  const isMobile = window.innerWidth < 768;

  const totalScore =
    essay.scores
      ? Object.values(essay.scores).reduce((a, b) => a + b, 0)
      : 0;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile
          ? '1fr'
          : 'minmax(0,1fr) 290px',
        gap: '28px',
        alignItems: 'start',
      }}
    >
      {/* LEFT SIDE */}
      <div>
        <span
          style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '20px',
            background:
              essay.level === 'high'
                ? 'var(--teal-light)'
                : 'var(--gold-pale)',
            color:
              essay.level === 'high'
                ? 'var(--teal)'
                : 'var(--gold)',
            marginBottom: '14px',
          }}
        >
          {essay.level === 'high'
            ? '⭐ Բարձր մակարդակ'
            : '📝 Միջին մակարդակ'}
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '6px',
          }}
        >
          {essay.title}
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--ink-muted)',
            fontStyle: 'italic',
            marginBottom: '24px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border)',
            lineHeight: '1.6',
          }}
        >
          Հարց. «{essay.prompt}»
        </p>

        {/* BODY */}
        <div
          style={{
            fontSize: isMobile ? '15px' : '16px',
            lineHeight: 1.9,
            color: 'var(--ink)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {(() => {
            const text = essay.body || '';
            const parts = [];
            let lastIndex = 0;

            const annotations = essay.annotations || [];

            const sorted = [...annotations].sort(
              (a, b) =>
                text.indexOf(a.startText) -
                text.indexOf(b.startText)
            );

            sorted.forEach((ann, i) => {
              const idx = text.indexOf(
                ann.startText,
                lastIndex
              );

              if (idx === -1) return;

              if (idx > lastIndex) {
                parts.push(
                  <span key={`t${i}`}>
                    {text.slice(lastIndex, idx)}
                  </span>
                );
              }

              parts.push(
                <span
                  key={`a${i}`}
                  title={ann.note}
                  style={{
                    background:
                      ann.type === 'strength'
                        ? 'rgba(14,92,107,0.1)'
                        : 'rgba(139,26,26,0.08)',
                    borderBottom: `2px solid ${
                      ann.type === 'strength'
                        ? 'var(--teal)'
                        : 'var(--red)'
                    }`,
                    borderRadius: '2px',
                    cursor: 'help',
                    padding: '1px 0',
                  }}
                >
                  {ann.startText}
                </span>
              );

              lastIndex =
                idx + ann.startText.length;
            });

            if (lastIndex < text.length) {
              parts.push(
                <span key="end">
                  {text.slice(lastIndex)}
                </span>
              );
            }

            return parts;
          })()}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          position: isMobile ? 'static' : 'sticky',
          top: '80px',
        }}
      >
        <div
          style={{
            background: 'var(--white)',
            border: '1.5px solid var(--border)',
            borderRadius: '14px',
            padding: '22px',
            boxShadow: 'var(--shadow)',
            marginBottom: '14px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '50px',
                fontWeight: 700,
                color:
                  essay.level === 'high'
                    ? 'var(--teal)'
                    : 'var(--gold)',
                lineHeight: 1,
              }}
            >
              {totalScore}
            </div>

            <div
              style={{
                fontSize: '14px',
                color: 'var(--ink-muted)',
              }}
            >
              {totalPoints}-ից
            </div>
          </div>

          {criteria.map((c) => (
            <div key={c.id} style={{ marginBottom: '14px' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ink-light)',
                  marginBottom: '4px',
                }}
              >
                {c.name}
              </div>

              {c.subCriteria.map((sub) => (
                <div key={sub.id} style={{ marginBottom: '6px' }}>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--ink-muted)',
                      marginBottom: '3px',
                    }}
                  >
                    {sub.label} {sub.name}
                  </div>

                  <ScoreBar
                    value={essay.scores?.[sub.id] || 0}
                    max={sub.maxPoints}
                    color={
                      essay.level === 'high'
                        ? 'var(--teal)'
                        : 'var(--gold)'
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            background:
              essay.level === 'high'
                ? 'var(--teal-light)'
                : 'var(--gold-pale)',
            border: `1px solid ${
              essay.level === 'high'
                ? 'var(--teal)'
                : 'var(--gold)'
            }`,
            borderRadius: '12px',
            padding: '16px 18px',
            fontSize: '14px',
            color: 'var(--ink)',
            lineHeight: 1.75,
          }}
        >
          <strong
            style={{
              fontFamily: 'var(--font-display)',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Ընդհանուր դիտարկում
          </strong>

          {essay.feedback}
        </div>
      </div>
    </div>
  );
}

export default EssayExamples;