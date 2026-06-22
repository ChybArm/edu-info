import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { criteria, totalPoints, commonMistakes } from '../data/grading';

function PointDots({ value, max, color }) {
  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: i < value ? color : 'var(--border)',
            transition: 'background 0.2s',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function ScoreBar({ value, max, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div
        style={{
          flex: 1,
          background: 'var(--border-light)',
          borderRadius: '4px',
          height: '6px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${(value / max) * 100}%`,
            height: '100%',
            background: color,
            borderRadius: '4px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
      <span
        style={{
          fontSize: '12px',
          fontWeight: 700,
          color,
          minWidth: '32px',
          textAlign: 'right',
          fontFamily: 'monospace',
        }}
      >
        {value}/{max}
      </span>
    </div>
  );
}

function SubCriterionRow({ sub, accentColor }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderLeft: `3px solid ${accentColor}40`,
        marginLeft: '8px',
        paddingLeft: '16px',
        marginBottom: '12px',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          padding: '8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {sub.label && (
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: accentColor,
                  flexShrink: 0,
                }}
              >
                {sub.label}
              </span>
            )}

            <span
              style={{
                fontSize: '14.5px',
                fontWeight: 600,
                color: 'var(--ink)',
                lineHeight: 1.4,
              }}
            >
              {sub.name}
            </span>
          </div>

          <div style={{ marginTop: '6px' }}>
            <PointDots
              value={sub.maxPoints}
              max={sub.maxPoints}
              color={accentColor}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: accentColor,
              fontFamily: 'monospace',
            }}
          >
            {sub.maxPoints} միավոր
          </span>

          <span
            style={{
              color: 'var(--ink-muted)',
              fontSize: '13px',
              transition: 'transform 0.2s',
              display: 'inline-block',
              transform: open ? 'rotate(180deg)' : 'rotate(0)',
            }}
          >
            ▼
          </span>
        </div>
      </button>

      {open && (
        <div
          style={{
            marginTop: '4px',
            marginBottom: '8px',
            display: 'grid',
            gap: '8px',
          }}
        >
          {[
            {
              label: `Գերազանց (${sub.maxPoints} միավոր)`,
              text: sub.descriptors.high,
              color: 'var(--green)',
            },
            {
              label: `Լավ (${Math.ceil(sub.maxPoints / 2)} միավոր)`,
              text: sub.descriptors.mid,
              color: 'var(--gold)',
            },
            {
              label: `Անբավարար (0–1 միավոր)`,
              text: sub.descriptors.low,
              color: 'var(--red)',
            },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                padding: '10px 12px',
                background: 'var(--bg)',
                borderRadius: '6px',
                borderLeft: `3px solid ${row.color}`,
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: row.color,
                  minWidth: '90px',
                  flexShrink: 0,
                  fontFamily: 'monospace',
                  lineHeight: 1.6,
                }}
              >
                {row.label}
              </span>

              <span
                style={{
                  fontSize: '13.5px',
                  color: 'var(--ink-light)',
                  lineHeight: 1.7,
                }}
              >
                {row.text}
              </span>
            </div>
          ))}

          {/* Новый блок для вывода Note */}
          {sub.note && (
            <div
              style={{
                marginTop: '4px',
                padding: '10px 12px',
                background: 'var(--bg-alt)',
                borderRadius: '6px',
                borderLeft: `3px solid ${accentColor}`,
                fontSize: '13px',
                color: 'var(--ink-muted)',
                fontStyle: 'italic',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              <span style={{ fontSize: '14px' }}></span>
              <div>
                <strong style={{ fontStyle: 'normal', color: 'var(--ink)' }}>Նշում՝ </strong>
                {sub.note}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CriterionCard({ criterion }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: 'var(--white)',
        border: `1.5px solid ${
          open ? criterion.color : 'var(--border)'
        }`,
        borderRadius: '14px',
        overflow: 'hidden',
        marginBottom: '12px',
        boxShadow: 'var(--shadow)',
        transition: 'border-color 0.2s',
      }}
    >
      <div
        style={{
          height: '3px',
          background: `linear-gradient(90deg, ${criterion.color}, ${criterion.color}88)`,
        }}
      />

      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px',
          background: open
            ? criterion.color + '0c'
            : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
          transition: 'background 0.2s',
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '6px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '19px',
                fontWeight: 700,
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              {criterion.name}
            </h3>

            <span
              style={{
                fontSize: '12px',
                color: 'var(--ink-muted)',
                fontStyle: 'italic',
              }}
            >
              {criterion.nameEn}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {criterion.subCriteria.map((sub) => (
              <div
                key={sub.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {sub.label && (
                  <span
                    style={{
                      fontSize: '11px',
                      color: criterion.color,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                    }}
                  >
                    {sub.label}
                  </span>
                )}

                <PointDots
                  value={sub.maxPoints}
                  max={sub.maxPoints}
                  color={criterion.color + '70'}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 700,
                color: criterion.color,
                lineHeight: 1,
              }}
            >
              {criterion.maxPoints}
            </div>

            <div
              style={{
                fontSize: '11px',
                color: 'var(--ink-muted)',
                fontFamily: 'monospace',
              }}
            >
              միավոր
            </div>
          </div>

          <span
            style={{
              color: criterion.color,
              fontSize: '16px',
              transition: 'transform 0.2s',
              display: 'inline-block',
              transform: open
                ? 'rotate(180deg)'
                : 'rotate(0)',
            }}
          >
            ▼
          </span>
        </div>
      </button>

      {open && (
        <div
          style={{
            padding: '4px 20px 20px',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-body)',
              letterSpacing: '2px',
              color: 'var(--ink-muted)',
              textTransform: 'uppercase',
              margin: '16px 0 14px',
            }}
          >
            Ենթաչափանիշներ
          </div>

          {criterion.subCriteria.map((sub) => (
            <SubCriterionRow
              key={sub.id}
              sub={sub}
              accentColor={criterion.color}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExamStructure() {
  return (
    <div>
      <SectionHeader
        number="01"
        title="Էսսեի կառուցվածք"
        subtitle="Նախքան բուն առաջադրանքին անցնելը, ծանոթացե՛ք գնահատման սկզբունքներին։"
        color="var(--blue)"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(155px, 1fr))',
          gap: '12px',
          marginBottom: '40px',
        }}
      >
        {criteria.map((c) => (
          <div
            key={c.id}
            style={{
              background: 'var(--white)',
              border: `1.5px solid ${c.color}`,
              borderRadius: '12px',
              padding: '16px 18px',
              boxShadow: 'var(--shadow)',
            }}
          >

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: '6px',
                lineHeight: 1.35,
              }}
            >
              {c.name}
            </div>
            <div
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                letterSpacing: '1px',
                color: c.color,
                marginBottom: '6px',
              }}
            >
              {c.subCriteria.length} ենթաչափանիշ
            </div>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: 700,
                color: c.color,
                lineHeight: 1,
              }}
            >
              {c.maxPoints}
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'var(--ink-muted)',
                  fontFamily: 'monospace',
                }}
              >
                {' '}
                միավոր
              </span>
            </div>

            <div style={{ marginTop: '8px' }}>
              <ScoreBar
                value={c.maxPoints}
                max={totalPoints}
                color={c.color}
              />
            </div>
          </div>
        ))}

        <div
          style={{
            background: 'var(--blue)',
            borderRadius: '12px',
            padding: '16px 18px',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              letterSpacing: '1px',
              color: 'var(--gold-light)',
              marginBottom: '6px',
            }}
          >
            ԸՆԴՀԱՆՈՒՐ
          </div>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: 700,
              color: 'var(--gold)',
              lineHeight: 1,
            }}
          >
            {totalPoints}
          </div>

          <div
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              marginTop: '4px',
            }}
          >
            առավելագույն միավոր
          </div>
        </div>
      </div>

      <section style={{ marginBottom: '52px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            marginBottom: '6px',
          }}
        >
          Գնահատման չափանիշներ
        </h2>

        <p
          style={{
            color: 'var(--ink-muted)',
            fontStyle: 'italic',
            marginBottom: '20px',
            fontSize: '14px',
          }}
        >
          Սեղմե՛ք յուրաքանչյուր չափանիշի վրա՝ ենթաչափանիշները տեսնելու համար։
        </p>

        {criteria.map((c) => (
          <CriterionCard key={c.id} criterion={c} />
        ))}
      </section>

      <section style={{ marginBottom: '52px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            marginBottom: '20px',
          }}
        >
          Հաճախ հանդիպող սխալներ։ Ինչպե՞ս խուսափել դրանցից
        </h2>

        <div style={{ display: 'grid', gap: '12px' }}>
          {commonMistakes.map((m, i) => (
            <div
              key={i}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '18px 20px',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    background: 'var(--red-light)',
                    color: 'var(--red)',
                    borderRadius: '50%',
                    width: '26px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px',
                    flexShrink: 0,
                  }}
                >
                  ✕
                </span>

                <span
                  style={{
                    fontWeight: 600,
                    color: 'var(--ink)',
                    fontSize: '15px',
                    lineHeight: 1.4,
                  }}
                >
                  {m.mistake}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    background: 'var(--green-light)',
                    color: 'var(--green)',
                    borderRadius: '50%',
                    width: '26px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px',
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>

                <span
                  style={{
                    color: 'var(--ink-light)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                  }}
                >
                  {m.tip}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            marginBottom: '20px',
          }}
        >
          Վերջնական ստուգման ցանկ
        </h2>

        <div
          style={{
            background: 'var(--blue)',
            borderRadius: '14px',
            padding: '28px 32px',
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.48)',
              fontSize: '14px',
              marginBottom: '20px',
              fontStyle: 'italic',
              fontFamily: 'var(--font-display)',
            }}
          >
            Աշխատանքը հանձնելուց առաջ ստուգե՛ք հետևյալ կետերը․
          </p>

          {[
            'Իմ թեզը հստակ է և ուղղակիորեն պատասխանում է հարցին։',
            'Յուրաքանչյուր պարբերություն տրամաբանորեն կապված է թեզի հետ։',
            'Բոլոր փաստարկները հիմնավորված են և ունեն բացատրություն։',
            'Ներկայացված է անհրաժեշտ պատմական համատեքստը։',
            'Եզրակացությունն արտահայտում է ամփոփիչ և խոր վերլուծություն։',
            'Լեզուն զուսպ է՝ զերծ անձնական հույզերից և ավելորդ մեկնաբանություններից։',
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                padding: '10px 0',
                borderBottom:
                  i < 5
                    ? '1px solid rgba(255,255,255,0.08)'
                    : 'none',
              }}
            >
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid var(--gold)',
                  borderRadius: '4px',
                  flexShrink: 0,
                  marginTop: '3px',
                }}
              />

              <span
                style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}