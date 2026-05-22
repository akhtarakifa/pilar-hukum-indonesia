import { motion } from 'motion/react'
import Accordion from './ui/Accordion'
import SplitText from './ui/SplitText'

export default function ReferensiSection() {
  const referensiData = [
    {
      title: '📄 Situs Resmi Pemerintah',
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
      title: '📰 Berita & Portal Artikel Publik',
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
            <a href="https://www.cnnindonesia.com/nasional/20211125204418-12-726228/penjelasan-ahli-soal-putusan-mk-uu-ciptaker-inkonstitusional-bersyarat" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              cnnindonesia.com
            </a>{' '}
            — Penjelasan ahli atas Putusan Mahkamah Konstitusi tentang UU Cipta Kerja.
          </li>
          <li>
            <a href="https://aji.or.id/informasi/mahkamah-konstitusi-indonesia-batalkan-pasal-berita-bohong-dan-pencemaran-nama-baik-di" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              aji.or.id
            </a>{' '}
            — Mahkamah Konstitusi membatalkan pasal karet tentang penyebaran berita bohong.
          </li>
          <li>
            <a href="https://www.liputan6.com/news/read/3026241/3-ketua-lembaga-tinggi-negara-yang-terjerat-kasus-korupsi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              liputan6.com
            </a>{' '}
            — Dokumentasi penangkapan Ketua MK Akil Mochtar melalui OTT KPK.
          </li>
          <li>
            <a href="https://fahum.umsu.ac.id/info/kasus-terbesar-yang-ditangani-oleh-kpk-di-indonesia/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              fahum.umsu.ac.id
            </a>{' '}
            — Ringkasan penanganan kasus mega korupsi Century dan bantuan BLBI.
          </li>
        </ul>
      )
    },
    {
      title: '📚 Jurnal & Naskah Akademik',
      content: (
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <a href="https://journal.unilak.ac.id/index.php/nia/article/download/27395/7715" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              journal.unilak.ac.id
            </a>{' '}
            — Analisis Putusan Mahkamah Konstitusi terhadap Undang-Undang Sumber Daya Air.
          </li>
          <li>
            <a href="https://www.amnesty.id" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              amnesty.id
            </a>{' '}
            — Rekomendasi pembatasan pasal pencemaran nama baik UU ITE demi kemerdekaan berpendapat.
          </li>
        </ul>
      )
    },
    {
      title: '📊 Data & Lembaga Statistik',
      content: (
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <a href="https://www.transparency.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              Transparency International
            </a>{' '}
            — Indeks Persepsi Korupsi (Corruption Perceptions Index / CPI) Indonesia sejak 1995.
          </li>
          <li>
            <a href="https://pajak.go.id" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              pajak.go.id
            </a>{' '}
            — Rekapitulasi amandemen batasan usia kandidat pemilu presiden.
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
            <SplitText text="Sumber & Referensi" />
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
