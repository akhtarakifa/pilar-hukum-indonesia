# CLAUDE.md — Pilar Hukum Indonesia
> Panduan permanen untuk AI IDE dalam membangun website React + Vite.
> File ini dibaca otomatis di setiap sesi — jangan hapus.

---

## 1. Identitas Proyek

| Field              | Isi                                                            |
| ------------------ | -------------------------------------------------------------- |
| **Nama Proyek**    | Pilar Hukum Indonesia                                          |
| **Topik**          | Pembentukan KPK dan Mahkamah Konstitusi di Era Reformasi       |
| **Framework**      | React + Vite                                                   |
| **Animasi**        | Motion (Framer Motion) — `motion/react`                        |
| **Styling**        | CSS custom properties (token-based), tanpa Tailwind            |
| **Target Audiens** | Pelajar SMA/SMK, Guru                                          |
| **Tujuan Website** | Tugas sekolah — website statis edukasi sejarah hukum Indonesia |

---

## 2. Palet Warna (Design Tokens)

Definisikan semua token di `src/index.css` dalam `:root`.
Jangan pernah hardcode nilai warna di JSX atau CSS — selalu pakai token.

```css
:root {
  /* Primary */
  --color-primary:     #721818;
  --color-accent:      #2d2524;

  /* Background */
  --color-background:  #fbf9f6;
  --color-surface:     #ffffff;
  --color-surface-alt: #f2ece2;

  /* Text */
  --color-text:        #211c1b;
  --color-text-muted:  #6e6462;

  /* Border */
  --color-border:      #e1d9ce;

  /* Font families */
  --font-heading: 'Lora', Georgia, serif;
  --font-body:    'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;

  /* Navbar height — dipakai untuk offset scroll */
  --navbar-height: 68px;
}
```

**Aturan penggunaan token:**
- `--color-primary` → judul, badge, border-left kartu, garis divider, tombol CTA
- `--color-accent` → hover, active, pressed
- Section selang-seling antara `--color-background` dan `--color-surface`
- `--color-surface-alt` → kutipan, highlight historis, tooltip glosarium
- Jangan pakai `--color-primary` di area luas — hanya focal point

---

## 3. Tipografi

```css
h1, h2, h3, h4 { font-family: var(--font-heading); }
body, p, span   { font-family: var(--font-body); font-size: 16px; line-height: 1.7; }
.badge, .mono   { font-family: var(--font-mono); }
```

Google Fonts — pasang di `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 4. SEO & Meta Tags

Pasang di `index.html` dalam `<head>`:

```html
<title>Pilar Hukum Indonesia — KPK dan Mahkamah Konstitusi</title>
<meta name="description" content="Website edukasi tentang pembentukan KPK dan Mahkamah Konstitusi sebagai pilar hukum Indonesia di Era Reformasi 1998. Disusun oleh siswa Kelas XI SIJA 1, SMK Negeri 7 Semarang.">
<meta name="keywords" content="KPK, Mahkamah Konstitusi, Reformasi Indonesia, hukum Indonesia, pemberantasan korupsi">
<meta name="author" content="Kelas XI SIJA 1 — SMK Negeri 7 Semarang">

<!-- Open Graph -->
<meta property="og:title" content="Pilar Hukum Indonesia — KPK dan Mahkamah Konstitusi">
<meta property="og:description" content="Website edukasi sejarah hukum Indonesia di Era Reformasi.">
<meta property="og:type" content="website">
<meta property="og:locale" content="id_ID">

<!-- Favicon (ganti manual) -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">

<!-- Smooth scroll global -->
<style>html { scroll-behavior: smooth; }</style>
```

---

## 5. Navbar — Section ID, Mapping, dan Offset

### Section ID

| Navbar Link           | Section ID    | Komponen           |
| --------------------- | ------------- | ------------------ |
| Pengantar             | `#pengantar`  | PengantarSection   |
| KPK                   | `#kpk`        | KPKSection         |
| Mahkamah Konstitusi   | `#mk`         | MKSection          |
| Dampak                | `#dampak`     | DampakSection      |
| Tim Kami              | `#tim`        | TimSection         |

### Offset Scroll

```css
section[id] {
  scroll-margin-top: var(--navbar-height);
}
```

### Perilaku Navbar

```
- Default (di hero): background transparent, teks putih, tanpa shadow
- Setelah scroll > 80px: background var(--color-background),
  teks var(--color-text), box-shadow 0 1px 12px rgba(0,0,0,0.08)
- Tinggi: 68px
- Logo kiri: teks "Pilar Hukum" — Lora bold
- Link kanan: desktop horizontal | mobile hamburger
```

```jsx
const { scrollY } = useScroll()
const navBg     = useTransform(scrollY, [0, 80], ['transparent', 'var(--color-background)'])
const navShadow = useTransform(scrollY, [0, 80], ['none', '0 1px 12px rgba(0,0,0,0.08)'])
const navColor  = useTransform(scrollY, [0, 80], ['#ffffff', 'var(--color-text)'])
```

---

## 6. Mobile Navbar — Hamburger + Fullscreen Overlay

```
- < 768px: tampilkan tombol hamburger di kanan navbar
- Saat diklik: overlay fullscreen background rgba(45,37,36,0.97)
- Link navigasi di tengah layar (center vertikal & horizontal)
- Font: Lora bold 2rem, warna #fbf9f6, hover → #721818
- Tombol close (×) di kanan atas overlay
- Saat link diklik: overlay tutup, scroll ke section
```

```jsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      className="mobile-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <motion.ul
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
        }}
      >
        {navLinks.map(link => (
          <motion.li
            key={link.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show:   { opacity: 1, y: 0, transition: { duration: 0.4 } }
            }}
          >
            <a href={link.href} onClick={() => setIsOpen(false)}>{link.label}</a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )}
</AnimatePresence>
```

```css
.mobile-overlay {
  position: fixed; inset: 0; z-index: 999;
  background: rgba(45, 37, 36, 0.97);
  display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 2rem;
}
.mobile-overlay a {
  font-family: var(--font-heading);
  font-size: 2rem; font-weight: 700;
  color: var(--color-background); text-decoration: none;
}
.mobile-overlay a:hover { color: var(--color-primary); }
```

---

## 7. Loading Screen

```
Durasi: 2.2 detik, lalu auto-dismiss
Background: #2d2524
Di tengah layar:
  1. "PILAR HUKUM" — Lora bold, #fbf9f6
  2. Garis #721818 — animate width 0 → 200px
  3. "KPK · MAHKAMAH KONSTITUSI" — Plus Jakarta Sans, letter-spacing lebar, #6e6462
Progress bar bawah: #721818, 0% → 100% selama 2 detik
```

