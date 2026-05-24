import { motion } from 'motion/react'
import Badge from './ui/Badge'
import SplitText from './ui/SplitText'
import { useState } from 'react'

export default function TimSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const anggotaTim = [
    {
      nama: 'Aditya Arfriansyah',
      nis: 'Presensi: 1',
      peran: 'Ketua & Peneliti Utama'
    },
    {
      nama: 'Akhtar Akifa Sakhi',
      nis: 'Presensi 2',
      peran: 'Project Manajer'
    },
    {
      nama: 'Banoe Izdihar Tsuraya',
      nis: 'Presensi 9',
      peran: 'Desainer & Developer'
    }
  ]

  return (
    <section id="tim" className="alt-bg" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Tim Penyusun
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '8px', fontSize: '2.5rem' }}>
            <SplitText text="Pilar Hukum Indonesia" />
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '8px', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>
            Kelompok 4 - XI SIJA 1
          </p>
        </div>

        {/* TEAM MEMBER GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '60px',
            padding: '40px 0'
          }}
        >
          {anggotaTim.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Avatar Image Placeholder */}
              <motion.div
                animate={{
                  scale: hoveredIdx === idx ? 1.08 : 1
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 8px 24px rgba(114, 24, 24, 0.15)',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                {/* Placeholder - akan diganti dengan gambar */}
                <img
                  src={`/images/tim/tim-${idx + 1}.webp`}
                  alt={m.nama}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </motion.div>

              {/* Name - Zoom on hover */}
              <motion.h4
                animate={{
                  scale: hoveredIdx === idx ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  color: 'var(--color-accent)',
                  marginBottom: '6px',
                  transformOrigin: 'center'
                }}
              >
                {m.nama}
              </motion.h4>

              {/* NIS */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '16px'
                }}
              >
                {m.nis}
              </span>

              {/* Role Badge */}
              <Badge variant="primary">
                {m.peran}
              </Badge>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
