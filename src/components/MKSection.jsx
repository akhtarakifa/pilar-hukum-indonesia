import { motion, useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { kasusMK } from '../data/kasusMK'
import { perbandinganMKMA } from '../data/perbandinganMKvMA'
import ImageWithSkeleton from './ui/ImageWithSkeleton'
import Badge from './ui/Badge'
import KasusCard from './ui/KasusCard'
import Accordion from './ui/Accordion'
import DonutChart from './ui/DonutChart'
import Timeline from './ui/Timeline'

export default function MKSection() {
  const counterRef = useRef(null)
  const isCounterInView = useInView(counterRef, { once: true })
  const [dayVal, setDayVal] = useState(0)

  useEffect(() => {
    if (!isCounterInView) return
    let start = 0
    const end = 15
    const timer = setInterval(() => {
      start += 1
      if (start >= end) {
        clearInterval(timer)
        setDayVal(end)
      } else {
        setDayVal(start)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [isCounterInView])

  const wewenangMK = [
    {
      title: 'Menguji Undang-Undang Terhadap UUD 1945',
      content: 'Wewenang utama MK untuk menguji apakah materi muatan ayat, pasal, dan/atau bagian undang-undang bertentangan dengan Undang-Undang Dasar 1945.'
    },
    {
      title: 'Memutus Sengketa Kewenangan Lembaga Negara',
      content: 'Menyelesaikan perselisihan hukum antara lembaga-lembaga negara yang kewenangannya diberikan secara langsung oleh UUD 1945.'
    },
    {
      title: 'Memutus Pembubaran Partai Politik',
      content: 'Mengadili perkara pembubaran partai politik yang dinilai memiliki asas, tujuan, atau aktivitas yang bertentangan dengan UUD 1945.'
    },
    {
      title: 'Memutus Perselisihan Hasil Pemilu (PHPU)',
      content: 'Mengadili dan memutus sengketa hasil pemilihan legislatif (DPR, DPD, DPRD) serta pemilihan presiden/wakil presiden secara final.'
    },
    {
      title: 'Kewajiban Memutus Impeachment Presiden',
      content: 'Wajib memberikan putusan atas pendapat DPR bahwa Presiden dan/atau Wakil Presiden diduga telah melakukan pelanggaran hukum atau pengkhianatan terhadap negara.'
    }
  ]

  const alurMK = [
    {
      num: '01',
      title: 'Pengajuan Permohonan',
      desc: 'Diajukan oleh perorangan warga negara, kesatuan hukum adat, badan hukum, atau lembaga negara.'
    },
    {
      num: '02',
      title: 'Sidang Pendahuluan',
      desc: 'Pemeriksaan kelengkapan dokumen permohonan, kejelasan kedudukan hukum (legal standing), serta perbaikan materi.'
    },
    {
      num: '03',
      title: 'Sidang Pemeriksaan',
      desc: 'Mendengarkan keterangan saksi, ahli, pemerintah, DPR, serta pengujian berkas alat bukti secara terbuka.'
    },
    {
      num: '04',
      title: 'Sidang Putusan',
      desc: 'Pembacaan putusan yang bersifat final, mengikat, dan berlaku bagi seluruh warga negara (erga omnes).'
    }
  ]

  return (
    <section id="mk" className="alt-bg" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        
        {/* BANNER MK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            height: 'clamp(240px, 320px, 320px)',
            width: '100%',
            borderRadius: 'var(--border-radius-lg)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '60px',
            boxShadow: '0 8px 30px rgba(114, 24, 24, 0.1)'
          }}
        >
          <ImageWithSkeleton
            src="/images/mk/desktop/MK_Picture.webp"
            alt="Gedung Mahkamah Konstitusi"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(114, 24, 24, 0.6) 0%, rgba(45,37,36,0.3) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '40px'
            }}
          >
            <div style={{ color: 'white' }}>
              <Badge variant="accent" style={{ marginBottom: '12px' }}>Benteng Konstitusi</Badge>
              <h2 style={{ color: 'white', fontFamily: 'var(--font-heading)', margin: 0, fontSize: '2.5rem' }}>
                Mahkamah Konstitusi (MK)
              </h2>
            </div>
          </div>
        </motion.div>

        {/* KONTEN LEMBAGA ATAS - FEATURE SPLIT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '80px'
          }}
        >
          {/* Kiri: Big 15 Date counter */}
          <div ref={counterRef} style={{ textAlign: 'center', borderRight: '1px solid var(--color-border)', paddingRight: '20px' }} className="date-counter-split">
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(5rem, 10vw, 8rem)',
                fontWeight: '700',
                lineHeight: '0.9',
                color: 'var(--color-primary)',
                display: 'block'
              }}
            >
              {dayVal}
            </span>
            <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
              Agustus 2003
            </strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              TANGGAL RESMI BERDIRI
            </span>
          </div>

          {/* Kanan: Deskripsi Konstitusi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="fill" style={{ marginBottom: '12px' }}>Amanat Amendemen UUD 1945</Badge>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '16px' }}>
              Sang Penjaga Konstitusi (The Guardian of Constitution)
            </h3>
            <p style={{ margin: 0 }}>
              Mahkamah Konstitusi Republik Indonesia dibentuk sebagai perwujudan amandemen ketiga UUD 1945 untuk memastikan tidak ada produk undang-undang buatan DPR dan Presiden yang menyimpang dari konstitusi dasar negara. MK memegang peran sakral sebagai penafsir tunggal (sole interpreter) konstitusi.
            </p>
          </motion.div>
        </div>

        {/* KONTEN LEMBAGA BAWAH - DUA KOLOM */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            marginBottom: '80px'
          }}
        >
          {/* Kolom Kiri: Komposisi 9 Hakim */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '16px' }}>
              Dasar Hukum & Komposisi
            </h4>
            <p>
              MK diatur langsung dalam <strong>Pasal 24C UUD 1945</strong>. MK memiliki 9 orang Hakim Konstitusi yang diajukan oleh tiga pilar kekuasaan negara untuk menjaga independensi mutlak kelembagaan:
            </p>
            
            {/* Visualisasi 9 Hakim */}
            <div
              style={{
                backgroundColor: 'var(--color-surface-alt)',
                padding: '24px',
                borderRadius: 'var(--border-radius-md)',
                marginTop: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                {/* SVG Icon - Scale */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M6 6l12 12M18 6l-12 12"/>
                </svg>
                <strong style={{ color: 'var(--color-accent)' }}>
                  Pembagian 9 Hakim Konstitusi:
                </strong>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* 3 MA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem' }}><strong>3 Orang</strong> diajukan oleh Mahkamah Agung (MA)</span>
                </div>
                {/* 3 DPR */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem' }}><strong>3 Orang</strong> diajukan oleh DPR RI (Legislatif)</span>
                </div>
                {/* 3 Presiden */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-text-muted)' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem' }}><strong>3 Orang</strong> diajukan oleh Presiden (Eksekutif)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan: Wewenang Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '16px' }}>
              Wewenang Konstitusional MK
            </h4>
            <Accordion items={wewenangMK} />
          </motion.div>
        </div>

        {/* ALUR BERPERKARA DI MK (HORIZONTAL TIMELINE) */}
        <div style={{ marginBottom: '100px' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', textAlign: 'center', marginBottom: '40px' }}>
            Alur Berperkara / Uji Undang-Undang di MK
          </h4>
          
          <div style={{ overflowX: 'auto', paddingBottom: '20px' }}>
            <div className="horizontal-timeline-container">
              {alurMK.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="horizontal-timeline-item"
                >
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="step-num">{step.num}</div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-primary)' }}>
                      {step.title}
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.5' }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* TABEL PERBANDINGAN MK vs MA */}
        <div style={{ marginBottom: '80px' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', textAlign: 'center', marginBottom: '32px' }}>
            Perbedaan Lembaga Yudikatif Tinggi: MK vs MA
          </h4>

          <div style={{ overflowX: 'auto', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
                  <th style={{ padding: '16px 20px', fontFamily: 'var(--font-body)', fontWeight: '700' }}>Aspek</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'var(--font-body)', fontWeight: '700' }}>Mahkamah Konstitusi (MK)</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'var(--font-body)', fontWeight: '700' }}>Mahkamah Agung (MA)</th>
                </tr>
              </thead>
              <tbody>
                {perbandinganMKMA.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fbf9f6',
                      borderBottom: '1px solid var(--color-border)'
                    }}
                  >
                    <td style={{ padding: '14px 20px', fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-accent)' }}>
                      {row.aspek}
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                      {row.mk}
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                      {row.ma}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STATISTIK DONUT CHART */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            marginBottom: '80px'
          }}
        >
          <DonutChart />
        </motion.div>

        {/* SUB-SECTION KASUS MK */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Putusan Bersejarah
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginTop: '8px' }}>
              Putusan Monumental Mahkamah Konstitusi
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px'
            }}
          >
            {kasusMK.map((kasus) => (
              <div key={kasus.id}>
                <KasusCard data={kasus} type="mk" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Styled Responsive Alur CSS */}
      <style>{`
        .horizontal-timeline-container {
          display: flex;
          gap: 20px;
          position: relative;
          padding: 40px 20px;
          min-width: min-content;
          align-items: flex-start;
        }

        .horizontal-timeline-container::before {
          content: '';
          position: absolute;
          top: 40px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, var(--color-border) 0%, var(--color-border) calc(100% - 40px), transparent 100%);
          z-index: 1;
        }

        .horizontal-timeline-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 200px;
          position: relative;
          z-index: 2;
        }

        .timeline-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: var(--color-primary);
          margin-bottom: 20px;
          position: relative;
          z-index: 3;
          box-shadow: 0 0 0 4px var(--color-surface), 0 0 0 6px var(--color-border);
        }

        .timeline-content {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          padding: 20px;
          border-radius: var(--border-radius-md);
          box-shadow: 0 4px 12px rgba(45,37,36,0.02);
          text-align: center;
          width: 100%;
        }

        .step-num {
          font-family: var(--font-mono);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--color-accent);
          line-height: 1;
          margin-bottom: 12px;
        }

        @media (max-width: 992px) {
          .horizontal-timeline-container {
            gap: 16px;
            padding: 30px 16px;
          }

          .horizontal-timeline-item {
            min-width: 160px;
          }

          .timeline-content {
            padding: 16px;
          }

          .step-num {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 576px) {
          .horizontal-timeline-container {
            gap: 12px;
            padding: 24px 12px;
          }

          .horizontal-timeline-item {
            min-width: 140px;
          }

          .timeline-content {
            padding: 12px;
          }

          .timeline-content h5 {
            font-size: 0.9rem !important;
          }

          .timeline-content p {
            font-size: 0.7rem !important;
          }

          .step-num {
            font-size: 1.2rem;
          }

          .date-counter-split {
            border-right: none !important;
            border-bottom: 1px solid var(--color-border);
            padding-right: 0 !important;
            padding-bottom: 24px;
          }
        }
      `}</style>
    </section>
  )
}
