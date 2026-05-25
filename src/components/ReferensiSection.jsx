import { motion } from 'motion/react'
import Accordion from './ui/Accordion'
import SplitText from './ui/SplitText'

export default function ReferensiSection() {
  const referensiData = [
    {
      title: 'Situs Resmi Pemerintah',
      icon: 'document',
      content: (
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <a href="https://www.kpk.go.id" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              kpk.go.id
            </a>{' '}
            — Portal resmi Komisi Pemberantasan Korupsi Republik Indonesia.
          </li>
          <li>
            <a href="https://www.mkri.id" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              mkri.id
            </a>{' '}
            — Portal resmi Mahkamah Konstitusi Republik Indonesia.
          </li>
        </ul>
      )
    },
    {
      title: 'Berita & Portal Artikel Publik',
      icon: 'newspaper',
      content: (
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <a href="https://id.wikipedia.org/wiki/Korupsi_e-KTP" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              id.wikipedia.org
            </a>{' '}
            — Kronologi lengkap mega korupsi pengadaan KTP Elektronik Setya Novanto.
          </li>
          <li>
            <a href="https://nasional.kompas.com/read/2023/04/12/12262861/kilas-balik-kasus-anas-urbaningrum-korupsi-proyek-hambalang-hukuman" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              kompas.com
            </a>{' '}
            — Kilas balik kasus suap proyek P3SON Hambalang Anas Urbaningrum.
          </li>
          <li>
            <a href="https://www.liputan6.com/news/read/3026241/3-ketua-lembaga-tinggi-negara-yang-terjerat-kasus-korupsi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              liputan6.com
            </a>{' '}
            — Dokumentasi penangkapan Ketua MK Akil Mochtar melalui OTT KPK.
          </li>
          <li>
            <a href="https://www.bbc.com/indonesia/berita_indonesia/2014/07/140716_bankcentury_101" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              bbc.com
            </a>{' '}
            — Analisis mendalam tentang kasus bailout Bank Century.
          </li>
          <li>
            <a href="https://www.metrotvnews.com/read/NQACq1n6-mengenal-sejarah-blbi-sebagai-bagian-dari-skandal-terbesar-indonesia" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              metrotvnews.com
            </a>{' '}
            — Ringkasan penanganan kasus mega korupsi BLBI.
          </li>
          <li>
            <a href="https://www.hukumonline.com/berita/a/mk-batalkan-uu-sumber-daya-air-lt54e4bd8e5dc0a/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              hukumonline.com
            </a>{' '}
            — Putusan MK tentang pembatalan UU Sumber Daya Air.
          </li>
          <li>
            <a href="https://igj.or.id/2023/12/09/mk-putuskan-uu-cipta-kerja-cacat-formil-dan-inkonstitusional-2/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              igj.or.id
            </a>{' '}
            — Analisis Putusan MK tentang UU Cipta Kerja.
          </li>
          <li>
            <a href="https://aji.or.id/informasi/mahkamah-konstitusi-indonesia-batalkan-pasal-berita-bohong-dan-pencemaran-nama-baik-di" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              aji.or.id
            </a>{' '}
            — Mahkamah Konstitusi membatalkan pasal berita bohong.
          </li>
          <li>
            <a href="https://www.mkri.id/berita/putusan-mk-soal-batas-usia-capres-cawapres-final-dan-mengikat-19979" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              mkri.id
            </a>{' '}
            — Putusan MK tentang batas usia Capres/Cawapres.
          </li>
        </ul>
      )
    },
    {
      title: 'Data & Lembaga Statistik',
      icon: 'chart',
      content: (
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <a href="https://www.transparency.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              Transparency International
            </a>{' '}
            — Indeks Persepsi Korupsi (Corruption Perceptions Index / CPI) Indonesia sejak 1995.
          </li>
        </ul>
      )
    }
  ]

  return (
    <section id="referensi" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Daftar Pustaka
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '8px', fontSize: '2.5rem' }}>
            Sumber & Referensi
          </h2>
        </div>

        {/* ACCORDION BIBLIOGRAPHY */}
        <div style={{ maxWidth: '720px', margin: '0 auto 60px auto' }}>
          <Accordion items={referensiData} />
        </div>

        {/* ACKNOWLEDGEMENTS NOTE */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              lineHeight: '1.6',
              fontStyle: 'italic',
              margin: 0
            }}
          >
            "Website statis ini dirancang sepenuhnya untuk keperluan tugas sekolah mata pelajaran Sejarah Indonesia. Seluruh kutipan sejarah, data infografis, dan ringkasan hukum bersumber penuh dari referensi-referensi publik tepercaya di atas."
          </motion.p>
        </div>

      </div>
    </section>
  )
}
