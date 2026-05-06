import { essays } from '../data/essays'
import { criteria } from '../data/grading'
<ScoreBar
  key={sub.id}
  value={essay.scores?.[sub.id] || 0}
  max={sub.maxPoints}
  color="var(--teal)"
/>

const totalPoints = criteria.reduce(
  (sum, c) => sum + c.maxPoints,
  0
)

function EssayExamples() {
  const essay = essays?.[0]

  if (!essay) {
    return <div>No essay data found</div>
  }

  const totalScore = Object.values(
    essay.scores || {}
  ).reduce((a, b) => a + b, 0)

  const isMobile = window.innerWidth < 768

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
      <div>
        <h2>{essay.title}</h2>

        <p>
          Հարց. "{essay.prompt}"
        </p>

        <div>
          {essay.body}
        </div>
      </div>

      <div>
        <h2>
          {totalScore}/{totalPoints}
        </h2>

        {criteria.map((c) => (
          <div key={c.id}>
            <h4>{c.name}</h4>

            {c.subCriteria.map((sub) => (
              <ScoreBar
                key={sub.id}
                value={
                  essay.scores?.[sub.id] || 0
                }
                max={sub.maxPoints}
                color="var(--teal)"
              />
            ))}
          </div>
        ))}

        <p>{essay.feedback}</p>
      </div>
    </div>
  )
}

export default EssayExamples