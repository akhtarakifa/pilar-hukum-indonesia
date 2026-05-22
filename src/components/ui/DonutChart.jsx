import { motion } from 'motion/react'
import { useState } from 'react'

export default function DonutChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const data = [
    { label: 'Ditolak', value: 40, color: '#721818' },
    { label: 'Dikabulkan', value: 30, color: '#a23939' },
    { label: 'Tidak Diterima', value: 25, color: '#e1d9ce' },
    { label: 'Gugur/Tarik', value: 5, color: '#2d2524' }
  ]

  // SVG parameters
  const radius = 70
  const circumference = 2 * Math.PI * radius
  
  // Calculate stroke offsets
  let accumulatedPercent = 0

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '30px 0',
        width: '100%'
      }}
    >
      <h4 style={{ textAlign: 'center', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
        Statistik Putusan MK sejak 2003
      </h4>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        {/* Animated Donut SVG */}
        <div style={{ position: 'relative', width: '180px', height: '180px' }}>
          <svg width="100%" height="100%" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="var(--color-surface-alt)"
              strokeWidth="20"
            />
            {data.map((item, idx) => {
              const strokeLength = (item.value / 100) * circumference
              const strokeOffset = circumference - strokeLength - (accumulatedPercent / 100) * circumference
              accumulatedPercent += item.value

              const isHovered = hoveredIndex === idx

              return (
                <motion.circle
                  key={idx}
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? 26 : 20}
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: strokeOffset }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.2
                  }}
                  style={{
                    cursor: 'pointer',
                    transition: 'stroke-width 0.3s ease'
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              )
            })}
          </svg>
          {/* Centered label */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--color-primary)'
              }}
            >
              {hoveredIndex !== null ? `${data[hoveredIndex].value}%` : '100%'}
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {hoveredIndex !== null ? data[hoveredIndex].label : 'Perkara'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.map((item, idx) => {
            const isHovered = hoveredIndex === idx
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: isHovered ? 'var(--color-surface-alt)' : 'transparent',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: item.color,
                    borderRadius: '50%'
                  }}
                />
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: isHovered ? '700' : '400',
                    color: 'var(--color-text)'
                  }}
                >
                  {item.label}:
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: 'var(--color-primary)'
                  }}
                >
                  {item.value}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