```jsx
// LoadingScreen.jsx
export default function LoadingScreen() {
  return (
    <motion.div className="loading-screen"
      exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: 'easeIn' }}>
      <div className="loading-content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}>
          PILAR HUKUM
        </motion.h1>
        <motion.div className="loading-line"
          initial={{ width: 0 }} animate={{ width: 200 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }} />
        <motion.p className="loading-sub"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}>
          KPK · MAHKAMAH KONSTITUSI
        </motion.p>
      </div>
      <motion.div className="loading-progress"
        initial={{ width: '0%' }} animate={{ width: '100%' }}
        transition={{ duration: 2, ease: 'linear' }} />
    </motion.div>
  )
}

// App.jsx
const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
  const t = setTimeout(() => setIsLoading(false), 2200)
  return () => clearTimeout(t)
}, [])
// Wrap dengan <AnimatePresence mode="wait">
```

---

## 8. Foto & Aset

### Spesifikasi Foto
```
Format    : WebP, JPG sebagai fallback
Kasus     : 800 × 450px (16:9), max 150KB, lazy loading
Banner    : 1440 × 500px untuk foto utama KPK dan MK
object-fit: cover untuk semua foto dalam card
```

### Daftar File Aset
```
src/assets/images/
├── hero-kpk.jpg
├── hero-mk.jpg
├── kpk-main.jpg          (1440×500px)
├── mk-main.jpg           (1440×500px)
├── kasus-kpk-1.jpg       Setya Novanto / e-KTP
├── kasus-kpk-2.jpg       Anas Urbaningrum / Hambalang
├── kasus-kpk-3.jpg       Akil Mochtar OTT
├── kasus-kpk-4.jpg       Bank Century
├── kasus-kpk-5.jpg       BLBI
├── kasus-mk-1.jpg        Sidang UU SDA
├── kasus-mk-2.jpg        Demo/sidang UU Cipta Kerja
├── kasus-mk-3.jpg        Kebebasan pers / pasal hoax
├── kasus-mk-4.jpg        Sidang batas usia capres 2023
└── kasus-mk-5.jpg        UU ITE / kebebasan berpendapat
```

### Komponen Skeleton
```jsx
// ImageWithSkeleton.jsx
export default function ImageWithSkeleton({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`img-wrapper ${className}`} style={{ position: 'relative' }}>
      {!loaded && (
        <motion.div className="skeleton"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, var(--color-surface-alt) 25%, var(--color-border) 50%, var(--color-surface-alt) 75%)',
          }} />
      )}
      <img src={src} alt={alt} loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s', width: '100%' }} />
    </div>
  )
}
```

---

## 9. Struktur Data

### src/data/statistik.js
```js
// Angka statistik untuk hero counter-up
export const statistikHero = [
  { angka: 6000, satuan: '+', label: 'Kasus ditangani KPK', suffix: '' },
  { angka: 900,  satuan: '+', label: 'UU diuji MK sejak 2003', suffix: '' },
  { angka: 25,   satuan: '',  label: 'Tahun perjalanan dua lembaga', suffix: ' tahun' },
  { angka: 1998, satuan: '',  label: 'Tahun Reformasi dimulai', suffix: '' },
]
```

### src/data/timelineReformasi.js
```js
// Timeline Reformasi untuk Section Pengantar
export const timelineReformasi = [
  { tahun: 'Mei 1998',   keterangan: 'Soeharto mundur setelah 32 tahun berkuasa, Habibie naik' },
  { tahun: '1999',       keterangan: 'Pemilu pertama era Reformasi, Amendemen UUD 1945 tahap I' },
  { tahun: '2000–2001',  keterangan: 'Amendemen UUD 1945 tahap II & III, amanat pembentukan MK' },
  { tahun: '2001',       keterangan: 'Amendemen UUD 1945 tahap IV — MK resmi diamanatkan konstitusi' },
  { tahun: '2002',       keterangan: 'UU No. 30 Tahun 2002 disahkan — KPK secara hukum dibentuk' },
  { tahun: '2003',       keterangan: 'KPK & MK resmi berdiri dan beroperasi pada Agustus 2003' },
]
```

### src/data/kasusKPK.js
```js
export const kasusKPK = [
  {
    id: 1,
    judul: 'Korupsi e-KTP',
    tersangka: 'Setya Novanto (Ketua DPR RI)',
    tahun: 2017,
    kerugian: 'Rp 2,3 triliun',
    deskripsi: 'Setya Novanto terbukti menyalahgunakan kewenangannya meloloskan anggaran proyek e-KTP senilai Rp 5,9 triliun dengan penggelembungan dana 45% dari total anggaran.',
    kutipanVonis: '"Terdakwa terbukti secara sah dan meyakinkan melakukan tindak pidana korupsi." — Majelis Hakim Tipikor, 2018',
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://id.wikipedia.org/wiki/Korupsi_e-KTP',
    foto: '/src/assets/images/kasus-kpk-1.jpg',
  },
  {
    id: 2,
    judul: 'Korupsi Proyek Hambalang',
    tersangka: 'Anas Urbaningrum & Andi Mallarangeng',
    tahun: 2013,
    kerugian: 'Rp 706 miliar',
    deskripsi: 'KPK menetapkan Anas sebagai tersangka penerimaan gratifikasi proyek P3SON Hambalang. Anas divonis 8 tahun penjara.',
    kutipanVonis: '"Terdakwa Anas Urbaningrum terbukti menerima gratifikasi dan melakukan korupsi." — Hakim Tipikor, 2014',
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://nasional.kompas.com/read/2023/04/12/12262861/kilas-balik-kasus-anas-urbaningrum-korupsi-proyek-hambalang-hukuman',
    foto: '/src/assets/images/kasus-kpk-2.jpg',
  },
  {
    id: 3,
    judul: 'Suap Ketua MK Akil Mochtar',
    tersangka: 'M. Akil Mochtar (Ketua MK)',
    tahun: 2013,
    kerugian: 'Suap sengketa Pilkada',
    deskripsi: 'KPK menangkap Akil Mochtar melalui OTT di rumah dinasnya bersama anggota DPR setelah serah terima uang suap terkait sengketa Pilkada.',
    kutipanVonis: '"Terdakwa divonis penjara seumur hidup." — Hakim Tipikor, 2014',
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://www.liputan6.com/news/read/3026241/3-ketua-lembaga-tinggi-negara-yang-terjerat-kasus-korupsi',
    foto: '/src/assets/images/kasus-kpk-3.jpg',
  },
  {
    id: 4,
    judul: 'Bailout Bank Century',
    tersangka: 'Pejabat bank & penyelenggara negara',
    tahun: 2008,
    kerugian: 'Rp 6,7 triliun',
    deskripsi: 'Kasus bailout Bank Century melibatkan berbagai nama terkemuka di dunia politik dan perbankan Indonesia dengan kerugian negara Rp 6,7 triliun.',
    kutipanVonis: null,
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://fahum.umsu.ac.id/info/kasus-terbesar-yang-ditangani-oleh-kpk-di-indonesia/',
    foto: '/src/assets/images/kasus-kpk-4.jpg',
  },
  {
    id: 5,
    judul: 'BLBI (Bantuan Likuiditas Bank Indonesia)',
    tersangka: 'Pengusaha & pejabat pemerintah',
    tahun: '1998–2000an',
    kerugian: 'Ratusan triliun rupiah',
    deskripsi: 'Salah satu kasus korupsi terbesar Indonesia — pelepasan kewajiban utang ratusan triliun kepada bank bermasalah pada krisis moneter 1998.',
    kutipanVonis: null,
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://fahum.umsu.ac.id/info/kasus-terbesar-yang-ditangani-oleh-kpk-di-indonesia/',
    foto: '/src/assets/images/kasus-kpk-5.jpg',
  },
]
```

