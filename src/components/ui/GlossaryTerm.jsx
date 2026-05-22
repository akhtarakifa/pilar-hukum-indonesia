import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { glosarium } from '../../data/glosarium'

export default function GlossaryTerm({ word, children }) {
  const [hovered, setHovered] = useState(false)
  
  // Find definition
  const item = glosarium.find(g => g.kata.toLowerCase() === word.toLowerCase())
  const definition = item ? item.arti : 'Istilah Hukum Indonesia'

  return (
    <span
      className="glossary-term-wrapper"
      style={{ position: 'relative', display: 'inline-block', cursor: 'help' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          fontWeight: '600',
          color: 'var(--color-primary)',
          borderBottom: '1px dashed var(--color-primary)',
          position: 'relative',
          padding: '0 2px'
        }}
      >
        {children || word}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '10px',
              padding: '10px 14px',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-background)',
              fontSize: '0.85rem',
              borderRadius: '6px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
              zIndex: 999,
              width: '240px',
              lineHeight: '1.4',
              pointerEvents: 'none',
              textAlign: 'center',
              display: 'block'
            }}
          >
            <strong style={{ display: 'block', color: '#ffb3b3', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
              {word}
            </strong>
            {definition}
            <span
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid var(--color-accent)'
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
