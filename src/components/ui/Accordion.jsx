import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="accordion-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {items.map((item, index) => {
        const isOpen = activeIndex === index
        return (
          <div
            key={index}
            className="accordion-item"
            style={{
              border: '1px solid var(--color-border)',
              backgroundColor: isOpen ? 'var(--color-surface)' : 'var(--color-surface-alt)',
              borderRadius: 'var(--border-radius-md)',
              overflow: 'hidden',
              transition: 'background-color 0.3s ease'
            }}
          >
            <button
              onClick={() => toggleItem(index)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                outline: 'none'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--color-accent)'
                }}
              >
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  color: 'var(--color-primary)'
                }}
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div
                    style={{
                      padding: '0 24px 20px 24px',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      color: 'var(--color-text-muted)',
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: '16px',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