### src/data/kasusMK.js
```js
export const kasusMK = [
  {
    id: 1,
    judul: 'Pembatalan UU Sumber Daya Air',
    nomorPutusan: 'No. 85/PUU-XI/2013',
    tahun: 2013,
    hasil: 'MK membatalkan UU No. 7 Tahun 2004 karena membuka peluang privatisasi air yang merugikan hak rakyat atas sumber daya alam vital.',
    amarPutusan: '"Undang-Undang Nomor 7 Tahun 2004 tentang Sumber Daya Air bertentangan dengan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 dan tidak mempunyai kekuatan hukum mengikat."',
    dampakLangsung: 'UU No. 7/2004 dicabut. Pengelolaan air kembali mengacu UU No. 11/1974 sampai UU baru dibentuk.',
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://journal.unilak.ac.id/index.php/nia/article/download/27395/7715',
    foto: '/src/assets/images/kasus-mk-1.jpg',
  },
  {
    id: 2,
    judul: 'UU Cipta Kerja Inkonstitusional Bersyarat',
    nomorPutusan: 'No. 91/PUU-XVIII/2020',
    tahun: 2021,
    hasil: 'MK menyatakan UU Cipta Kerja cacat formil dan inkonstitusional bersyarat — harus diperbaiki dalam 2 tahun atau gugur permanen.',
    amarPutusan: '"Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja... bertentangan dengan Undang-Undang Dasar... dan tidak mempunyai kekuatan hukum mengikat secara bersyarat."',
    dampakLangsung: 'Pemerintah wajib merevisi UU Cipta Kerja. Peraturan turunan dinyatakan masih berlaku sementara.',
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://www.cnnindonesia.com/nasional/20211125204418-12-726228/penjelasan-ahli-soal-putusan-mk-uu-ciptaker-inkonstitusional-bersyarat',
    foto: '/src/assets/images/kasus-mk-2.jpg',
  },
  {
    id: 3,
    judul: 'Pembatalan Pasal Berita Bohong',
    nomorPutusan: 'UU No. 1/1946 Pasal 14 & 15',
    tahun: 2024,
    hasil: 'MK membatalkan pasal berita bohong karena ambigu, tidak memiliki parameter jelas, dan membatasi hak konstitusional warga untuk berpendapat.',
    amarPutusan: '"Pasal 14 dan 15 Undang-Undang Nomor 1 Tahun 1946 bertentangan dengan UUD 1945 dan tidak mempunyai kekuatan hukum mengikat."',
    dampakLangsung: 'Pasal berita bohong tidak lagi dapat digunakan sebagai dasar hukum penuntutan warga negara.',
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://aji.or.id/informasi/mahkamah-konstitusi-indonesia-batalkan-pasal-berita-bohong-dan-pencemaran-nama-baik-di',
    foto: '/src/assets/images/kasus-mk-3.jpg',
  },
  {
    id: 4,
    judul: 'Batas Usia Capres/Cawapres',
    nomorPutusan: 'Pasal 169 huruf q UU Pemilu',
    tahun: 2023,
    hasil: 'MK mengabulkan sebagian — kandidat di bawah 40 tahun dapat maju capres/cawapres jika berpengalaman sebagai kepala daerah terpilih.',
    amarPutusan: '"...atau pernah/sedang menduduki jabatan yang dipilih melalui pemilihan umum termasuk pemilihan kepala daerah."',
    dampakLangsung: 'Putusan berdampak langsung pada Pemilu 2024 — membuka jalan bagi kandidat muda berpengalaman.',
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://pajak.go.id/en/node/101746',
    foto: '/src/assets/images/kasus-mk-4.jpg',
  },
  {
    id: 5,
    judul: 'Pembatasan Pelapor Pencemaran Nama Baik (UU ITE)',
    nomorPutusan: 'No. 105/PUU-XXII/2024',
    tahun: 2025,
    hasil: 'MK menyatakan hanya individu yang dapat melaporkan pencemaran nama baik — lembaga pemerintah dan korporasi tidak bisa mengadukan.',
    amarPutusan: '"Frasa 'setiap orang' dalam pasal pencemaran nama baik UU ITE harus dimaknai sebagai orang perorangan, bukan badan hukum."',
    dampakLangsung: 'Lembaga negara dan perusahaan tidak lagi bisa menggunakan UU ITE untuk membungkam kritik publik.',
    video: 'https://www.youtube.com/embed/GANTI_ID_VIDEO',
    sumber: 'https://www.amnesty.id/kabar-terbaru/siaran-pers/putusan-mk-jadi-momentum-revisi-menyeluruh-pasal-pasal-bermasalah-uu-ite/04/2025/',
    foto: '/src/assets/images/kasus-mk-5.jpg',
  },
]
```

### src/data/glosarium.js
```js
// Tooltip glosarium — muncul saat kata kunci di-hover di dalam teks
export const glosarium = [
  { kata: 'Judicial Review',    arti: 'Pengujian undang-undang terhadap konstitusi oleh MK.' },
  { kata: 'OTT',                arti: 'Operasi Tangkap Tangan — penangkapan langsung saat tindak pidana berlangsung.' },
  { kata: 'Gratifikasi',        arti: 'Pemberian hadiah atau keuntungan kepada pejabat negara yang berhubungan dengan jabatannya.' },
  { kata: 'Amar Putusan',       arti: 'Bagian akhir putusan pengadilan yang berisi keputusan resmi hakim.' },
  { kata: 'Inkonstitusional',   arti: 'Bertentangan dengan UUD 1945 — tidak sah secara konstitusi.' },
  { kata: 'KKN',                arti: 'Korupsi, Kolusi, dan Nepotisme — tiga bentuk penyalahgunaan kekuasaan.' },
  { kata: 'Amendemen',          arti: 'Perubahan resmi terhadap isi undang-undang dasar suatu negara.' },
  { kata: 'Independen',         arti: 'Bebas dari pengaruh atau intervensi kekuasaan mana pun.' },
  { kata: 'SP3',                arti: 'Surat Perintah Penghentian Penyidikan — tidak bisa dikeluarkan KPK.' },
  { kata: 'Tipikor',            arti: 'Tindak Pidana Korupsi — jenis kejahatan yang ditangani pengadilan khusus.' },
]
```

### src/data/statistikKPK.js
```js
// Data grafik kasus KPK per tahun (untuk bar chart)
export const grafikKasusKPK = [
  { tahun: 2004, kasus: 2 },
  { tahun: 2005, kasus: 19 },
  { tahun: 2006, kasus: 27 },
  { tahun: 2007, kasus: 19 },
  { tahun: 2008, kasus: 47 },
  { tahun: 2009, kasus: 37 },
  { tahun: 2010, kasus: 40 },
  { tahun: 2011, kasus: 114 },
  { tahun: 2012, kasus: 49 },
  { tahun: 2013, kasus: 70 },
  { tahun: 2014, kasus: 56 },
  { tahun: 2015, kasus: 57 },
  { tahun: 2016, kasus: 99 },
  { tahun: 2017, kasus: 121 },
  { tahun: 2018, kasus: 199 },
  { tahun: 2019, kasus: 197 },
  { tahun: 2020, kasus: 109 },
  { tahun: 2021, kasus: 105 },
  { tahun: 2022, kasus: 112 },
  { tahun: 2023, kasus: 94 },
]
```

