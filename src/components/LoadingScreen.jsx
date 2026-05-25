import { motion } from 'motion/react'

export default function LoadingScreen() {
  const indonesiaLetters = "INDONESIA".split("")

  return (
    <motion.div
      className="loading-screen"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ 
        clipPath: 'inset(50% 0% 50% 0%)',
        opacity: 0
      }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#2d2524',
        color: '#fbf9f6',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Progress Bar (at the top of the screen) */}
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.7, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '4px',
          backgroundColor: 'var(--color-primary)'
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {/* Cinematic Text: PILAR */}
        <div style={{ height: '70px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '3.5rem',
              fontWeight: '700',
              color: '#fbf9f6',
              margin: 0,
              lineHeight: '1'
            }}
          >
            PILAR
          </motion.h1>
        </div>

        {/* Center Line dividing PILAR and HUKUM */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.05 }}
          style={{
            height: '2px',
            width: '280px',
            backgroundColor: 'var(--color-primary)',
            margin: '12px 0',
            transformOrigin: 'center'
          }}
        />

        {/* Cinematic Text: HUKUM */}
        <div style={{ height: '70px', overflow: 'hidden', display: 'flex', alignItems: 'flex-start' }}>
          <motion.h1
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '3.5rem',
              fontWeight: '700',
              color: '#fbf9f6',
              margin: 0,
              lineHeight: '1'
            }}
          >
            HUKUM
          </motion.h1>
        </div>

        {/* Cinematic Letters: INDONESIA */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          {indonesiaLetters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.02, duration: 0.15 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                color: 'var(--color-primary)',
                fontWeight: '700',
                letterSpacing: '0.1em'
              }}
            >
              {l}
            </motion.span>
          ))}
        </div>

        {/* Sub-text: KPK · MAHKAMAH KONSTITUSI */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: 0.4, delay: 0.65, ease: 'easeOut' }}
          style={{
            marginTop: '24px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            fontWeight: '600',
            textTransform: 'uppercase',
            margin: '24px 0 0 0'
          }}
        >
          KPK · MAHKAMAH KONSTITUSI
        </motion.p>
      </div>
    </motion.div>
  )
}
