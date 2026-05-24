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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {item.icon && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                    {item.icon === 'document' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    )}
                    {item.icon === 'newspaper' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 11a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3z"/>
                        <path d="M6 15h12"/>
                        <path d="M6 19h12"/>
                        <path d="M4 3h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
                      </svg>
                    )}
                    {item.icon === 'book' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                        <polyline points="10 6 10 10 14 8 10 6"/>
                      </svg>
                    )}
                    {item.icon === 'chart' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <polyline points="19 12 12 19 5 12"/>
                      </svg>
                    )}
                  </div>
                )}
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
              </div>
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
