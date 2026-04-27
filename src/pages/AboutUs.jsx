import React from 'react';
import SectionHeader from '../components/SectionHeader';

// 1. ՏՎՅԱԼՆԵՐ
const teamDescription = {
  heading: "Մեր Թիմը",
  subheading: "Գլոբալ Բրիջ կրթահամալիրի աշակերտների նախագծային խումբը",
  paragraph: "Մենք «Գլոբալ Բրիջ» կրթահամալիրի աշակերտներ ենք և այս հարթակը ստեղծել ենք մեր նախագծային աշխատանքի շրջանակներում։ Նախագծի հիմնական նպատակն է ստեղծել գործնական և հասանելի ուղեցույց բոլոր այն աշակերտների համար, ովքեր պատրաստվում են պետական ավարտական և միասնական քննություններին։Քանի որ կրթական համակարգում վերջերս ներդրվեց էսսեի նոր ձևաչափը, շատ աշակերտներ բախվեցին տեղեկատվության պակասի և կառուցվածքային անորոշության խնդրին։ Մենք որոշեցինք ստեղծել միասնական թվային բազա, որտեղ տեսական գիտելիքները համադրվում են իրական օրինակների հետ։ Այստեղ դուք կգտնեք ոչ միայն էսսեի գրման մեթոդաբանությունը, այլև թեմաների լայն ընտրանի թե՛ գրականությունից, թե՛ պատմությունից։Մեր թիմը հավատում է, որ այս նախագիծը կօգնի մեր հասակակիցներին հասնել բարձր արդյունքների և զարգացնել վերլուծական ու քննադատական մտածողությունը, ինչն այսօր էական նշանակություն ունի յուրաքանչյուր աշակերտի համար։",
};

// ԱՌԱՆՁԻՆ ՂԵԿԱՎԱՐԻ ՏՎՅԱԼՆԵՐԸ
const projectLeader = {
  name: "Նինա Վարդանյան",
  role: "Նախագծի Ղեկավար",
  bio: "Պատասխանատու է նախագծի ռազմավարական պլանավորման, թիմի համակարգման և վերջնաժամկետների պահպանման համար։ Ապահովում է կատարյալ կապ հաճախորդի և թիմի միջև։",
  image: "/images/icon.png", 
  color: "#1e293b", // Ավելի մուգ շեշտադրում
};

const teamMembers = [
  {
    name: "Անի Մամիկոնյան",
    role: "Տեխնիկական տնօրեն",
    bio: "Զբաղվում է կայքի ստեղծմամբ, ծրագրավորմամբ և հետևում է, որ ամեն ինչ աշխատի արագ ու անսխալ:",
    image: "/images/ani1111.jpg",
    color: "#3B82F6",
  },
  {
    name: "Մարիա Մանուկյան",
    role: "Գլխավոր Դիզայներ",
    bio: "Ստեղծում է ժամանակակից և հարմարավետ դիզայններ բոլորի համար։",
    image: "/images/icon.png",
    color: "#14B8A6",
  },
  {
    name: "Լուսինե Հարությունյան",
    role: "Ավագ Ծրագրավորող",
    bio: "Պատասխանատու է տեխնիկական բարդ լուծումների համար։",
    image: "/images/icon.png",
    color: "#F59E0B",
  },
  {
    name: "Վիգեն Դեր Արթինյան",
    role: "Մարքեթինգի Մասնագետ",
    bio: "Օգնում է բրենդներին գտնել իրենց ճիշտ լսարանը։",
    image: "/images/vigenn2.jpg",
    color: "#6366F1",
  },
];

// 2. ՕԺԱՆԴԱԿ ԿՈՄՊՈՆԵՆՏՆԵՐ
function Avatar({ src, color, size = 90 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      border: `3px solid ${color}`,
      overflow: 'hidden',
      flexShrink: 0,
      background: '#eee'
    }}>
      <img 
        src={src} 
        alt="member" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
      />
    </div>
  );
}

// 3. ՀԻՄՆԱԿԱՆ ԿՈՄՊՈՆԵՆՏ
export default function AboutUs() {
    return (
      <div style={{ 
        padding: '40px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        fontFamily: 'sans-serif' 
      }}>
        
        {/* Փոխարինված նոր SectionHeader-ով */}
        <SectionHeader
          title={teamDescription.heading}
          subtitle={teamDescription.subheading}
          color="var(--blue)"
        />
  
        {/* Նկարագրություն */}
        <div style={{
          background: '#f9fafb',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '5px solid var(--blue)',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          {teamDescription.paragraph}
        </div>
  
        {/* Այստեղ կշարունակվի թիմի անդամների Grid-ը... */}


      {/* Ցանց (Grid) */}
      <div style={{
        display: 'grid',
        // Այս հատկությունը թույլ է տալիս ունենալ 2 սյունակ
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
        gap: '24px',
      }}>
        
        {/* --- ՂԵԿԱՎԱՐԻ ՔԱՐՏԸ (Լայն տարբերակ) --- */}
        <div style={{
          gridColumn: '1 / -1', // Սա ստիպում է զբաղեցնել ամբողջ լայնությունը
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', // Մի փոքր ավելի ուժեղ ստվեր
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px',
            backgroundColor: projectLeader.color
          }} />

          <Avatar src={projectLeader.image} color={projectLeader.color} size={100} />

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ margin: '0', fontSize: '22px', color: '#111' }}>
                    {projectLeader.name}
                </h3>
                <span style={{ 
                    fontSize: '10px', background: '#f1f5f9', padding: '2px 8px', 
                    borderRadius: '10px', color: '#64748b', fontWeight: 'bold' 
                }}>ՂԵԿԱՎԱՐ</span>
            </div>
            <div style={{ 
              color: projectLeader.color, 
              fontSize: '13px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase',
              margin: '4px 0 10px 0'
            }}>
              {projectLeader.role}
            </div>
            <p style={{ fontSize: '15px', color: '#4b5563', margin: 0, lineHeight: '1.6', maxWidth: '800px' }}>
              {projectLeader.bio}
            </p>
          </div>
        </div>

        {/* --- ԹԻՄԻ ՄՅՈՒՍ ԱՆԴԱՄՆԵՐԸ --- */}
        {teamMembers.map((member, i) => (
          <div key={i} style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px',
              backgroundColor: member.color
            }} />

            <Avatar src={member.image} color={member.color} />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '18px', color: '#111' }}>
                {member.name}
              </h3>
              <div style={{ 
                color: member.color, 
                fontSize: '12px', 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                {member.role}
              </div>
              <p style={{ fontSize: '14px', color: '#4b5563', margin: 0, lineHeight: '1.5' }}>
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}