### src/data/perbandinganMKvMA.js
```js
// Data tabel perbandingan MK vs MA
export const perbandinganMKMA = [
  { aspek: 'Kepanjangan',     mk: 'Mahkamah Konstitusi',              ma: 'Mahkamah Agung' },
  { aspek: 'Berdiri',         mk: '15 Agustus 2003',                  ma: '1945 (sejak kemerdekaan)' },
  { aspek: 'Jumlah Hakim',    mk: '9 hakim konstitusi',               ma: ''51 hakim agung' },
  { aspek: 'Fokus Perkara',   mk: 'Konstitusi & hak dasar',           ma: 'Perkara kasasi & pidana umum' },
  { aspek: 'Kewenangan Utama',mk: 'Menguji UU terhadap UUD 1945',     ma: 'Peradilan tertinggi perkara umum' },
  { aspek: 'Siapa yang Bisa Mengajukan', mk: 'Warga negara, lembaga negara, parpol', ma: 'Pihak berperkara di pengadilan' },
  { aspek: 'Sifat Putusan',   mk: 'Final dan mengikat (erga omnes)',  ma: 'Final untuk pihak berperkara' },
  { aspek: 'Dasar Hukum',     mk: 'Pasal 24C UUD 1945',              ma: 'Pasal 24A UUD 1945' },
]
```

### src/data/kuisData.js
```js
// Data kuis interaktif
export const soalKuis = [
  {
    id: 1,
    soal: 'KPK dibentuk berdasarkan Undang-Undang Nomor...',
    pilihan: ['UU No. 28/1999', 'UU No. 30/2002', 'UU No. 31/1999', 'UU No. 20/2001'],
    jawaban: 1,
    penjelasan: 'KPK dibentuk berdasarkan UU No. 30 Tahun 2002 tentang Komisi Pemberantasan Tindak Pidana Korupsi pada masa Presiden Megawati.',
  },
  {
    id: 2,
    soal: 'Berapa jumlah Hakim Konstitusi yang duduk di Mahkamah Konstitusi?',
    pilihan: ['5 hakim', '7 hakim', '9 hakim', '11 hakim'],
    jawaban: 2,
    penjelasan: 'MK terdiri dari 9 hakim konstitusi — 3 diajukan MA, 3 diajukan DPR, dan 3 diajukan Presiden.',
  },
  {
    id: 3,
    soal: 'Mahkamah Konstitusi Indonesia resmi berdiri dan mulai beroperasi pada...',
    pilihan: ['13 Agustus 2003', '15 Agustus 2003', '17 Agustus 2003', '1 Oktober 2003'],
    jawaban: 1,
    penjelasan: 'MK diresmikan 13 Agustus 2003 dan mulai beroperasi pada 15 Agustus 2003.',
  },
  {
    id: 4,
    soal: 'Kewenangan KPK yang TIDAK dimiliki oleh Kepolisian dan Kejaksaan adalah...',
    pilihan: [
      'Melakukan penuntutan',
      'Melakukan penyelidikan',
      'Menerbitkan SP3 (Surat Penghentian Penyidikan)',
      'Menyadap tanpa izin pengadilan',
    ],
    jawaban: 3,
    penjelasan: 'KPK memiliki kewenangan luar biasa untuk menyadap tanpa izin pengadilan, dan tidak dapat mengeluarkan SP3.',
  },
  {
    id: 5,
    soal: 'Putusan MK yang menyatakan UU Cipta Kerja "inkonstitusional bersyarat" keluar pada...',
    pilihan: ['25 November 2020', '25 November 2021', '25 November 2022', '25 Maret 2021'],
    jawaban: 1,
    penjelasan: 'MK mengeluarkan putusan No. 91/PUU-XVIII/2020 pada 25 November 2021 yang menyatakan UU Cipta Kerja inkonstitusional bersyarat.',
  },
]
```

---

## 10. Layout & Animasi Tiap Section

### Section 1 — Hero (`id="hero"`)

```
Background : Split visual — kiri hero-kpk.jpg, kanan hero-mk.jpg
             overlay dark gradient opacity 0.60
             Fallback: gradien #721818 → #2d2524

Teks di tengah (stagger motion):
  1. Label kecil  "Era Reformasi Indonesia · Landasan Kelembagaan"
  2. Judul utama  "Pilar Hukum Indonesia" — Lora bold besar, #ffffff
  3. Subjudul     "KPK dan Mahkamah Konstitusi" — Lora italic, putih 85%
  4. Garis tipis  #f2ece2, lebar 60px, center
  5. Scroll indicator panah ke bawah

STATISTIK COUNTER (di bawah hero, sebelum section berikutnya):
  4 angka dalam satu baris dari data statistikHero[]:
  - 6.000+ Kasus KPK
  - 900+ UU diuji MK
  - 25 Tahun perjalanan
  - 1998 Tahun Reformasi
  Animasi: counter-up saat masuk viewport (useMotionValue + animate)
  Background: var(--color-accent) #2d2524, teks #fbf9f6

Motion hero:
  staggerChildren: 0.2, y 20→0, opacity 0→1, ease easeOut
```

---

### Section 2 — Pengantar + Konteks (`id="pengantar"`)

```
Background : var(--color-surface) #ffffff

BAGIAN A — Kata Pengantar
  Satu kolom tengah, max-width 720px, font Lora 18–20px
  Garis divider #721818 di atas teks

BAGIAN B — Timeline Reformasi 1998 (BARU)
  Judul: "Perjalanan Menuju Reformasi"
  Label: "Kronologi"
  Timeline horizontal (desktop) / vertikal (mobile)
  6 titik dari data timelineReformasi[]
  Tiap titik: tahun (JetBrains Mono #721818) + keterangan
  Animasi: titik muncul satu per satu stagger dari kiri

BAGIAN C — Dua Kartu Konteks
  "Korupsi yang Mengakar" | "Konstitusi Tanpa Penjaga"
  border-left 3px solid #721818, ikon SVG

Motion:
  Pengantar: y 40→0, opacity 0→1
  Timeline: staggerChildren 0.15 tiap titik
  Kartu: x -50→0 dan x 50→0
```

---

### Section 3 — KPK (`id="kpk"`)

