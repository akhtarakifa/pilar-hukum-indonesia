import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import { statistikHero } from '../data/statistik'

// Helper component for counter animation
function Counter({ value, duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const totalMiliseconds = duration * 1000
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10)
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime))
      if (start >= end) {
        clearInterval(timer)
        setCount(end)
      } else {
        setCount(start)
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [isInView, value, duration])

  return <span ref={ref}>{count.toLocaleString('id-ID')}</span>
}

export default function HeroSection() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()

  // Parallax effects
  const bgY = useTransform(scrollY, [0, 600], [0, -100])
  const textY = useTransform(scrollY, [0, 600], [0, 60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Glitch Keyframes Style */}
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        .glitch-text {
          animation: glitch 0.5s linear infinite;
          animation-delay: 1.5s;
          animation-iteration-count: 3;
        }
      `}</style>

      {/* Hero Header Area */}
      <div
        id="hero"
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Split Background Images */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            y: bgY,
            zIndex: 1
          }}
        >
          {/* Left Panel - KPK */}
          <div
            style={{
              flex: 1,
              backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRight: '1px solid rgba(255,255,255,0.1)'
            }}
          />
          {/* Right Panel - MK */}
          <div
            style={{
              flex: 1,
              backgroundImage: 'url("https://images.unsplash.com/photo-1505664194779-8bebcb95c539?auto=format&fit=crop&q=80&w=1200")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </motion.div>

        {/* Overlay Dark Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(45,37,36,0.7) 0%, rgba(114,24,24,0.4) 50%, rgba(45,37,36,0.9) 100%)',
            zIndex: 2
          }}
        />

        {/* Floating Geometric Elements */}
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '60px',
            height: '60px',
            border: '2px dashed var(--color-primary)',
            borderRadius: '50%',
            opacity: 0.25,
            zIndex: 3
          }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '15%',
            width: '80px',
            height: '2px',
            backgroundColor: 'var(--color-primary)',
            opacity: 0.3,
            zIndex: 3
          }}
        />

        {/* Center Content Block */}
        <motion.div
          style={{
            textAlign: 'center',
            color: '#ffffff',
            zIndex: 4,
            padding: '0 24px',
            y: textY,
            opacity
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Small Label */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'var(--color-surface-alt)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '16px'
            }}
          >
            Era Reformasi Indonesia · Landasan Kelembagaan
          </motion.span>

          {/* Title */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                margin: 0,
                color: '#ffffff'
              }}
            >
              Pilar Hukum
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                margin: 0,
                color: 'var(--color-primary)'
              }}
            >
              Indonesia
            </motion.h1>
          </div>

          {/* Subtitle with initial Glitch */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="glitch-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontStyle: 'italic',
              margin: '18px 0',
              fontWeight: '400'
            }}
          >
            KPK dan Mahkamah Konstitusi
          </motion.p>

          {/* Golden/Red Center Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.6, ease: 'easeInOut' }}
            style={{
              height: '3px',
              width: '60px',
              backgroundColor: 'var(--color-primary)',
              margin: '24px auto',
              borderRadius: '2px'
            }}
          />

          {/* Scroll Down Bounce Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              marginTop: '40px',
              display: 'inline-block',
              fontSize: '1.5rem',
              color: 'var(--color-surface-alt)',
              cursor: 'pointer'
            }}
            onClick={() => {
              document.getElementById('pengantar')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Stats counter banner */}
      <div
        style={{
          backgroundColor: 'var(--color-accent)',
          color: '#fbf9f6',
          padding: '40px 24px',
          borderBottom: '1px solid var(--color-border)',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '30px',
            textAlign: 'center'
          }}
        >
          {statistikHero.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center'
                }}
              >
                <Counter value={stat.angka} />
                <span style={{ fontSize: '1.8rem', marginLeft: '2px' }}>{stat.satuan}</span>
                {stat.suffix && <span style={{ fontSize: '1.1rem', marginLeft: '4px' }}>{stat.suffix}</span>}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: '#e1d9ce',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
