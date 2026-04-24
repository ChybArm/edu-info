import { useState } from 'react';

export default function Diagram({ steps, interactive = false }) {
  const [activeStep, setActiveStep] = useState(null);
  const colors = ['var(--blue)', 'var(--gold)', 'var(--teal)', 'var(--blue-mid)'];

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: activeStep !== null ? '20px' : 0,
      }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              onClick={() => interactive && setActiveStep(activeStep === i ? null : i)}
              style={{
                background: activeStep === i ? colors[i % colors.length] : 'var(--white)',
                border: `2px solid ${colors[i % colors.length]}`,
                borderRadius: '8px',
                padding: '10px 18px',
                cursor: interactive ? 'pointer' : 'default',
                transition: 'all 0.2s',
                textAlign: 'center',
                minWidth: '120px',
                boxShadow: activeStep === i ? '0 4px 14px rgba(26,58,107,0.2)' : 'none',
              }}
            >
              <div style={{
                fontSize: '10px',
                fontFamily: 'var(--font-body)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: activeStep === i ? 'rgba(255,255,255,0.75)' : colors[i % colors.length],
                marginBottom: '4px',
              }}>
                Քայլ {i + 1}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '15px',
                fontWeight: 700,
                color: activeStep === i ? 'var(--white)' : 'var(--ink)',
              }}>
                {step.label}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ fontSize: '20px', color: 'var(--ink-muted)', fontWeight: 300 }}>→</div>
            )}
          </div>
        ))}
      </div>

      {interactive && activeStep !== null && steps[activeStep] && (
        <div style={{
          background: colors[activeStep % colors.length] + '0f',
          border: `1.5px solid ${colors[activeStep % colors.length]}44`,
          borderRadius: '10px',
          padding: '18px 22px',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 700,
            marginBottom: '8px',
            color: colors[activeStep % colors.length],
          }}>
            {steps[activeStep].label}
          </div>
          <p style={{ fontSize: '14.5px', color: 'var(--ink-light)', lineHeight: 1.75, margin: 0 }}>
            {steps[activeStep].detail}
          </p>
          {steps[activeStep].example && (
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              background: 'var(--white)',
              borderRadius: '6px',
              fontSize: '14px',
              fontStyle: 'italic',
              color: 'var(--ink-light)',
              borderLeft: `3px solid ${colors[activeStep % colors.length]}`,
            }}>
              <strong style={{ fontStyle: 'normal', color: 'var(--ink)' }}>Օրինակ՝ </strong>
              {steps[activeStep].example}
            </div>
          )}
        </div>
      )}
    </div>
  );
}