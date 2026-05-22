import { motion } from 'motion/react'
import LineChart from './ui/LineChart'
import SplitText from './ui/SplitText'
import GlossaryTerm from './ui/GlossaryTerm'

export default function DampakSection() {
  const dampakCards = [
    {
      icon: '🏛️',
      title: 'Pemberantasan Korupsi',
      desc: 'Membongkar mega-skandal korupsi politik yang sebelumnya mustahil disentuh hukum, menetapkan standar baru akuntabilitas pejabat negara, serta memulihkan triliunan rupiah uang rakyat ke kas negara.'
    },
    {
      icon: '📜',
      title: 'Supremasi Konstitusi',
      desc: 'Melindungi hak-hak dasar konstitusional warga dari potensi penyalahgunaan kekuasaan pembuat undang-undang, membatalkan regulasi diskriminatif, dan menegakkan supremasi hukum tertinggi di Indonesia.'
    },
    {
      icon: '🤝',
      title: 'Fondasi Demokrasi',
      desc: 'Menstabilkan transisi demokrasi pasca-kejatuhan otoritarianisme, memutus lingkar setan korupsi sistemik, serta memastikan sengketa pemilu diselesaikan di meja hijau secara damai dan adil.'
    }
  ]

  const kutipanTokoh = [
    {
      teks: '"KPK adalah lokomotif pemberantasan korupsi di Indonesia. Keberadaannya memberi harapan baru bahwa hukum dapat tegak dan adil bagi siapa saja, tanpa terkecuali."',
      tokoh: 'Prof. Dr. Baharuddin Lopa, S.H.',
      jabatan: 'Jaksa Agung RI (2001) & Tokoh Antikorupsi Indonesia'
    },
    {
      teks: '"Mahkamah Konstitusi didirikan bukan sekadar sebagai lembaga peradilan, melainkan sebagai pelindung hak asasi manusia dan penjaga sakralitas konstitusi dari kesewenang-wenangan mayoritas politik."',
      tokoh: 'Prof. Dr. Jimly Asshiddiqie, S.H.',
      jabatan: 'Ketua Mahkamah Konstitusi RI Pertama (2003–2008)'
    },
    {
      teks: '"Kepercayaan publik adalah modal utama KPK dan Mahkamah Konstitusi. Ketika modal itu tergerus oleh politik praktis atau pelemahan institusi, fondasi keadilan seluruh bangsa ikut berguncang."',
      tokoh: 'Artidjo Alkostar, S.H., LL.M.',
      jabatan: 'Mantan Hakim Agung RI & Anggota Dewas KPK Pertama'
    }
  ]

  const tantangan = [
    {
      title: 'Revisi UU KPK Tahun 2019',
      desc: 'Revisi UU KPK No. 19/2019 dikritik luas oleh akademisi dan masyarakat sipil karena dinilai membatasi independensi KPK, melahirkan Dewan Pengawas berizin sadap birokratis, serta mengubah status pegawai KPK menjadi ASN.'
    },
    {
      title: 'Kasus Teror Terhadap Penyidik',
      desc: 'Kasus penyerangan fisik yang dialami oleh penyidik-penyidik utama KPK, seperti penyiraman air keras terhadap Novel Baswedan pada tahun 2017, membutuhkan penyelesaian hukum yang transparan guna melindungi keselamatan penegak hukum.'
    },
    {
      title: 'Krisis Integritas Hakim Konstitusi',
      desc: 'Kasus suap yang menimpa mantan Ketua MK Akil Mochtar (2013) serta dinamika pemberhentian hakim konstitusi menunjukkan pentingnya pengawasan ketat dan transparansi tinggi dalam rekrutmen hakim demi menjaga martabat benteng hukum terakhir.'
    },
    {
      title: 'Skor Indeks Persepsi Korupsi yang Stagnan',
      desc: 'Skor CPI Indonesia yang masih berada di kisaran 34-40 menunjukkan pekerjaan rumah pemberantasan korupsi masih sangat besar di tingkat kepolisian, kejaksaan, sektor pelayanan publik, dan birokrasi daerah.'
    }
  ]

  return (
    <section id="dampak" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Dampak & Signifikansi
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '8px', fontSize: '2.5rem' }}>
            <SplitText text="Warisan Dua Lembaga untuk Indonesia" />
          </h2>
        </div>

        {/* 3 KARTU UTAMA */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '80px'
          }}
        >
          {dampakCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '32px',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '0 4px 16px rgba(45,37,36,0.02)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{card.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '12px', color: 'var(--color-accent)' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.6' }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* GRAFIK LINE CHART CPI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            padding: '30px',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            marginBottom: '80px'
          }}
        >
          <LineChart />
        </motion.div>

        {/* KUTIPAN TOKOH (ELEGANT GRID / ROW) */}
        <div style={{ marginBottom: '80px' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', textAlign: 'center', marginBottom: '32px' }}>
            Suara Tokoh Bangsa
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {kutipanTokoh.map((k, idx) => (
              <motion.blockquote
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  backgroundColor: 'var(--color-surface-alt)',
                  borderLeft: '4px solid var(--color-primary)',
                  padding: '24px 32px',
                  margin: 0,
                  borderRadius: '0 var(--border-radius-md) var(--border-radius-md) 0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                }}
              >
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--color-accent)', marginBottom: '12px', lineHeight: '1.7' }}>
                  {k.teks}
                </p>
                <cite style={{ display: 'block', fontStyle: 'normal' }}>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-primary)' }}>{k.tokoh}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{k.jabatan}</span>
                </cite>
              </motion.blockquote>
            ))}
          </div>
        </div>

        {/* TANTANGAN KE DEPAN */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Realita Hukum
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginTop: '8px' }}>
              Tantangan Masa Depan & Reformasi Hukum Berkelanjutan
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {tantangan.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  padding: '24px',
                  borderRadius: 'var(--border-radius-md)',
                  boxShadow: '0 4px 12px rgba(45,37,36,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                  <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', margin: 0, color: 'var(--color-primary)' }}>
                    {t.title}
                  </h5>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.6' }}>
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
