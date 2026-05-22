import { motion } from 'motion/react'
import { useState } from 'react'
import { grafikKasusKPK } from '../../data/statistikKPK'

export default function BarChart() {
  const [hoveredBar, setHoveredBar] = useState(null)

  // Find max value for scaling
  const maxCases = Math.max(...grafikKasusKPK.map(d => d.kasus))

  return (
    <div style={{ width: '100%', margin: '40px 0' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
        Tren Penanganan Kasus KPK (2004–2023)
      </h4>
      
      {/* Scrollable container for mobile responsiveness */}
      <div style={{ overflowX: 'auto', paddingBottom: '16px' }}>
        <div
          style={{
            minWidth: '600px',
            height: '320px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            borderBottom: '2px solid var(--color-border)',
            padding: '20px 20px 0 20px',
            position: 'relative'
          }}
        >
          {/* Y-Axis Guidelines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const val = Math.round(maxCases * ratio)
            const bottomPos = `${ratio * 100}%`
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: bottomPos,
                  borderBottom: i === 0 ? 'none' : '1px dashed var(--color-border)',
                  opacity: i === 0 ? 0 : 0.5,
                  pointerEvents: 'none'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '-35px',
                    bottom: '-8px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-muted)'
                  }}
                >
                  {val}
                </span>
              </div>
            );
          })}

          {/* Bar Items */}
          {grafikKasusKPK.map((item, idx) => {
            const heightPercent = (item.kasus / maxCases) * 100
            const isHovered = hoveredBar === idx

            return (
              <div
                key={item.tahun}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '0 4px',
                  position: 'relative',
                  height: '100%',
                  justifyContent: 'flex-end'
                }}
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    style={{
                      position: 'absolute',
                      bottom: `calc(${heightPercent}% + 10px)`,
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-background)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      zIndex: 10,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {item.kasus} Kasus
                  </motion.div>
                )}

                {/* Animated Bar */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.03,
                    duration: 0.8,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    backgroundColor: isHovered ? 'var(--color-accent)' : 'var(--color-primary)',
                    borderRadius: '4px 4px 0 0',
                    transformOrigin: 'bottom',
                    cursor: 'pointer',
                    boxShadow: isHovered ? '0 0 10px rgba(0,0,0,0.15)' : 'none',
                    transition: 'background-color 0.2s'
                  }}
                />

                {/* Label (Year) */}
                <span
                  style={{
                    marginTop: '8px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: isHovered ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontWeight: isHovered ? '700' : '400',
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'top center',
                    whiteSpace: 'nowrap',
                    position: 'absolute',
                    top: '100%'
                  }}
                >
                  {item.tahun}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ height: '35px' }} /> {/* Spacer for rotated labels */}
    </div>
  )
}