```
Background : var(--color-background) #fbf9f6

FOTO BANNER KPK:
  <ImageWithSkeleton src="kpk-main.jpg" />
  Full-width 300px, object-fit cover, overlay #721818 15%

KONTEN LEMBAGA — dua kolom:
  Kiri:  Timeline vertikal dari timelineReformasi subset KPK
  Kanan: Badge + Latar Belakang + Tujuan + Sifat (highlight box) + Tugas Pokok

STRUKTUR ORGANISASI KPK (BARU):
  Infografis sederhana bagan organisasi:
  ┌─────────────────────────────────┐
  │      PIMPINAN KPK (5 orang)     │
  ├──────────────┬──────────────────┤
  │ Dewan        │  Deputi-Deputi   │
  │ Pengawas     │  (Penindakan,    │
  │ (5 orang)    │   Pencegahan,    │
  │              │   PIPM, dll)     │
  └──────────────┴──────────────────┘

KEWENANGAN LUAR BIASA KPK (BARU):
  3 kartu highlight:
  1. Sadap Tanpa Izin Pengadilan
  2. Tidak Bisa Terbitkan SP3
  3. Ambil Alih Kasus dari Polri/Kejaksaan

GRAFIK KASUS KPK PER TAHUN (BARU):
  Bar chart sederhana dari data grafikKasusKPK[]
  Sumbu X: tahun 2004–2023
  Sumbu Y: jumlah kasus
  Implementasi: CSS bar chart murni atau recharts ringan
  Judul: "Tren Penanganan Kasus KPK (2004–2023)"

SUB-SECTION KASUS KPK:
  Judul: "Kasus Besar yang Ditangani KPK"
  Grid 5 kartu dari kasusKPK[]
  Tiap kartu: foto (skeleton) + badge tahun + judul + tersangka +
              kerugian + deskripsi + kutipanVonis (jika ada) +
              embed video YouTube + link sumber

Motion:
  Bagan org: fade-in tiap level stagger
  Grafik bar: tiap batang scale-up dari bawah stagger
  Kartu kasus: staggerChildren 0.12, y 30→0
  Hover kartu: whileHover={{ y:-6 }}, spring 300
```

---

### Section 4 — MK (`id="mk"`)

```
Background : var(--color-surface) #ffffff

FOTO BANNER MK:
  <ImageWithSkeleton src="mk-main.jpg" />
  Full-width 300px, object-fit cover, overlay #721818 15%

KONTEN LEMBAGA ATAS — Feature Split:
  Kiri:  Angka "15" sangat besar (Lora 96–120px, #721818 outline)
         "Agustus 2003" warna #2d2524
         Label kecil "Tanggal Resmi Berdiri" warna #6e6462
  Kanan: Teks latar belakang + badge "Amanat Amendemen UUD 1945"

KONTEN LEMBAGA BAWAH — dua kolom:
  Kiri: Dasar Hukum + Peran Strategis + Komposisi 9 Hakim (BARU):
        "3 diajukan MA · 3 diajukan DPR · 3 diajukan Presiden"
        Visualisasi 9 lingkaran kecil #721818 dibagi 3 kelompok

  Kanan: Accordion 5 wewenang MK

ALUR BERPERKARA DI MK (BARU):
  Infografis alur horizontal (steps):
  1. Pengajuan Permohonan
     Siapa: warga negara, lembaga negara, parpol
  2. Sidang Pendahuluan
     MK memeriksa kelengkapan & kelayakan permohonan
  3. Sidang Pemeriksaan
     Pemeriksaan saksi, ahli, dan alat bukti
  4. Sidang Putusan
     Putusan dibacakan — final dan mengikat (erga omnes)

TABEL PERBANDINGAN MK vs MA (BARU):
  Dari data perbandinganMKMA[]
  Tabel responsif dengan 3 kolom: Aspek | MK | MA
  Baris header background #721818, teks putih
  Baris alternating: #ffffff dan #fbf9f6

STATISTIK PUTUSAN MK (BARU):
  Donut chart sederhana:
  - Dikabulkan: ~30%
  - Ditolak: ~40%
  - Tidak Diterima: ~25%
  - Gugur/Tarik: ~5%
  Judul: "Statistik Putusan MK sejak 2003"
  CSS donut chart atau recharts

SUB-SECTION KASUS MK:
  Judul: "Putusan Penting Mahkamah Konstitusi"
  Grid 5 kartu dari kasusMK[]
  Tiap kartu: foto (skeleton) + badge nomor putusan + judul + tahun +
              hasil + kutipanAmarPutusan (blockquote) +
              dampakLangsung + embed video YouTube + link sumber

Motion:
  Angka counter-up: useMotionValue 0→15, durasi 1.5s
  Alur berperkara: stagger fade-in tiap step
  Tabel: fade-in baris per baris stagger
  Donut chart: rotate 0→360 + opacity
  Accordion: height 0→'auto', AnimatePresence
  Kartu kasus: stagger sama seperti KPK
```

---

### Section 5 — Dampak & Signifikansi (`id="dampak"`)

```
Background : var(--color-background) #fbf9f6

Judul: "Warisan Dua Lembaga untuk Indonesia"
Label kecil: "Dampak & Signifikansi" (#721818)

3 KARTU UTAMA:
  Pemberantasan Korupsi | Supremasi Konstitusi | Fondasi Demokrasi

GRAFIK CPI INDONESIA (BARU):
  Judul: "Indeks Persepsi Korupsi Indonesia 1995–2023"
  Sumber: Transparency International
  Line chart sederhana — menunjukkan tren dari skor rendah (1998)
  perlahan meningkat pasca berdirinya KPK
  Data titik penting: 1998 (skor terendah), 2003 (KPK berdiri),
  2023 (kondisi terkini)
  Implementasi: recharts LineChart atau SVG murni

KUTIPAN TOKOH (BARU):
  3 kutipan dari tokoh hukum/sejarah tentang KPK & MK:
  Format blockquote elegan — background #f2ece2, border-left #721818
  Contoh:
  "KPK adalah harapan baru pemberantasan korupsi yang selama ini
  menggerogoti bangsa." — (nama tokoh)

TANTANGAN KE DEPAN (BARU):
  Sub-section jujur tentang PR yang belum selesai:
  - Revisi UU KPK 2019 yang dikritik melemahkan independensi
  - Kasus penyiraman air keras Novel Baswedan (2017) belum tuntas
  - Integritas hakim MK pasca kasus Akil Mochtar
  - Indeks korupsi Indonesia masih di bawah rata-rata Asia Tenggara
  Layout: 4 item dengan ikon peringatan ⚠️ #721818

Motion:
  3 kartu: stagger y 50→0
  Grafik CPI: line draw animation (SVG stroke-dashoffset)
  Kutipan: fade-in satu per satu
  Tantangan: stagger dari kiri
```

---

### Section 6 — Glosarium Hukum (SECTION BARU)

```
Background : var(--color-surface) #ffffff

Judul: "Glosarium Hukum"
Label: "Panduan Istilah"
Sub-teks: "Istilah-istilah hukum yang perlu kamu tahu"

Layout: Grid 2 kolom, tiap item: kata (Lora bold #721818) + definisi
Data dari glosarium[]

TOOLTIP INLINE (implementasi):
  Saat kata kunci muncul di dalam paragraf manapun,
  bungkus dengan komponen <GlossaryTerm word="Judicial Review">
  Saat di-hover: tooltip muncul dengan definisi dari glosarium[]
  Style tooltip: background #2d2524, teks #fbf9f6, rounded, shadow

Motion:
  Grid item: stagger fade-in
  Tooltip: scale 0.9→1 + opacity 0→1, origin bottom
```

