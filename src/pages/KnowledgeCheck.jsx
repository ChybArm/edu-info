import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { questions, matchingPairs, selfAssessmentItems } from '../data/quizzes';

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];

  const handleReveal = () => {
    if (selected === null) return;
    setRevealed(true);
    if (selected === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1); setSelected(null); setRevealed(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const final = score;
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '58px', fontWeight: 700, color: 'var(--blue-mid)', marginBottom: '8px' }}>
          {final}/{questions.length}
        </div>
        <p style={{ fontSize: '16px', color: 'var(--ink-light)', marginBottom: '24px', fontFamily: 'var(--font-display)' }}>
          {final === questions.length ? '🎉 Հիանալի է: Դուք կատարելապես տիրապետում եք նյութին:'
            : final >= questions.length * 0.7 ? 'Լավ արդյունք է. վերանայեք այն հարցերը, որոնցում թերացել եք:'
              : 'Շարունակեք աշխատել. խորհուրդ ենք տալիս կրկին անցնել տեսական նյութը և փորձել նորից:'}
        </p>
        <button
          onClick={() => { setCurrent(0); setSelected(null); setRevealed(false); setScore(0); setDone(false); }}
          style={{
            padding: '12px 28px', background: 'var(--blue-mid)', color: 'var(--white)',
            border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}
        >
          Վերսկսել թեստը
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '20px' }}>
        <span>Հարց {current + 1} / {questions.length}-ից</span>
        <span>Ընդհանուր միավոր. {score}</span>
      </div>

      <div style={{ background: 'var(--blue-pale)', borderRadius: '12px', padding: '20px 22px', marginBottom: '20px', borderLeft: '4px solid var(--blue-mid)' }}>
        <p style={{ fontSize: '17px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-display)' }}>
          {q.text}
        </p>
      </div>

      <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        {q.options.map((opt, i) => {
          let bg = 'var(--white)', border = 'var(--border)', color = 'var(--ink)';
          if (revealed) {
            if (i === q.correct) { bg = 'var(--green-light)'; border = 'var(--green)'; color = 'var(--green)'; }
            else if (i === selected && i !== q.correct) { bg = 'var(--red-light)'; border = 'var(--red)'; color = 'var(--red)'; }
          } else if (selected === i) {
            bg = 'var(--blue-light)'; border = 'var(--blue-mid)'; color = 'var(--blue-mid)';
          }
          return (
            <button key={i} onClick={() => !revealed && setSelected(i)} style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              padding: '14px 16px', background: bg, border: `1.5px solid ${border}`,
              borderRadius: '10px', cursor: revealed ? 'default' : 'pointer',
              textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '15px',
              color, lineHeight: 1.55, transition: 'all 0.15s',
            }}>
              <span style={{ fontWeight: 700, flexShrink: 0, minWidth: '20px' }}>
                {['Ա', 'Բ', 'Գ', 'Դ'][i]}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div style={{
          background: 'var(--blue)', color: 'var(--white)',
          borderRadius: '10px', padding: '16px 18px',
          fontSize: '14.5px', lineHeight: 1.75, marginBottom: '16px',
        }}>
          <strong style={{ color: 'var(--gold-light)', display: 'block', marginBottom: '6px' }}>
            {selected === q.correct ? '✓ Ճիշտ է' : '✗ Սխալ է. ճիշտ պատասխանն է՝'}
          </strong>
          {q.explanation}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        {!revealed && (
          <button onClick={handleReveal} disabled={selected === null} style={{
            padding: '12px 24px',
            background: selected !== null ? 'var(--blue-mid)' : 'var(--border)',
            color: 'var(--white)', border: 'none', borderRadius: '8px',
            fontSize: '15px', fontWeight: 600,
            cursor: selected !== null ? 'pointer' : 'default',
            fontFamily: 'var(--font-body)',
          }}>
            Ստուգել պատասխանը
          </button>
        )}
        {revealed && (
          <button onClick={handleNext} style={{
            padding: '12px 24px', background: 'var(--ink)', color: 'var(--white)',
            border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}>
            {current < questions.length - 1 ? 'Հաջորդ հարցը →' : 'Տեսնել արդյունքները'}
          </button>
        )}
      </div>
    </div>
  );
}

function Matching() {
  const [matches, setMatches] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [checked, setChecked] = useState(false);
  const [works] = useState(() => [...matchingPairs.map(p => ({ id: p.id, text: p.work }))].sort(() => Math.random() - 0.5));

  const handleEvent = (id) => { if (!checked) setSelectedEvent(id); };
  const handleWork = (workId) => {
    if (checked || !selectedEvent) return;
    setMatches(m => ({ ...m, [selectedEvent]: workId }));
    setSelectedEvent(null);
  };

  const correct = Object.entries(matches).filter(([eId, wId]) => eId === wId).length;

  return (
    <div>
      <p style={{ fontSize: '14px', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: '20px' }}>
        Ընտրեք իրադարձությունը ձախ սյունակից, ապա համապատասխան գրական երկը՝ աջից:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', color: 'var(--blue)', marginBottom: '10px', textTransform: 'uppercase' }}>
            Պատմական իրադարձություններ
          </div>
          {matchingPairs.map(p => (
            <div key={p.id} onClick={() => handleEvent(p.id)} style={{
              background: selectedEvent === p.id ? 'var(--blue-light)' : matches[p.id] ? 'var(--bg-alt)' : 'var(--white)',
              border: `1.5px solid ${selectedEvent === p.id ? 'var(--blue-mid)' : 'var(--border)'}`,
              borderRadius: '8px', padding: '12px 14px', marginBottom: '8px',
              cursor: checked ? 'default' : 'pointer',
              fontSize: '13.5px', color: 'var(--ink)', lineHeight: 1.55,
              opacity: matches[p.id] ? 0.6 : 1, transition: 'all 0.15s',
            }}>
              {p.event}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', color: 'var(--teal)', marginBottom: '10px', textTransform: 'uppercase' }}>
            Գրական երկեր
          </div>
          {works.map((w) => {
  const eventId = Object.entries(matches).find(
    ([, wid]) => wid === w.id
  )?.[0];

  const isChosen = !!eventId;
  const isCorrect = checked && eventId === w.id;
  const isWrong = checked && eventId && eventId !== w.id;

  return (
    <div
      key={w.id}
      onClick={() => handleWork(w.id)}
      style={{
        background: isCorrect
          ? "#dcfce7"
          : isWrong
          ? "#fee2e2"
          : "#ffffff",

        border: `1.5px solid ${
          isCorrect
            ? "#16a34a"
            : isWrong
            ? "#dc2626"
            : "#d1d5db"
        }`,

        borderRadius: "8px",
        padding: "12px 14px",
        marginBottom: "8px",
        cursor: checked ? "default" : "pointer",
        fontSize: "13.5px",
        color: "#111827",
        lineHeight: 1.55,
        transition: "all 0.2s ease",

        // вот это главное изменение
        opacity: !checked && isChosen ? 0.45 : 1
      }}
    >
      {w.text}
    </div>
  );
})}
        </div>
      </div>

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          disabled={Object.keys(matches).length < matchingPairs.length}
          style={{
            padding: '12px 24px',
            background: Object.keys(matches).length >= matchingPairs.length ? 'var(--teal)' : 'var(--border)',
            color: 'var(--white)', border: 'none', borderRadius: '8px',
            fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-body)',
            cursor: Object.keys(matches).length >= matchingPairs.length ? 'pointer' : 'default',
          }}
        >
          Ստուգել ({Object.keys(matches).length}/{matchingPairs.length})
        </button>
      ) : (
        <div style={{ background: 'var(--blue)', color: 'var(--white)', borderRadius: '10px', padding: '16px 20px', fontSize: '15px' }}>
          <strong style={{ color: 'var(--gold-light)' }}>{correct}/{matchingPairs.length} ճիշտ պատասխան.</strong>
          {correct === matchingPairs.length
            ? ' Կատարյալ է: Դուք հիանալի եք տեսնում պատմական և գրական կապերը:' 
            : ' Վերանայեք այն զույգերը, որոնցում սխալվել եք:'}
        </div>
      )}
    </div>
  );
}

function SelfAssessment() {
  const [checked, setChecked] = useState({});
  const total = selfAssessmentItems.length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <p style={{ fontSize: '14px', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: '20px' }}>
        Ազնվորեն նշեք այն կետերը, որոնք արդեն յուրացրել եք: Սա ձեր անհատական առաջընթացի քարտեզն է:
      </p>
      <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
        {selfAssessmentItems.map(item => (
          <label key={item.id} style={{
            display: 'flex', gap: '14px', alignItems: 'flex-start',
            padding: '14px 16px',
            background: checked[item.id] ? 'var(--green-light)' : 'var(--white)',
            border: `1.5px solid ${checked[item.id] ? 'var(--green)' : 'var(--border)'}`,
            borderRadius: '10px', cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <input
              type="checkbox"
              checked={!!checked[item.id]}
              onChange={e => setChecked(c => ({ ...c, [item.id]: e.target.checked }))}
              style={{ width: '18px', height: '18px', flexShrink: 0, marginTop: '3px', accentColor: 'var(--green)' }}
            />
            <span style={{ fontSize: '15px', color: 'var(--ink)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              {item.text}
            </span>
          </label>
        ))}
      </div>
      <div style={{
        background: done === total ? 'var(--green)' : 'var(--blue)',
        color: 'var(--white)', borderRadius: '10px', padding: '16px 20px', fontSize: '15px',
      }}>
        <strong>{done}/{total} կետ յուրացված է:</strong>{' '}
        {done === total ? '🎉 Դուք պատրաստ եք քննությանը:'
          : done >= total * 0.7 ? 'Շատ մոտ եք. ուշադրություն դարձրեք չնշված կետերին:'
            : 'Շարունակեք ուսումնասիրել. դեռ աշխատելու տեղ կա:'}
      </div>
    </div>
  );
}

export default function KnowledgeCheck() {
  const [tab, setTab] = useState('quiz');

  const tabs = [
    { id: 'quiz', label: '📝 Թեստ', color: 'var(--blue-mid)' },
    { id: 'matching', label: '🔗 Համապատասխանեցում', color: 'var(--teal)' },
    { id: 'self', label: '✅ Ինքնագնահատում', color: 'var(--green)' },
  ];

  return (
    <div>
      <SectionHeader
        number="05"
        title="Գիտելիքի ստուգում"
        subtitle="Ստուգե՛ք ձեր պատրաստվածությունը, բացահայտե՛ք թույլ կողմերը և ամրապնդե՛ք ձեր գիտելիքները:"
        color="var(--blue)"
      />

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '10px 20px', borderRadius: '8px',
            border: `1.5px solid ${tab === t.id ? t.color : 'var(--border)'}`,
            background: tab === t.id ? t.color : 'var(--white)',
            color: tab === t.id ? 'var(--white)' : 'var(--ink)',
            fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{
        background: 'var(--white)', border: '1.5px solid var(--border)',
        borderRadius: '14px', padding: '28px', boxShadow: 'var(--shadow)',
      }}>
        {tab === 'quiz' && <Quiz />}
        {tab === 'matching' && <Matching />}
        {tab === 'self' && <SelfAssessment />}
      </div>
    </div>
  );
}