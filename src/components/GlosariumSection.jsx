import { motion } from 'motion/react'
import { useState } from 'react'
import { glosarium } from '../data/glosarium'
import SplitText from './ui/SplitText'

export default function GlosariumSection() {
  const [search, setSearch] = useState('')

  const filteredGlosarium = glosarium.filter(
    item =>
      item.kata.toLowerCase().includes(search.toLowerCase()) ||
      item.arti.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section id="glosarium" className="alt-bg" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Panduan Istilah
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '8px', fontSize: '2.5rem' }}>
            <SplitText text="Glosarium Hukum" />
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
            Istilah-istilah hukum yang perlu kamu tahu dalam perjalanan sejarah hukum Indonesia.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div style={{ maxWidth: '480px', margin: '0 auto 60px auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="Cari kata kunci (misal: OTT, SP3)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-text)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)'
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* GLOSSARY DICTIONARY GRID */}
        {filteredGlosarium.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px'
            }}
          >
            {filteredGlosarium.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                whileHover={{ x: 6 }}
                style={{
                  backgroundColor: 'var(--color-surface-alt)',
                  padding: '24px',
                  borderRadius: 'var(--border-radius-md)',
                  borderLeft: '3px solid var(--color-primary)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    color: 'var(--color-primary)',
                    marginBottom: '8px',
                    fontWeight: '700'
                  }}
                >
                  {item.kata}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', margin: 0, lineHeight: '1.6' }}>
                  {item.arti}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Tidak ada kata kunci "{search}" yang ditemukan. Silakan cari istilah lainnya.
          </div>
        )}

        {/* HINT BANNER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: '60px',
            textAlign: 'center',
            backgroundColor: 'var(--color-surface-alt)',
            padding: '16px 24px',
            borderRadius: 'var(--border-radius-md)',
            border: '1px dashed var(--color-border)',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)'
          }}
        >
          💡 <strong>Tips Pembaca:</strong> Arahkan kursor mouse kamu ke kata kunci berwarna merah yang memiliki garis bawah putus-putus di seluruh teks website ini untuk langsung memunculkan kartu penjelas glosarium secara instan!
        </motion.div>

      </div>
    </section>
  )
}
