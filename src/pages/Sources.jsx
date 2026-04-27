// ─────────────────────────────────────────────────────────────
//  SOURCES PAGE
//  Edit the two arrays below to add your textbook links.
//
//  Each source object:
//    grade:     number   — 7, 8, or 9
//    title:     string   — full book title
//    author:    string   — author(s)
//    publisher: string   — publisher name / year
//    url:       string   — link to PDF, site, or resource
//                          set to "" if no link yet
//
//  To add a source: copy an existing object, paste below it,
//  fill in the fields. Grade grouping is automatic.
// ─────────────────────────────────────────────────────────────

const literatureSources = [
    // Grade 7
    { grade: 7, title: "Գրականություն 7", author: "Ա. Նիկողոսյան, Ա. Վարդանյան", publisher: "", url: "https://lib.armedu.am/files/resource/files/2024-02-07/4128d163eb220dc8d2a465d8a9deb8cb.pdf" },

  
    // Grade 8
    { grade: 8, title: "Գրականություն 8", author: "Ա. Նիկողոսյան, Ա. Վարդանյան", publisher: "", url: "https://lib.armedu.am/files/resource/files/2024-09-02/0f9a3871d6eb1583bc1b97cefe84de3a.pdf" },
  
    // Grade 9
    { grade: 9, title: "Գրականություն 9", author: "Ա. Նիկողոսյան, Ա. Վարդանյան", publisher: "", url: "https://lib.armedu.am/files/resource/files/2025-05-26/e93533058d7608bc673ef68b4c7dd3f5.pdf" },
  ];
  
  const historySources = [
    // Grade 7
    { grade: 7, title: "Հայոց պատմություն 7", author: "Ս․ Հովհաննիսյան", publisher: "", url: "https://lib.armedu.am/files/resource/files/2024-08-29/fe6a45df20e78c54ca2cfd25bdd937cc.pdf" },
  
    // Grade 8
    { grade: 8, title: "Հայոց պատմություն 8", author: "Ս.Հովհաննիսյան, Ա.Խառատյան, Զ.Հակոբյան", publisher: "", url: "https://lib.armedu.am/files/resource/files/2024-08-29/d62aa061cec2053867b25b636abe0186.pdf" },
  
    // Grade 9
    { grade: 9, title: "Հայոց պատմություն 9", author: "Գ.Կեսոյան, Վ.Հակոբյան, Ն.Հովսեփյան, Հ.Վարդանյան, Ա.Խառատյան, Տ.Համբարձումյան, Ա.Թադեւոսյան", publisher: "", url: "https://lib.armedu.am/files/resource/files/2025-08-06/69ddf5a4f0f4c9e14ce9b7a6549dd0d4.pdf" },
  ];
  
  // ─────────────────────────────────────────────────────────────
  //  SECTION LABELS
  //  Edit these to change section headings
  // ─────────────────────────────────────────────────────────────
  const sectionLabels = {
    literature: {
      heading: "Գրականություն",          // e.g. "Գրականություն"
      subheading: "",       // e.g. "Literature"
      color: "var(--blue)",
      icon: "",
    },
    history: {
      heading: "Հայոց պատմություն",          // e.g. "Պատմություն"
      subheading: "",       // e.g. "History"
      color: "var(--green)",
      icon: "",
    },
  };
  
  const gradeLabels = {
    7: "",    // e.g. "7-րդ Դasаrаn"
    8: "",    // e.g. "8-рд Даsаrаn"
    9: "",    // e.g. "9-рд Даsаrаn"
  };
  
  // ─────────────────────────────────────────────────────────────
  //  LAYOUT — do not edit below unless changing structure
  // ─────────────────────────────────────────────────────────────
  
  const GRADES = [7, 8, 9];
  
  function groupByGrade(sources) {
    return GRADES.reduce((acc, g) => {
      acc[g] = sources.filter(s => s.grade === g);
      return acc;
    }, {});
  }
  
  function SourceRow({ source, accent }) {
    const hasLink = source.url && source.url.trim() !== '';
    return (
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '14px 0',
        borderBottom: '1px solid var(--border-light)',
      }}>
        {/* Book icon + info */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: 0 }}>
          <div style={{
            width: '36px', height: '36px',
            background: accent + '15',
            border: `1.5px solid ${accent}33`,
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', flexShrink: 0,
          }}>
            📖
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '15px', fontWeight: 700,
              color: 'var(--ink)', lineHeight: 1.35,
              marginBottom: source.author ? '4px' : 0,
            }}>
              {source.title}
            </div>
            {source.author && (
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px', color: 'var(--ink-muted)',
                lineHeight: 1.4,
              }}>
                {source.author}
                {source.publisher ? ` · ${source.publisher}` : ''}
              </div>
            )}
          </div>
        </div>
  
        {/* Link button */}
        {hasLink ? (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px',
              background: accent,
              color: '#fff',
              borderRadius: '7px',
              fontSize: '13px', fontWeight: 600,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'opacity 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Բացել ↗
          </a>
        ) : (
          <div style={{
            padding: '7px 14px',
            background: 'var(--bg-alt)',
            color: 'var(--ink-muted)',
            borderRadius: '7px',
            fontSize: '12px',
            fontFamily: 'var(--font-body)',
            flexShrink: 0,
            border: '1px solid var(--border)',
            whiteSpace: 'nowrap',
          }}>
            Շուտով
          </div>
        )}
      </div>
    );
  }
  
  function GradeGroup({ grade, sources, accent }) {
    if (!sources || sources.length === 0) return null;
    return (
      <div style={{ marginBottom: '10px' }}>
        {/* Grade pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          gap: '6px',
          padding: '5px 14px',
          background: accent + '12',
          border: `1.5px solid ${accent}33`,
          borderRadius: '20px',
          marginBottom: '2px',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: accent,
          }}>
            {gradeLabels[grade] || `Դասարան ${grade}`}
          </span>
        </div>
  
        {/* Source rows */}
        <div>
          {sources.map((source, i) => (
            <SourceRow key={i} source={source} accent={accent} />
          ))}
        </div>
      </div>
    );
  }
  
  function SourceSection({ label, sources, sectionKey }) {
    const grouped = groupByGrade(sources);
    const hasAnySources = sources.some(s => s.title !== '');
  
    return (
      <div style={{
        background: 'var(--white)',
        border: `1.5px solid var(--border)`,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
      }}>
        {/* Section header */}
        <div style={{
          background: label.color,
          padding: '22px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}>
          <span style={{ fontSize: '26px' }}>{label.icon}</span>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px', fontWeight: 700,
              color: '#fff', margin: 0, lineHeight: 1.2,
            }}>
              {label.heading}
            </h2>
            {label.subheading && (
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px', color: 'rgba(255,255,255,0.6)',
                marginTop: '3px', letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                {label.subheading}
              </div>
            )}
          </div>
          {/* Count badge */}
          <div style={{
            marginLeft: 'auto',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '20px',
            padding: '4px 12px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#fff',
            fontWeight: 600,
          }}>
            {sources.length}
          </div>
        </div>
  
        {/* Grade groups */}
        <div style={{ padding: '8px 28px 20px' }}>
          {GRADES.map(g => (
            <GradeGroup
              key={g}
              grade={g}
              sources={grouped[g]}
              accent={label.color}
            />
          ))}
          {!hasAnySources && (
            <div style={{
              padding: '32px 0', textAlign: 'center',
              color: 'var(--ink-muted)', fontStyle: 'italic',
              fontSize: '14px', fontFamily: 'var(--font-body)',
            }}>
              —
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default function Sources() {
    return (
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* --- PAGE HEADER --- */}
        <div style={{ marginBottom: '52px' }}>
  
          {/* Գլխավոր վերնագիրը */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 700, 
            color: 'var(--ink)',
            letterSpacing: '-0.5px', 
            marginBottom: '12px',
            lineHeight: 1.2,
          }}>
            Աղբյուրներ
          </h1>
  
          {/* Ենթավերնագիրը (Subtitle) */}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px', 
            fontStyle: 'italic',
            color: 'var(--ink-muted)', 
            margin: '8px 0 0',
            lineHeight: 1.6,
            maxWidth: '700px'
          }}>
            Աղբյուրները և կայքերը, որոնք օգնել են մեզ հավաքել անհրաժեշտ տեղեկությունը։
          </p>
  
          {/* Գունավոր գիծը */}
          <div style={{
            width: '52px', 
            height: '3px',
            background: 'var(--blue-mid)', // Ճիշտ նույն գույնը, ինչ երկրորդ կոդում
            borderRadius: '2px', 
            marginTop: '20px',
          }} />
        </div>
  
        {/* Այստեղ կավելացնես քո աղբյուրների ցուցակը կամ այլ բովանդակություն */}


  
        {/* Two section columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          <SourceSection
            label={sectionLabels.literature}
            sources={literatureSources}
            sectionKey="literature"
          />
          <SourceSection
            label={sectionLabels.history}
            sources={historySources}
            sectionKey="history"
          />
        </div>
      </div>
    );
  }
  