---

### Section 7 — Kuis Interaktif (SECTION BARU)

```
Background : var(--color-background) #fbf9f6

Judul: "Uji Pemahamanmu"
Label: "Kuis Interaktif"
Sub-teks: "5 soal tentang KPK dan Mahkamah Konstitusi"

ALUR KUIS:
  State: currentQuestion (0–4), score, answered, showResult
  Tampilan: satu soal per layar (bukan semua sekaligus)
  Progress bar di atas: lebar (currentQuestion/5 × 100%)

TIAP SOAL:
  Nomor soal + total (mis. "Soal 2 dari 5")
  Teks soal (Lora, besar)
  4 pilihan tombol — saat dipilih:
    Benar → border + background hijau ringan + ikon ✓
    Salah → border + background merah ringan + ikon ✗ +
            tampilkan jawaban benar
  Penjelasan singkat muncul di bawah setelah menjawab
  Tombol "Soal Berikutnya"

HASIL AKHIR:
  Skor X dari 5
  Pesan:
    5/5 → "Luar biasa! Kamu paham betul."
    3–4 → "Bagus! Tinggal sedikit lagi."
    < 3 → "Ayo baca lagi materinya!"
  Tombol "Ulangi Kuis"

Data dari soalKuis[]

Motion:
  Soal: x 50→0 saat pindah soal (slide dari kanan)
  Pilihan: stagger fade-in 0.05s
  Hasil: scale 0.8→1 + opacity 0→1
```

---

### Section 8 — Tim Kami (`id="tim"`)

```
Background : var(--color-surface) #ffffff

Judul: "Tim Penyusun"
Subjudul: "Kelas XI SIJA 1 — SMK Negeri 7 Semarang"

Grid 4–5 kartu:
  Avatar lingkaran inisial, background #721818, teks putih
  Nama (Lora bold), NIS (#6e6462)
  Badge peran (#f2ece2 bg, #721818 teks)

  1. [Nama] | [NIS] | Ketua / Peneliti
  2. [Nama] | [NIS] | Penulis Konten
  3. [Nama] | [NIS] | Desainer Website
  4. [Nama] | [NIS] | Editor & Pengumpul Data
  5. [Nama] | [NIS] | (opsional)

Motion: staggerChildren 0.1, y 40→0
```

---

### Section 9 — Sumber & Referensi (SECTION BARU)

```
Background : var(--color-surface-alt) #f2ece2

Judul: "Sumber & Referensi"
Label: "Daftar Pustaka"

Kategori referensi (accordion per kategori):

📄 Situs Resmi
  - kpk.go.id — Situs resmi KPK
  - mkri.id — Situs resmi Mahkamah Konstitusi

📰 Berita & Artikel
  - id.wikipedia.org/wiki/Korupsi_e-KTP
  - nasional.kompas.com (kasus Hambalang)
  - cnnindonesia.com (UU Cipta Kerja)
  - aji.or.id (pasal berita bohong)
  - liputan6.com (Akil Mochtar)
  - fahum.umsu.ac.id (BLBI, Bank Century)

📚 Jurnal & Akademik
  - journal.unilak.ac.id (UU SDA)
  - amnesty.id (UU ITE)

📊 Data & Statistik
  - Transparency International — CPI Index
  - pajak.go.id (batas usia capres)

Catatan: "Website ini dibuat untuk keperluan tugas sekolah.
Seluruh informasi bersumber dari referensi di atas."
```

---

### Footer

```
Background : var(--color-accent) #2d2524
Teks       : var(--color-background) #fbf9f6

Baris 1: "Pilar Hukum Indonesia · Tugas Sejarah Indonesia"
Baris 2: "Kelas XI SIJA 1 — SMK Negeri 7 Semarang · 2025"
```

---

## 11. Struktur Komponen React

```
src/
├── App.jsx
├── main.jsx
├── index.css
│
├── data/
│   ├── statistik.js
│   ├── timelineReformasi.js
│   ├── kasusKPK.js
│   ├── kasusMK.js
│   ├── glosarium.js
│   ├── statistikKPK.js
│   ├── perbandinganMKvMA.js
│   └── kuisData.js
│
├── assets/
│   └── images/
│
└── components/
    ├── LoadingScreen.jsx
    ├── NavBar.jsx
    ├── HeroSection.jsx        ← hero + statistik counter
    ├── PengantarSection.jsx   ← pengantar + timeline reformasi + 2 kartu
    ├── KPKSection.jsx         ← banner + lembaga + org + grafik + kasus
    ├── MKSection.jsx          ← banner + lembaga + alur + tabel + donut + kasus
    ├── DampakSection.jsx      ← 3 kartu + CPI + kutipan + tantangan
    ├── GlosariumSection.jsx   ← grid istilah + tooltip inline
    ├── KuisSection.jsx        ← kuis interaktif 5 soal
    ├── TimSection.jsx
    ├── ReferensiSection.jsx
    ├── FooterSection.jsx
    ├── BackToTop.jsx
    └── ui/
        ├── Badge.jsx
        ├── KasusCard.jsx      ← dipakai KPK & MK, props: data object
        ├── Timeline.jsx
        ├── Accordion.jsx
        ├── ImageWithSkeleton.jsx
        ├── GlossaryTerm.jsx   ← wrapper kata + tooltip
        ├── BarChart.jsx       ← grafik kasus KPK
        ├── DonutChart.jsx     ← statistik putusan MK
        └── LineChart.jsx      ← grafik CPI Indonesia
```

---

## 12. Navbar — Urutan Link (Diperbarui)

| Navbar Link           | Section ID       | Komponen           |
| --------------------- | ---------------- | ------------------ |
| Pengantar             | `#pengantar`     | PengantarSection   |
| KPK                   | `#kpk`           | KPKSection         |
| Mahkamah Konstitusi   | `#mk`            | MKSection          |
| Dampak                | `#dampak`        | DampakSection      |
| Glosarium             | `#glosarium`     | GlosariumSection   |
| Kuis                  | `#kuis`          | KuisSection        |
| Tim Kami              | `#tim`           | TimSection         |

> Mobile overlay: tampilkan semua link di atas, stagger masuk dari bawah

---

## 13. Filosofi Animasi — MAKSIMAL & DRAMATIS

> Website ini harus terasa hidup, sinematik, dan penuh energi.
> Setiap elemen yang bisa dianimasikan — HARUS dianimasikan.
> Tujuan: membuat pengunjung berdecak kagum sejak detik pertama.

### A. Custom Cursor

