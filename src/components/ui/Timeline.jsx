import { motion } from 'motion/react'
import { useRef } from 'react'

export default function Timeline({ items }) {
  const containerRef = useRef(null)

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '20px 0',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto'
      }}
    >
      {/* Animated Vertical Line */}
      <div
        style={{
          position: 'absolute',
          left: '20px',
          top: '0',
          bottom: '0',
          width: '2px',
          backgroundColor: 'var(--color-border)',
          zIndex: 1
        }}
      />

      {/* Main Timeline items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              position: 'relative',
              paddingLeft: '50px',
              width: '100%',
              zIndex: 2
            }}
          >
            {/* Concentric Milestone Pulse */}
            <div
              style={{
                position: 'absolute',
                left: '20px',
                top: '6px',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '16px',
                zIndex: 3
              }}
            >
              {/* Inner Circle */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  position: 'relative',
                  zIndex: 2
                }}
              />
              {/* Outer Pulsing Ring */}
              <motion.div
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  zIndex: 1
                }}
              />
            </div>

            {/* Timeline content block */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '20px',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: '0 4px 12px rgba(45,37,36,0.02)',
                width: '100%'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                  display: 'inline-block'
                }}
              >
                {item.tahun}
              </div>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-text)',
                  margin: 0,
                  lineHeight: '1.6'
                }}
              >
                {item.keterangan}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
