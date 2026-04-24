import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import Diagram from '../components/Diagram';
import Expandable from '../components/Expandable';
import { eras, authors } from '../data/topics';

const steps = [
  {
    label: 'Դարաշրջան',
    detail: 'Սկսիր՝ որոշելով, թե որ պատմական ժամանակաշրջանին է պատկանում գործը։ Դարաշրջանը ձևավորում է ամեն ինչ — արժեքները, վախերն ու հարցերը, որ հեղինակը գրում է։',
    example: '19-րդ դ. Ռոմանտիզմ — ազգային ազատագրական շարժումների, հայ ժողովրդի ռուսական ու թուրքական ճնշման, աշխարհաբար լեզվի ծնունդի ժամանակ։',
    question: 'Ինչ էր կատարվում աշխարհում, երբ գործն ստեղծվեց? Ի՞նչից էին վախենում, ինչ էին ուզում?',
  },
  {
    label: 'Գրական Գործ',
    detail: 'Անվանիր կոնկրետ գործն ու հեղինակին։ Ո՞ր ժանրի է, ե՞րբ ու ինչու՞ է գրվել, ու ո՞ւ համար։',
    example: 'Խ. Աբովյան «Վերք Հայաստանի» (1841) — առաջին հայ վեպը, գրված աշխարհաբար, ռուս-պարսկական պատերազմի ֆոնին։',
    question: 'Ո՞ր ժանրի է գործը: Ո՞վ, ե՞րբ ու ի՞նչ նպատակով է գրել: Ո՞ւ համար:',
  },
  {
    label: 'Հիմնական Գաղափար',
    detail: 'Որոշիր, թե կոնկրետ ո՞ր կենտրոնական թեման ես ուզում վերլուծել։ Կոնկրետ եղիր — ոչ «ազատություն», այլ «ազգային ինքնությունն ու ճնշված ժողովրդի ձայնը»։',
    example: 'Աբովյանի մոտ՝ ազգային ինքնությունն ու ժողովրդի ողբը ռուսական «ազատագրման» ֆոնին. ազատությո՞ւն, թե՞ նոր ճնշում:',
    question: 'Ո՞ր կոնկրետ գաղափարն ես ուզում վերլուծել: Կարո՞ղ ես արտահայտել մեկ նախադասությամբ, որի հետ կարելի է համաձայն չլինել:',
  },
  {
    label: 'Պատմական Համատեքստ',
    detail: 'Կապիր հիմնական գաղափարն ու գործն իրական պատմական իրադարձությանն ու ժամանակաշրջանի կոնտեքստի հետ։ Սա է տարբերում վերլուծությունը վերապատմությունից։',
    example: 'Ռուս-պարսկական 1826–28 թթ. պատերազմ — Արևելյան Հայաստանն անցնում է Ռուսաստանին, բայց հայ ժողովրդի կյանքը, ճնշումն ու ինքնությունը մնում են անլուծ:',
    question: 'Ո՞ր իրական իրադարձությունն է կապ ունի գաղափարի հետ: Ո՞րն է պատմական ֆոնն ու ճնշումը:',
  },
];

const chainExamples = [
  {
    title: 'Աբովյան — «Վերք Հայաստանի»',
    era: 'Ռոմանտիզմ, 19-րդ դ. առաջին կես',
    work: '«Վերք Հայաստանի», Աբովյան (1841)',
    idea: 'Ազգային ինքնություն ու ժողովրդի ողբ ռուսական «ազատագրման» ֆոնին',
    context: 'Ռուս-պարսկական 1826–28 թթ. պատերազմ — Արևելյան Հայաստանն անցնում է Ռուսաստանին',
    color: 'var(--gold)',
  },
  {
    title: 'Չարենց — «Ես իմ անուշ Հայաստանի»',
    era: '20-րդ դ., Ցեղասպանությունից հետո',
    work: '«Ես իմ անուշ Հայաստանի», Չարենց (1920)',
    idea: 'Հայրենիքի կարոտ ու ողբ — հայ ինքնությունն ու լեզուն որպես փրկություն',
    context: '1915 թ. Հայոց ցեղասպանություն — կոտորած, ցրում, ողջ հայ ժողովրդի ողբ',
    color: 'var(--blue)',
  },
  {
    title: 'Ռաֆֆի — «Ջալալեդդին»',
    era: 'Ռեալիզմ, 19-րդ դ. երկրորդ կես',
    work: '«Ջալալեդդին», Ռաֆֆի (1878)',
    idea: 'Ազգային-ազատագրական պայքարի անհրաժեշտություն ու ֆեդայականի հերոսությունը',
    context: 'Ռուս-թուրքական 1877–78 թթ. պատերազմ — արևմտահայ ֆեդայականների հույս ու ողբ',
    color: 'var(--teal)',
  },
];