```jsx
// CustomCursor.jsx — ganti cursor default browser sepenuhnya
// Dua lapisan: dot kecil (ikut kursor tepat) + ring besar (lag/follow dengan delay)

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function CustomCursor() {
  const dotX   = useMotionValue(0)
  const dotY   = useMotionValue(0)
  const ringX  = useSpring(dotX, { stiffness: 80,  damping: 20 })
  const ringY  = useSpring(dotY, { stiffness: 80,  damping: 20 })

  useEffect(() => {
    const move = (e) => { dotX.set(e.clientX); dotY.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      {/* Dot kecil tepat di cursor */}
      <motion.div className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%',
          position: 'fixed', width: 8, height: 8, borderRadius: '50%',
          background: 'var(--color-primary)', zIndex: 9999, pointerEvents: 'none' }}
      />
      {/* Ring besar dengan lag */}
      <motion.div className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%',
          position: 'fixed', width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid var(--color-primary)', zIndex: 9998,
          pointerEvents: 'none', mixBlendMode: 'difference' }}
      />
    </>
  )
}

// Saat hover elemen interaktif (link, button, kartu):
// ring membesar: scale 2.5, background #721818 opacity 20%
// Tambahkan data-cursor="hover" di elemen, detect di CustomCursor
```

---

### B. Loading Screen — Sinematik

```
Durasi total: 3.5 detik (lebih lama, lebih dramatis)

URUTAN ANIMASI:
  0.0s  Background #2d2524 muncul
  0.2s  Garis horizontal #721818 dari tengah melebar ke kiri & kanan
        (scaleX 0→1, transformOrigin center, duration 0.8s)
  0.8s  Teks "PILAR" muncul dari bawah garis (y 60→0, opacity 0→1)
  1.1s  Teks "HUKUM" muncul dari atas garis (y -60→0, opacity 0→1)
  1.5s  Teks "INDONESIA" — tiap huruf muncul satu per satu stagger 0.04s
  2.0s  Sub-teks "KPK · MAHKAMAH KONSTITUSI" — letter-spacing 0→0.3em
        sekaligus opacity 0→1
  2.4s  Seluruh konten loading fade + scale down sedikit (scale 1→0.95, opacity 1→0)
  2.8s  Layar loading exit: clip-path dari rect penuh → collapse ke tengah
        clip-path: inset(0% 0%) → inset(50% 0%)
  3.2s  Konten utama masuk dengan curtain reveal dari atas

Progress bar: warna #721818, 0→100% selama 3 detik, di atas layar
```

```jsx
// Implementasi split text untuk "INDONESIA":
const letters = "INDONESIA".split("")
// {letters.map((l, i) => (
//   <motion.span key={i}
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay: 1.5 + i * 0.04, duration: 0.3 }}>
//     {l}
//   </motion.span>
// ))}
```

---

### C. Hero Section — Sinematik Penuh

```
PARALLAX SCROLL:
  - Background image bergerak lebih lambat dari scroll (y: 0 → -150px)
  - Teks bergerak lebih cepat dari scroll (y: 0 → 80px)
  - Implementasi: useScroll + useTransform di HeroSection

SPLIT TEXT JUDUL:
  "Pilar Hukum Indonesia" — tiap KATA muncul terpisah:
  "Pilar"     → dari kiri (x: -100 → 0)
  "Hukum"     → dari bawah (y: 80 → 0)
  "Indonesia" → dari kanan (x: 100 → 0)
  Semua dengan opacity 0→1, stagger 0.15s, spring bounce sedikit

GLITCH EFFECT PADA SUBJUDUL:
  "KPK dan Mahkamah Konstitusi" — saat muncul pertama kali,
  teks bergetar/glitch seolah sedang "loading" selama 0.6s
  lalu settle ke posisi normal
  Implementasi: keyframes CSS animation dengan translate random kecil

GARIS EMAS ANIMASI:
  Garis merah (#721818) di bawah judul:
  Muncul dari tengah, melebar ke kiri & kanan (scaleX 0→1)
  Kemudian ping/pulse sekali saat selesai

SCROLL INDICATOR:
  Panah ke bawah bounce terus-menerus + opacity berubah sesuai scroll
  (hilang saat user mulai scroll)

GRAIN/NOISE OVERLAY:
  Overlay noise texture tipis di atas hero yang bergerak/beranimasi
  dengan CSS animation — memberikan kesan film/sinematik

FLOATING ELEMENTS:
  2–3 bentuk geometris abstrak (lingkaran outline, garis diagonal)
  melayang perlahan dengan motion infinite + yoyo
  Warna #721818 opacity 15%
```

```jsx
// Parallax hero
const { scrollY } = useScroll()
const bgY   = useTransform(scrollY, [0, 600], [0, -150])
const textY = useTransform(scrollY, [0, 600], [0, 80])
const opacity = useTransform(scrollY, [0, 400], [1, 0])

// Floating element contoh:
<motion.div
  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
/>
```

---

### D. Navbar — Magnetic & Animated

```
MAGNETIC BUTTON:
  Tiap link navbar bereaksi terhadap posisi mouse di sekitarnya
  Link "menarik" ke arah kursor saat mouse mendekati dalam radius 60px
  Saat mouse keluar: spring kembali ke posisi semula

  // Implementasi per link:
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.25)  // tarik 25% dari jarak
    y.set(dy * 0.25)
  }

UNDERLINE ANIMASI:
  Saat hover, underline muncul dari kiri ke kanan (scaleX 0→1)
  Saat hover keluar, hilang dari kanan ke kiri (scaleX 1→0)
  transformOrigin berubah: masuk dari left, keluar dari right

LOGO SCRAMBLE:
  Saat logo navbar di-hover, teks "Pilar Hukum" berputar huruf acak
  selama 0.4s lalu settle ke teks asli (text scramble effect)
```

---

### E. Section Transitions — Curtain & Reveal

```
CLIP-PATH REVEAL:
  Tiap section masuk viewport dengan clip-path reveal:
  clip-path: inset(100% 0% 0% 0%) → inset(0% 0% 0% 0%)
  Efek seperti tirai yang turun dari atas
  Duration: 0.8s, ease: [0.76, 0, 0.24, 1] (cubic bezier dramatis)

SECTION BACKGROUND COLOR TRANSITION:
  Saat user scroll melewati batas antar section,
  background seluruh halaman smoothly transition warna
  (gunakan useScroll + useTransform untuk interpolasi warna)

SECTION TITLE — SPLIT CHAR:
  Tiap judul section: setiap KARAKTER muncul satu per satu
  stagger 0.03s, y 40→0, opacity 0→1
  Bungkus dengan komponen <SplitText text="Judul Section" />
```

```jsx
// SplitText.jsx — reusable
export default function SplitText({ text, className }) {
  return (
    <span className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {text.split("").map((char, i) => (
        <motion.span key={i}
          style={{ display: 'inline-block' }}
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03, duration: 0.4, ease: [0.76,0,0.24,1] }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}
// Pakai di semua judul section: <SplitText text="Pilar Hukum Indonesia" />
```

---

### F. Kartu — 3D Tilt & Magnetic

