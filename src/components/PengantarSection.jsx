import { motion } from 'motion/react'
import { timelineReformasi } from '../data/timelineReformasi'
import SplitText from './ui/SplitText'
import GlossaryTerm from './ui/GlossaryTerm'

export default function PengantarSection() {
  return (
    <section id="pengantar" className="alt-bg" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        
        {/* BAGIAN A — Kata Pengantar */}
        <div style={{ maxWidth: '720px', margin: '0 auto 80px auto', textAlign: 'center' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              height: '3px',
              width: '80px',
              backgroundColor: 'var(--color-primary)',
              margin: '0 auto 30px auto'
            }}
          />
          <motion.h2
            style={{ marginBottom: '24px', fontFamily: 'var(--font-heading)' }}
          >
            <SplitText text="Mengapa Reformasi Lahir?" />
          </motion.h2>
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              lineHeight: '1.8',
              color: 'var(--color-text)',
              fontStyle: 'italic'
            }}
          >
            "Kejatuhan Orde Baru pada tahun 1998 menyisakan krisis kepercayaan publik yang mendalam. Korupsi yang sistemis dan kekuasaan tanpa kontrol konstitusional melahirkan tuntutan bersejarah untuk mendirikan institusi independen yang tangguh: <GlossaryTerm word="KPK">Komisi Pemberantasan Korupsi (KPK)</GlossaryTerm> dan <GlossaryTerm word="Judicial Review">Mahkamah Konstitusi (MK)</GlossaryTerm>."
          </motion.p>
        </div>

        {/* BAGIAN B — Timeline Perjalanan Menuju Reformasi */}
        <div style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--color-primary)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              Kronologi
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>
              Perjalanan Menuju Reformasi
            </h3>
          </div>

          {/* Desktop Horizontal / Mobile Vertical Timeline container */}
          <div className="timeline-container">
            {timelineReformasi.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="timeline-node"
              >
                {/* Visual marker dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary)',
                      border: '3px solid var(--color-surface)',
                      boxShadow: '0 0 0 3px var(--color-border)',
                      zIndex: 3,
                      marginBottom: '16px'
                    }}
                  />
                  <div className="timeline-connector-line" />
                </div>
                {/* Year tag */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    marginBottom: '8px'
                  }}
                >
                  {item.tahun}
                </div>
                {/* Description */}
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.5' }}>
                  {item.keterangan}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BAGIAN C — Dua Kartu Konteks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}
        >
          {/* Card 1: Korupsi yang Mengakar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{
              backgroundColor: 'var(--color-surface-alt)',
              borderLeft: '4px solid var(--color-primary)',
              padding: '32px',
              borderRadius: '0 var(--border-radius-lg) var(--border-radius-lg) 0',
              boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              {/* SVG Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: 0 }}>
                Korupsi yang Mengakar (KKN)
              </h4>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', margin: 0 }}>
              Korupsi, Kolusi, dan Nepotisme (KKN) yang merajalela di era sebelumnya melumpuhkan birokrasi dan merampas kekayaan negara. Diperlukan institusi penegak hukum yang berani, berintegritas tinggi, dan sepenuhnya <GlossaryTerm word="Independen">independen</GlossaryTerm> untuk membasmi mafia korporasi dan politik.
            </p>
          </motion.div>

          {/* Card 2: Konstitusi Tanpa Penjaga */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{
              backgroundColor: 'var(--color-surface-alt)',
              borderLeft: '4px solid var(--color-primary)',
              padding: '32px',
              borderRadius: '0 var(--border-radius-lg) var(--border-radius-lg) 0',
              boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              {/* SVG Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                <path d="M6 6h10"/>
                <path d="M6 10h10"/>
              </svg>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: 0 }}>
                Konstitusi Tanpa Penjaga
              </h4>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', margin: 0 }}>
              Sebelum amandemen UUD 1945, tidak ada badan yudisial khusus yang bertugas menjaga marwah konstitusi atau meninjau keabsahan undang-undang terhadap hukum dasar negara. Mahkamah Konstitusi didirikan sebagai benteng penjaga hak asasi konstitusional warga Indonesia.
            </p>
          </motion.div>
        </div>

      </div>

      {/* Styled Responsive Timeline CSS */}
      <style>{`
        .timeline-container {
          display: flex;
          justify-content: space-between;
          position: relative;
          width: 100%;
          gap: 20px;
        }
        .timeline-node {
          flex: 1;
          text-align: center;
          position: relative;
        }
        .timeline-connector-line {
          position: absolute;
          left: 50%;
          right: -50%;
          top: 8px;
          height: 2px;
          background-color: var(--color-border);
          z-index: 1;
        }
        .timeline-node:last-child .timeline-connector-line {
          display: none;
        }
        @media (max-width: 992px) {
          .timeline-container {
            flex-direction: column;
            align-items: flex-start;
            padding-left: 20px;
            gap: 40px;
          }
          .timeline-container::before {
            content: '';
            position: absolute;
            left: 28px;
            top: 10px;
            bottom: 10px;
            width: 2px;
            background-color: var(--color-border);
            z-index: 1;
          }
          .timeline-node {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding-left: 30px;
          }
          .timeline-node > div {
            align-items: flex-start !important;
            margin-bottom: 8px !important;
          }
          .timeline-node > div > div:first-child {
            position: absolute;
            left: -2px;
            top: 2px;
          }
          .timeline-connector-line {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
