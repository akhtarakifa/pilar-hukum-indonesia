import { motion } from 'motion/react'
import { useState } from 'react'

export default function LineChart() {
  const [activePoint, setActivePoint] = useState(null)

  const cpiData = [
    { tahun: 1995, skor: 19, label: 'Korupsi sangat parah di akhir Orba' },
    { tahun: 1998, skor: 20, label: 'Krisis Moneter & Kejatuhan Soeharto' },
    { tahun: 2003, skor: 19, label: 'KPK Didirikan' },
    { tahun: 2008, skor: 26, label: 'KPK mulai tangkap koruptor kakap' },
    { tahun: 2013, skor: 32, label: 'Kasus Hambalang & Akil Mochtar' },
    { tahun: 2019, skor: 40, label: 'Skor Tertinggi Sejarah Indonesia' },
    { tahun: 2023, skor: 34, label: 'Kemunduran pasca revisi UU KPK' }
  ]

  // Graph layout dimensions
  const width = 600
  const height = 240
  const paddingX = 40
  const paddingY = 40

  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2

  // Map values to coordinates
  const minYear = Math.min(...cpiData.map(d => d.tahun))
  const maxYear = Math.max(...cpiData.map(d => d.tahun))
  const minSkor = 0
  const maxSkor = 50

  const getX = (year) => {
    const ratio = (year - minYear) / (maxYear - minYear)
    return paddingX + ratio * chartWidth
  }

  const getY = (skor) => {
    const ratio = (skor - minSkor) / (maxSkor - minSkor)
    return height - paddingY - ratio * chartHeight
  }

  // Build SVG Path
  const points = cpiData.map(d => ({
    x: getX(d.tahun),
    y: getY(d.skor),
    ...d
  }))

  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`
  }, '')

  return (
    <div style={{ width: '100%', margin: '40px 0' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
        Indeks Persepsi Korupsi Indonesia (1995–2023)
      </h4>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
        Sumber: Transparency International (Skor 0-100, makin tinggi makin bersih)
      </p>

      <div style={{ overflowX: 'auto', paddingBottom: '16px' }}>
        <div style={{ minWidth: '600px', width: '100%', position: 'relative' }}>
          <svg width={width} height={height} style={{ overflow: 'visible', margin: '0 auto', display: 'block' }}>
            {/* Guidelines & Y Axis labels */}
            {[0, 10, 20, 30, 40, 50].map((val, idx) => {
              const y = getY(val)
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="var(--color-border)"
                    strokeWidth="1"
                    strokeDasharray={val === 0 ? 'none' : '4 4'}
                    opacity={val === 0 ? 1 : 0.4}
                  />
                  <text
                    x={paddingX - 12}
                    y={y + 4}
                    fill="var(--color-text-muted)"
                    fontSize="0.75rem"
                    fontFamily="var(--font-mono)"
                    textAnchor="end"
                  >
                    {val}
                  </text>
                </g>
              )
            })}

            {/* X-axis labels */}
            {points.map((p, idx) => (
              <text
                key={idx}
                x={p.x}
                y={height - paddingY + 20}
                fill="var(--color-text-muted)"
                fontSize="0.75rem"
                fontFamily="var(--font-mono)"
                textAnchor="middle"
              >
                {p.tahun}
              </text>
            ))}

            {/* CPI Trend Line (Animated SVG stroke-dashoffset) */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* CPI Area Fill (Semi-transparent) */}
            <path
              d={`${pathD} L ${getX(maxYear)} ${getY(0)} L ${getX(minYear)} ${getY(0)} Z`}
              fill="var(--color-primary)"
              opacity="0.05"
            />

            {/* Data Points */}
            {points.map((p, idx) => {
              const isActive = activePoint === idx
              return (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 8 : 5}
                    fill={isActive ? 'var(--color-accent)' : 'var(--color-primary)'}
                    stroke="var(--color-background)"
                    strokeWidth="2"
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={() => setActivePoint(idx)}
                    onMouseLeave={() => setActivePoint(null)}
                  />
                  {isActive && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="16"
                      fill="var(--color-primary)"
                      opacity="0.15"
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </g>
              )
            })}
          </svg>

          {/* Hover Details Panel */}
          <div
            style={{
              minHeight: '68px',
              marginTop: '16px',
              textAlign: 'center',
              padding: '12px',
              backgroundColor: 'var(--color-surface-alt)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--color-border)',
              maxWidth: '480px',
              margin: '20px auto 0 auto'
            }}
          >
            {activePoint !== null ? (
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--color-primary)' }}>
                  Tahun {points[activePoint].tahun}:
                </span>{' '}
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}>
                  Skor {points[activePoint].skor}
                </strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--color-text)' }}>
                  {points[activePoint].label}
                </p>
              </div>
            ) : (
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                Arahkan kursor ke titik grafik untuk info detail historis
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