```
3D TILT ON HOVER:
  Tiap KasusCard & DampakCard bereaksi terhadap posisi mouse
  dengan efek rotasi 3D (perspective tilt)

  // KasusCard.jsx — tambahkan:
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5   // -0.5 to 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    rotateX.set(-y * 15)  // max 15deg tilt
    rotateY.set(x * 15)
  }
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  <motion.div
    ref={ref}
    style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
    onMouseMove={handleMouseMove}
    onMouseLeave={() => { rotateX.set(0); rotateY.set(0) }}
    whileHover={{ z: 30, scale: 1.03 }}
  >

SHINE EFFECT:
  Saat di-hover, highlight/shine bergerak mengikuti posisi mouse
  overlay gradient putih opacity 20% yang bergerak
  seperti cahaya memantul di permukaan kartu
```

---

### G. Timeline KPK — Scroll-Driven

```
DRAW LINE ANIMATION:
  Garis vertikal timeline digambar secara real-time mengikuti scroll
  Semakin user scroll ke bawah, garis semakin panjang
  Implementasi: SVG line dengan stroke-dashoffset linked ke scrollY

  const { scrollYProgress } = useScroll({ target: timelineRef })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  // <motion.line style={{ pathLength }} />

MILESTONE PULSE:
  Tiap titik milestone berdenyut (pulse/ping) saat pertama muncul:
  Lingkaran luar melebar dan fade out, lingkaran dalam tetap
  Seperti efek "ping" di Tailwind tapi dengan Motion

  <motion.div className="pulse-ring"
    initial={{ scale: 1, opacity: 0.7 }}
    animate={{ scale: 2.5, opacity: 0 }}
    transition={{ duration: 1.2, repeat: Infinity }}
  />
```

---

### H. Grafik & Data Visualisasi — Animated

```
BAR CHART (kasus KPK):
  Tiap batang tumbuh dari bawah (scaleY 0→1, transformOrigin bottom)
  stagger 0.05s antar batang
  Saat hover batang: tooltip muncul dengan scale spring
  Warna batang berubah saat hover: #721818 → #2d2524

DONUT CHART (statistik putusan MK):
  SVG donut: tiap segmen digambar dengan stroke-dashoffset animasi
  Muncul satu per satu searah jarum jam
  Label persentase counter-up saat chart selesai digambar

LINE CHART (CPI Indonesia):
  SVG path digambar dari kiri ke kanan (stroke-dashoffset)
  Duration 2s, ease easeInOut
  Titik data muncul satu per satu setelah garis melewatinya
  Tiap titik: pulse animation sekali saat muncul

COUNTER-UP STATISTIK HERO:
  Angka tidak langsung ke nilai akhir —
  melompat-lompat dulu di angka random sebelum settle (slot machine effect)
  Duration 2s per angka, stagger 0.3s antar angka
```

---

### I. Kuis Interaktif — Micro-animation

```
SOAL TRANSITION:
  Saat pindah soal: soal lama slide ke kiri + fade out
  Soal baru slide dari kanan + fade in
  Gunakan AnimatePresence dengan mode="wait"

PILIHAN JAWABAN:
  4 pilihan muncul stagger dari bawah (0.06s antar pilihan)
  Saat di-hover: scale 1.02 + border #721818 + background tipis
  Saat diklik (benar): background hijau + ikon ✓ bounce masuk
  Saat diklik (salah): shake animation kiri-kanan (x: 0,-8,8,-8,8,0)

  // Shake:
  animate={isWrong ? { x: [0,-8,8,-8,8,0] } : {}}
  transition={{ duration: 0.4, ease: 'easeInOut' }}

PROGRESS BAR:
  Tidak langsung melompat — spring animation ke nilai baru
  Warna berubah dari #721818 → hijau saat semua soal selesai

HASIL AKHIR:
  Skor muncul dengan counter-up + confetti animation
  (buat confetti manual dengan partikel Motion, bukan library external)
  Tiap partikel: warna random dari palet, physics gravity sederhana
```

---

### J. Scroll-Triggered Global

```
HORIZONTAL SCROLL SECTION (opsional, untuk kasus KPK/MK):
  Alih-alih grid vertikal, kartu kasus bisa di-scroll horizontal
  Saat section ini di-pin (scroll terkunci), konten bergerak horizontal
  Implementasi: useScroll + useTransform scrollY → x position
  Mirip efek di website award-winning

  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])
  <motion.div style={{ x }} className="cards-track">

STICKY SECTION HEADERS:
  Judul section (mis. "KPK") sticky di kiri/atas saat user scroll
  melewati konten section tersebut
  Teks berubah opacity dan scale mengikuti scroll progress

TEXT REVEAL DENGAN MASK:
  Paragraf penting: teks di-reveal dari kiri ke kanan dengan mask
  Seperti teks yang "ditulis" saat di-scroll
  Implementasi: clip-path rect yang melebar dari kiri

BACKGROUND PARALLAX NOISE:
  Noise/grain texture di seluruh halaman dengan CSS animation
  bergerak perlahan — memberikan kesan tekstur kertas bernyawa
```

---

### K. Page-Level Animations

```
SMOOTH PAGE ENTER (setelah loading):
  Konten tidak langsung muncul — curtain dari atas turun membuka halaman
  clip-path: inset(0 0 100% 0) → inset(0 0 0% 0), duration 0.8s

SCROLL PROGRESS INDICATOR:
  Bar tipis di paling atas halaman (fixed)
  Warna #721818, width mengikuti scroll progress 0→100%
  const { scrollYProgress } = useScroll()
  <motion.div style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} />

BACK TO TOP:
  Tombol tidak sekadar muncul — rotate masuk + scale spring
  Saat di-hover: berputar 360° + scale 1.1 (magnetic)
  Saat di-klik: halaman scroll ke atas dengan spring physics
```

---

### L. Glosarium — Tooltip Dramatis

```
TOOLTIP MASUK:
  Bukan fade biasa — muncul dari bawah kata dengan:
  y: 10→0, scale: 0.85→1, opacity: 0→1
  Dengan spring (stiffness: 200, damping: 15) — terasa "pop"

KATA KUNCI DI TEKS:
  Saat pertama kali masuk viewport, kata kunci di-highlight:
  Background sweep dari kiri ke kanan (#721818 opacity 15%)
  Seperti stabilo digital
  Implementasi: ::after pseudo-element dengan scaleX 0→1
```

---

## 14. Hal yang TIDAK Diinginkan

```
- Tidak pakai font Roboto atau Arial
- Tidak pakai tampilan seperti Wikipedia (terlalu padat, tidak ada whitespace)
- Tidak ada warna di luar token yang sudah didefinisikan
- Tidak ada border radius terlalu besar (bukan aplikasi mobile)
- Tidak ada library UI eksternal (MUI, Ant Design, dll)
- Tidak campur library animasi lain dengan Motion
- Tidak hardcode warna di JSX atau CSS — selalu pakai CSS custom properties
- Tidak ada animasi yang TIDAK ada tujuannya — setiap animasi harus
  mempertegas konten, bukan sekadar bergerak tanpa arti
```

---

## 14. Install Dependencies

```bash
npm install motion
# Jika pakai recharts untuk chart:
npm install recharts
```

Google Fonts via CDN di `index.html` — tidak perlu install `@fontsource`.

---

_CLAUDE.md — Panduan permanen proyek Pilar Hukum Indonesia._
_Kelas XI SIJA 1, SMK Negeri 7 Semarang._