export default function Methodology() {
  const [builderEra, setBuilderEra] = useState('');
  const [builderWork, setBuilderWork] = useState('');
  const [builderIdea, setBuilderIdea] = useState('');
  const [builderContext, setBuilderContext] = useState('');

  const selectedEra = eras.find(e => e.id === builderEra);
  const availableWorks = authors.flatMap(a => a.works).filter(w =>
    !builderEra || w.relatedEraIds?.includes(builderEra)
  );
  const selectedWork = availableWorks.find(w => w.id === builderWork);
  const chainComplete = builderEra && builderWork && builderIdea && builderContext;

  return (
    <div>
      <SectionHeader
        number="03"
        title="Մեթոդաբանություն"
        subtitle="Վերլուծական շղթան, որին հետևում է յուրաքանչյուր բարձր գնահատական ստացած էսսե։"
        color="var(--blue-mid)"
      />

      {/* Step guide */}
      <section style={{ marginBottom: '56px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px' }}>
          Չորս քայլ
        </h2>
        <p style={{ color: 'var(--ink-muted)', marginBottom: '24px', fontStyle: 'italic', fontSize: '14px' }}>
          Սեղմիր ցանկացած քայլի վրա ստորև՝ ծանոթանալու համար։
        </p>
        <Diagram steps={steps} interactive={true} />

        <div style={{ display: 'grid', gap: '20px', marginTop: '32px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '22px 24px',
              boxShadow: 'var(--shadow)',
              borderLeft: `4px solid ${['var(--blue)', 'var(--gold)', 'var(--teal)', 'var(--blue-mid)'][i]}`,
            }}>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '2px',
                color: ['var(--blue)', 'var(--gold)', 'var(--teal)', 'var(--blue-mid)'][i],
                marginBottom: '6px',
                textTransform: 'uppercase',
              }}>
                ՔԱՅԼ {i + 1}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>
                {step.label}
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.75, marginBottom: '14px' }}>
                {step.detail}
              </p>
              <div style={{
                background: 'var(--bg-alt)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                color: 'var(--ink-light)',
                fontStyle: 'italic',
                lineHeight: 1.7,
                marginBottom: '12px',
              }}>
                <strong style={{ fontStyle: 'normal', color: 'var(--ink)' }}>Օրինակ՝ </strong>
                {step.example}
              </div>
              <div style={{
                display: 'flex', gap: '8px', alignItems: 'flex-start',
                fontSize: '14px',
                color: ['var(--blue)', 'var(--gold)', 'var(--teal)', 'var(--blue-mid)'][i],
              }}>
                <span>❓</span>
                <span style={{ fontStyle: 'italic' }}>{step.question}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Worked examples */}
      <section style={{ marginBottom: '56px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '20px' }}>
          Շղթայի օրինակներ
        </h2>
        <div style={{ display: 'grid', gap: '14px' }}>
          {chainExamples.map((ex, i) => (
            <Expandable key={i} label={ex.title} accent={ex.color}>
              <div style={{ display: 'grid', gap: '10px' }}>
                {[
                  { label: 'Դարաշրջան', value: ex.era },
                  { label: 'Գրական Գործ', value: ex.work },
                  { label: 'Հիմնական Գաղափար', value: ex.idea },
                  { label: 'Պատմական Համատեքստ', value: ex.context },
                ].map((row, j) => (
                  <div key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '11px', fontFamily: 'var(--font-body)',
                      letterSpacing: '1px',
                      background: ex.color + '18',
                      color: ex.color,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      flexShrink: 0, marginTop: '2px',
                    }}>
                      {row.label}
                    </span>
                    <span style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: 1.65 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Expandable>
          ))}
        </div>
      </section>

      {/* Interactive chain builder */}
      <section>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px' }}>
          Կառուցիր քո շղթան
        </h2>
        <p style={{ color: 'var(--ink-muted)', marginBottom: '24px', fontStyle: 'italic', fontSize: '14px' }}>
          Ինքդ կազմիր վերլուծական շղթա — ընտրիր դարաշրջան, գործ, գաղափար ու կոնտեքստ։
        </p>

        <div style={{
          background: 'var(--white)',
          border: '1.5px solid var(--border)',
          borderRadius: '14px',
          padding: '28px',
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{ display: 'grid', gap: '18px' }}>
            {/* Step 1 */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '8px', color: 'var(--blue)' }}>
                Քայլ 1 — Ընտրիր դարաշրջան
              </label>
              <select
                value={builderEra}
                onChange={e => { setBuilderEra(e.target.value); setBuilderWork(''); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: '15px', background: 'var(--bg)', color: 'var(--ink)' }}
              >
                <option value="">Ընտրիր դարաշրջան...</option>
                {eras.map(e => <option key={e.id} value={e.id}>{e.name} ({e.period})</option>)}
              </select>
              {selectedEra && <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '6px', fontStyle: 'italic' }}>{selectedEra.summary}</p>}
            </div>

            {/* Step 2 */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '8px', color: 'var(--gold)' }}>
                Քայլ 2 — Ընտրիր գրական գործ
              </label>
              <select
                value={builderWork}
                onChange={e => setBuilderWork(e.target.value)}
                disabled={!builderEra}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: '15px', background: builderEra ? 'var(--bg)' : 'var(--bg-alt)', color: 'var(--ink)', opacity: builderEra ? 1 : 0.5 }}
              >
                <option value="">Ընտրիր գործ...</option>
                {availableWorks.map(w => <option key={w.id} value={w.id}>{w.title} ({w.authorName})</option>)}
              </select>
              {selectedWork && <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '6px', fontStyle: 'italic' }}>{selectedWork.summary}</p>}
            </div>

            {/* Step 3 */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '8px', color: 'var(--teal)' }}>
                Քայլ 3 — Ձևակերպիր հիմնական գաղափարը
              </label>
              {selectedWork && (
                <div style={{ marginBottom: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedWork.keyIdeas.map((idea, i) => (
                    <button
                      key={i}
                      onClick={() => setBuilderIdea(idea)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${builderIdea === idea ? 'var(--teal)' : 'var(--border)'}`,
                        background: builderIdea === idea ? 'var(--teal-light)' : 'var(--white)',
                        color: builderIdea === idea ? 'var(--teal)' : 'var(--ink-light)',
                        fontSize: '13px', cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {idea}
                    </button>
                  ))}
                </div>
              )}
              <input
                type="text"
                placeholder="Կամ ձևակերպիր ինքդ..."
                value={builderIdea}
                onChange={e => setBuilderIdea(e.target.value)}
                disabled={!builderWork}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: '15px', background: builderWork ? 'var(--bg)' : 'var(--bg-alt)', color: 'var(--ink)', opacity: builderWork ? 1 : 0.5 }}
              />
            </div>

            {/* Step 4 */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '8px', color: 'var(--blue-mid)' }}>
                Քայլ 4 — Կապիր պատմական կոնտեքստի հետ
              </label>
              {selectedEra && (
                <div style={{ marginBottom: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedEra.keyFacts.slice(0, 3).map((fact, i) => (
                    <button
                      key={i}
                      onClick={() => setBuilderContext(fact)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${builderContext === fact ? 'var(--blue-mid)' : 'var(--border)'}`,
                        background: builderContext === fact ? 'var(--blue-light)' : 'var(--white)',
                        color: builderContext === fact ? 'var(--blue-mid)' : 'var(--ink-light)',
                        fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {fact}
                    </button>
                  ))}
                </div>
              )}
              <input
                type="text"
                placeholder="Կամ գրիր պատմական իրադարձություն..."
                value={builderContext}
                onChange={e => setBuilderContext(e.target.value)}
                disabled={!builderIdea}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: '15px', background: builderIdea ? 'var(--bg)' : 'var(--bg-alt)', color: 'var(--ink)', opacity: builderIdea ? 1 : 0.5 }}
              />
            </div>
          </div>

          {/* Result */}
          {chainComplete && (
            <div style={{
              marginTop: '24px',
              background: 'var(--blue)',
              color: 'var(--white)',
              borderRadius: '12px',
              padding: '22px 24px',
            }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', color: 'var(--gold-light)', marginBottom: '14px', textTransform: 'uppercase' }}>
                Քո վերլուծական շղթան
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                {[
                  { label: 'Դարաշրջան', value: selectedEra?.name },
                  '→',
                  { label: 'Գործ', value: selectedWork?.title },
                  '→',
                  { label: 'Գաղափար', value: builderIdea },
                  '→',
                  { label: 'Կոնտեքստ', value: builderContext },
                ].map((item, i) =>
                  item === '→' ? (
                    <span key={i} style={{ color: 'var(--gold)', fontSize: '20px' }}>→</span>
                  ) : (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px' }}>
                      <div style={{ fontSize: '10px', fontFamily: 'var(--font-body)', letterSpacing: '2px', color: 'rgba(255,255,255,0.45)', marginBottom: '4px', textTransform: 'uppercase' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--white)', lineHeight: 1.4 }}>{item.value}</div>
                    </div>
                  )
                )}
              </div>
              <p style={{ marginTop: '14px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                Սա քո էսսեի հիմնաշղթան է։ Ընդլայնիր յուրաքանչյուր կետը պարբերության։
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}