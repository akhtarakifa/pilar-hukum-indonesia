import { motion } from 'motion/react'
import Badge from './ui/Badge'
import SplitText from './ui/SplitText'

export default function TimSection() {
  const anggotaTim = [
    {
      nama: 'Aditya Arfriansyah',
      nis: 'NIS. 22.11.0801',
      peran: 'Ketua & Peneliti Utama',
      inisial: 'AA'
    },
    {
      nama: 'Akhtar Akifa Sakhi',
      nis: 'NIS. 22.11.0802',
      peran: 'Penulis Konten Sejarah',
      inisial: 'MF'
    },
    {
      nama: 'Banoe Izdihar Tsuraya',
      nis: 'NIS. 22.11.0803',
      peran: 'Desainer & Developer',
      inisial: 'RD'
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
            Siswa Kelas XI SIJA 1 — SMK Negeri 7 Semarang (2025)
          </p>
        </div>

        {/* TEAM MEMBER GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '30px'
          }}
        >
          {anggotaTim.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              style={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-lg)',
                padding: '32px 24px',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(45,37,36,0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              {/* Initials Avatar */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  marginBottom: '20px',
                  boxShadow: '0 4px 12px rgba(114, 24, 24, 0.2)'
                }}
              >
                {m.inisial}
              </div>

              {/* Name */}
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  color: 'var(--color-accent)',
                  marginBottom: '6px'
                }}
              >
                {m.nama}
              </h4>

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
              <Badge variant="primary" style={{ marginTop: 'auto' }}>
                {m.peran}
              </Badge>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
