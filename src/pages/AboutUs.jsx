import React from 'react';
import SectionHeader from '../components/SectionHeader';

// Team Description
const teamDescription = {
  heading: "Մեր Թիմը",
  subheading: "Գլոբալ Բրիջ կրթահամալիրի աշակերտների նախագծային խումբը",
  paragraph:
    "Մենք «Գլոբալ Բրիջ» կրթահամալիրի աշակերտներ ենք և այս հարթակը ստեղծել ենք մեր նախագծային աշխատանքի շրջանակներում։ Նախագծի հիմնական նպատակն է ստեղծել գործնական և հասանելի ուղեցույց բոլոր այն աշակերտների համար, ովքեր պատրաստվում են պետական ավարտական և միասնական քննություններին։ Քանի որ կրթական համակարգում վերջերս ներդրվեց էսսեի նոր ձևաչափը, շատ աշակերտներ բախվեցին տեղեկատվության պակասի և կառուցվածքային անորոշության խնդրին։ Մենք որոշեցինք ստեղծել միասնական թվային բազա, որտեղ տեսական գիտելիքները համադրվում են իրական օրինակների հետ։ Այստեղ դուք կգտնեք ոչ միայն էսսեի գրման մեթոդաբանությունը, այլև թեմաների լայն ընտրանի թե՛ գրականությունից, թե՛ պատմությունից։ Մեր թիմը հավատում է, որ այս նախագիծը կօգնի մեր հասակակիցներին հասնել բարձր արդյունքների և զարգացնել վերլուծական ու քննադատական մտածողությունը։",
};

// Project Leader
const projectLeader = {
  name: "Նինա Վարդանյան",
  role: "Նախագծի Ղեկավար",
  bio: "Պատասխանատու է նախագծի ռազմավարական պլանավորման, թիմի համակարգման և վերջնաժամկետների պահպանման համար։ Ապահովում է կապ թիմի բոլոր անդամների միջև։",
  image: "/images/icon.png",
  color: "#1e293b",
};

// Team Members
const teamMembers = [
  {
    name: "Անի Մամիկոնյան",
    role: "Տեխնիկական տնօրեն",
    bio: "Զբաղվում է կայքի ստեղծմամբ, ծրագրավորմամբ և հետևում է, որ ամեն ինչ աշխատի արագ ու անսխալ։",
    image: "/images/ani1111.jpg",
    color: "#3B82F6",
  },
  {
    name: "Մարիա Մանուկյան",
    role: "Գլխավոր Դիզայներ",
    bio: "Ստեղծում է ժամանակակից և հարմարավետ դիզայններ բոլոր օգտատերերի համար։",
    image: "/images/maria1.png",
    color: "#14B8A6",
  },
  {
    name: "Լուսինե Հարությունյան",
    role: "Ավագ Ծրագրավորող",
    bio: "Պատասխանատու է տեխնիկական բարդ լուծումների և կայքի կայուն աշխատանքի համար։",
    image: "/images/icon.png",
    color: "#F59E0B",
  },
  {
    name: "Վիգեն Դեր Արթինյան",
    role: "Մարքեթինգի Մասնագետ",
    bio: "Օգնում է նախագծին հասնել ճիշտ լսարանին և զարգացնել բրենդի ներկայությունը։",
    image: "/images/vigenn2.jpg",
    color: "#6366F1",
  },
];

// Avatar Component
function Avatar({ src, color, size = 90 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        overflow: 'hidden',
        flexShrink: 0,
        background: '#eee',
      }}
    >
      <img
        src={src}
        alt="member"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
    </div>
  );
}

// Main Component
export default function AboutUs() {
  return (
    <div
      style={{
        padding: 'clamp(20px, 4vw, 40px)',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Header */}
      <SectionHeader
        title={teamDescription.heading}
        subtitle={teamDescription.subheading}
        color="var(--blue)"
      />

      {/* Description */}
      <div
        style={{
          background: '#f9fafb',
          padding: '24px',
          borderRadius: '16px',
          borderLeft: '5px solid var(--blue)',
          marginBottom: '40px',
          lineHeight: '1.8',
          color: '#374151',
          fontSize: '15px',
        }}
      >
        {teamDescription.paragraph}
      </div>

      {/* Team Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Leader Card */}
        <div
          style={{
            gridColumn: '1 / -1',
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '8px',
              backgroundColor: projectLeader.color,
            }}
          />

          <Avatar
            src={projectLeader.image}
            color={projectLeader.color}
            size={100}
          />

          <div style={{ flex: 1, minWidth: '250px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px' }}>
              {projectLeader.name}
            </h3>

            <div
              style={{
                color: projectLeader.color,
                fontSize: '13px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              {projectLeader.role}
            </div>

            <p
              style={{
                fontSize: '15px',
                color: '#4b5563',
                margin: 0,
                lineHeight: '1.6',
              }}
            >
              {projectLeader.bio}
            </p>
          </div>
        </div>

        {/* Team Members */}
        {teamMembers.map((member, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '18px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '6px',
                backgroundColor: member.color,
              }}
            />

            <Avatar src={member.image} color={member.color} />

            <div style={{ flex: 1, minWidth: '220px' }}>
              <h3
                style={{
                  margin: '0 0 6px',
                  fontSize: '18px',
                  color: '#111827',
                }}
              >
                {member.name}
              </h3>

              <div
                style={{
                  color: member.color,
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                {member.role}
              </div>

              <p
                style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  margin: 0,
                  lineHeight: '1.5',
                }}
              >
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}