import { motion } from 'motion/react'
import { kasusKPK } from '../data/kasusKPK'
import ImageWithSkeleton from './ui/ImageWithSkeleton'
import Badge from './ui/Badge'
import KasusCard from './ui/KasusCard'
import BarChart from './ui/BarChart'
import SplitText from './ui/SplitText'
import GlossaryTerm from './ui/GlossaryTerm'

export default function KPKSection() {
  const pimpinanKPK = {
    title: 'PIMPINAN KPK (5 Orang)',
    desc: 'Terdiri atas 1 ketua merangkap anggota dan 4 wakil ketua merangkap anggota yang memimpin jalannya lembaga.'
  }

  const dewasKPK = {
    title: 'Dewan Pengawas (5 Orang)',
    desc: 'Mengawasi pelaksanaan tugas dan wewenang KPK, memberikan izin penyadapan/penggeledahan.'
  }

  const deputiKPK = {
    title: 'Deputi-Deputi',
    desc: 'Meliputi Deputi Penindakan, Pencegahan, Pendidikan & Peran Serta Masyarakat, Informasi & Data.'
  }

  return (
    <section id="kpk" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container">
        
        {/* BANNER KPK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            height: '320px',
            width: '100%',
            borderRadius: 'var(--border-radius-lg)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '60px',
            boxShadow: '0 8px 30px rgba(114, 24, 24, 0.1)'
          }}
        >
          <ImageWithSkeleton
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1440"
            alt="Gedung KPK Merah Putih"
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
              <Badge variant="accent" style={{ marginBottom: '12px' }}>Lembaga Anti-Korupsi</Badge>
              <h2 style={{ color: 'white', fontFamily: 'var(--font-heading)', margin: 0, fontSize: '2.5rem' }}>
                Komisi Pemberantasan Korupsi (KPK)
              </h2>
            </div>
          </div>
        </motion.div>

        {/* KONTEN LEMBAGA - DUA KOLOM */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            marginBottom: '80px'
          }}
        >
          {/* Kolom Kiri: Latar Belakang & Peran */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              Latar Belakang
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginTop: '8px', marginBottom: '20px' }}>
              Pembersihan Kasus KKN Secara Radikal
            </h3>
            <p>
              Didirikan melalui <strong>UU No. 30 Tahun 2002</strong>, KPK lahir di bawah kepemimpinan Presiden Megawati Soekarnoputri untuk memulihkan wibawa hukum Indonesia dari bencana korupsi kolosal. KPK didesain sebagai <em>trigger mechanism</em>—lembaga yang mendorong percepatan reformasi di kepolisian dan kejaksaan.
            </p>
            <div
              style={{
                backgroundColor: 'var(--color-surface-alt)',
                padding: '24px',
                borderRadius: 'var(--border-radius-md)',
                borderLeft: '4px solid var(--color-primary)',
                marginTop: '24px'
              }}
            >
              <strong style={{ display: 'block', color: 'var(--color-accent)', marginBottom: '8px' }}>
                🛡️ Sifat Kelembagaan KPK:
              </strong>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                KPK bersifat <GlossaryTerm word="Independen">Independen</GlossaryTerm> dan bebas dari pengaruh kekuasaan mana pun dalam melaksanakan tugas dan wewenangnya, menjamin keadilan yang setara di mata hukum tanpa intervensi eksekutif atau legislatif.
              </p>
            </div>
          </motion.div>

          {/* Kolom Kanan: Detail & Tugas Pokok */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>Tugas Pokok KPK</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li><strong>Penyelidikan & Penyidikan:</strong> Melakukan investigasi mendalam terhadap kasus-kasus korupsi yang melibatkan penyelenggara negara dengan kerugian minimal Rp 1 Miliar.</li>
              <li><strong>Pencegahan & Edukasi:</strong> Menanamkan nilai integritas di kalangan pelajar, guru, dan pegawai publik untuk memutus regenerasi perilaku koruptif.</li>
              <li><strong>Koordinasi & Supervisi:</strong> Mengawasi jalannya proses hukum korupsi di institusi Kepolisian dan Kejaksaan Agung.</li>
              <li><strong>Monitoring:</strong> Memantau sistem administrasi di kementerian dan daerah demi menutup celah penyalahgunaan anggaran.</li>
            </ul>
          </motion.div>
        </div>

        {/* BAGAN STRUKTUR ORGANISASI KPK */}
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '32px' }}>
            Struktur Organisasi KPK
          </h4>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {/* Level 1: Pimpinan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#ffffff',
                padding: '20px',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <h5 style={{ color: '#ffffff', margin: '0 0 6px 0', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                {pimpinanKPK.title}
              </h5>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>{pimpinanKPK.desc}</p>
            </motion.div>

            {/* Level 2: Bidang Pendukung */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px'
              }}
              className="struct-level-2"
            >
              {/* Dewan Pengawas */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderTop: '4px solid var(--color-primary)',
                  padding: '18px',
                  borderRadius: 'var(--border-radius-md)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}
              >
                <h5 style={{ margin: '0 0 6px 0', fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>
                  {dewasKPK.title}
                </h5>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{dewasKPK.desc}</p>
              </motion.div>

              {/* Deputi-Deputi */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderTop: '4px solid var(--color-primary)',
                  padding: '18px',
                  borderRadius: 'var(--border-radius-md)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}
              >
                <h5 style={{ margin: '0 0 6px 0', fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>
                  {deputiKPK.title}
                </h5>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{deputiKPK.desc}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* KEWENANGAN LUAR BIASA KPK */}
        <div style={{ marginBottom: '100px' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', textAlign: 'center', marginBottom: '32px' }}>
            Kewenangan Luar Biasa KPK (Ad Hoc)
          </h4>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px'
            }}
          >
            {/* Kewenangan 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '24px',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: '0 4px 12px rgba(45,37,36,0.02)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎙️</div>
              <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-primary)' }}>
                Penyadapan Tanpa Izin Pengadilan
              </h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                KPK memiliki wewenang menyadap komunikasi terduga koruptor tanpa harus menunggu izin tertulis dari ketua pengadilan negeri—menjamin kecepatan penyidikan dan keberhasilan <GlossaryTerm word="OTT">Operasi Tangkap Tangan (OTT)</GlossaryTerm>.
              </p>
            </motion.div>

            {/* Kewenangan 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '24px',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: '0 4px 12px rgba(45,37,36,0.02)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🚫</div>
              <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-primary)' }}>
                Tidak Bisa Menerbitkan <GlossaryTerm word="SP3">SP3</GlossaryTerm>
              </h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Sejak berdirinya, KPK dilarang keras menghentikan proses penyidikan atau menerbitkan <GlossaryTerm word="SP3">SP3</GlossaryTerm>. Setiap tersangka yang diumumkan KPK wajib dibawa hingga persidangan, mencegah celah penyuapan di bawah meja.
              </p>
            </motion.div>

            {/* Kewenangan 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '24px',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: '0 4px 12px rgba(45,37,36,0.02)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚡</div>
              <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-primary)' }}>
                Ambil Alih Kasus (Supervisi)
              </h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                KPK berhak sepenuhnya mengambil alih penyelidikan korupsi yang sedang ditangani oleh Kepolisian atau Kejaksaan Agung apabila penanganannya berlarut-larut atau diduga mengandung konflik kepentingan.
              </p>
            </motion.div>
          </div>
        </div>

        {/* GRAFIK KASUS KPK (CSS Bar chart) */}
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
          <BarChart />
        </motion.div>

        {/* SUB-SECTION KASUS KPK */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Dokumentasi Sejarah
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginTop: '8px' }}>
              Kasus Korupsi Terbesar yang Ditangani KPK
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px'
            }}
          >
            {kasusKPK.map((kasus) => (
              <div key={kasus.id}>
                <KasusCard data={kasus} type="kpk" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 576px) {
          .struct-level-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
