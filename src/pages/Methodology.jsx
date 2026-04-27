import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import Diagram from '../components/Diagram';
import Expandable from '../components/Expandable';

export default function Methodology() {
  const stepColors = ['var(--blue)', 'var(--gold)', 'var(--teal)', 'var(--blue-mid)'];

  const stepsData = [
    {
      label: 'Դարաշրջան',
      detail: 'Որոշի՛ր, թե պատմական որ ժամանակաշրջանին է պատկանում գործը։ Ի՞նչ էր կատարվում աշխարհում, ի՞նչ միջավայրում էր ապրում հեղինակը։',
      example: 'Ռոմանտիզմ՝ 19-րդ դար՝ ազգային ազատագրական շարժումների, ժողովրդական ոգու և լեզվի վերածննդի ժամանակ։',
      question: 'Ինչ էր կատարվում աշխարհում, երբ գործն ստեղծվեց? Ի՞նչից էին վախենում, ինչ էին ուզում?',
    },
    {
      label: 'Գրական գործ',
      detail: 'Նշի՛ր հեղինակին և հստակ ստեղծագործությունը։ Ի՞նչ ժանրի ստեղծագործություն է այն, ե՞րբ և ինչի՞ համար է գրվել։',
      example: 'Խաչատուր Աբովյան, «Վերք Հայաստանի», 1841 թ., առաջին հայ վեպը՝ գրված աշխարհաբար։',
      question: 'Ո՞ր ժանրի է գործը: Ո՞վ, ե՞րբ ու ի՞նչ նպատակով է գրել: Ո՞ւ համար:',
    },
    {
      label: 'Հիմնական գաղափար',
      detail: 'Ո՞ր կենտրոնական գաղափարն ես ուզում վերլուծել։ Միտքդ հստակ ձևակերպի՛ր։ Ոչ թե «ազատություն», այլ «ազատության կարոտն ու ազգային ինքնությունը»։',
      example: 'Ազգային ինքնությունն ու ժողովրդի զարթոնքը ռուսական տիրապետության ժամանակ։',
      question: 'Կարո՞ղ ես արտահայտել մեկ նախադասությամբ, որի հետ կարելի է համաձայն չլինել:',
    },
    {
      label: 'Պատմական համատեքստ',
      detail: 'Գաղաթարի և պատմական իրադարձության կապ ստեղծիր։ Հենց սա է տարբերում վերլուծությունը վերապատմումից։',
      example: 'Ռուսական կայսրության և Պարսկաստանի տիրապետության ներքո հայ ժողովուրդը պայքարում էր հանուն ինքնության պահպանման՝ դեմ գնալով բոլոր ճնշումներին և չկորցնելով պայծառ ապագայի հույսը։',
      question: 'Ո՞ր իրական իրադարձությունն է կապ ունի գաղափարի հետ: Ո՞րն է պատմական ֆոնն ու ճնշումը?',
    },
  ];

  return (
    <div>
      <SectionHeader
        number="03"
        title="Մեթոդաբանություն"
        subtitle="Վերլուծական շղթան, որին հետևում է յուրաքանչյուր բարձր գնահատական ստացած էսսե։"
        color="var(--blue-mid)"
      />

      <section style={{ marginBottom: '56px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px' }}>
          Վերլուծության չորս քայլերը
        </h2>
        <p style={{ color: 'var(--ink-muted)', marginBottom: '24px', fontStyle: 'italic', fontSize: '14px' }}>
          Յուրաքանչյուր քայլ կառուցում է քո էսսեի տրամաբանական հիմքը։
        </p>
        
        <Diagram steps={stepsData} interactive={true} />

        <div style={{ display: 'grid', gap: '20px', marginTop: '32px' }}>
          {stepsData.map((step, i) => (
            <div key={i} style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '22px 24px',
              boxShadow: 'var(--shadow)',
              borderLeft: `4px solid ${stepColors[i]}`,
            }}>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '2px',
                color: stepColors[i],
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
                color: stepColors[i],
              }}>
                <span>❓</span>
                <span style={{ fontStyle: 'italic' }}>{step.question}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '56px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '20px' }}>
          Շղթայի օրինակներ
        </h2>
        <div style={{ display: 'grid', gap: '14px' }}>
          {[
            {
              title: 'Խաչատուր Աբովյան — «Վերք Հայաստանի»',
              values: ['Ռոմանտիզմ, 19-րդ դար', '«Վերք Հայաստանի», 1841 թ.', 'Ազգային ինքնությունն ու ժողովրդի զարթոնքը', 'Պայքար Ռուսական և Պարսկական տիրապետության ներքո'],
              color: 'var(--gold)',
            },
            {
              title: 'Եղիշե Չարենց — «Ես իմ անուշ Հայաստանի»',
              values: ['20-րդ դ., հետցեղասպանական շրջան', '«Ես իմ անուշ Հայաստանի», 1920 թ.', 'Հավաքական հայրենիքի և լեզվի պաշտամունքը', 'Ցեղասպանությունից հետո ազգային արժեքների վերաիմաստավորում'],
              color: 'var(--blue)',
            }
          ].map((ex, i) => (
            <Expandable key={i} label={ex.title} accent={ex.color}>
              <div style={{ display: 'grid', gap: '10px' }}>
                {['Դարաշրջան', 'Գրական գործ', 'Հիմնական գաղափար', 'Պատմական համատեքստ'].map((label, j) => (
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
                      {label}
                    </span>
                    <span style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: 1.65 }}>{ex.values[j]}</span>
                  </div>
                ))}
              </div>
            </Expandable>
          ))}
        </div>
      </section>
    </div>
  );
}