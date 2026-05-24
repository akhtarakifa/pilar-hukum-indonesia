# Assets Images

Struktur folder untuk menyimpan semua gambar website dalam format WebP.

## Struktur Folder

```
public/images/
├── hero/          # Gambar untuk Hero Section
├── tim/           # Foto-foto anggota tim
├── kpk/           # Gambar untuk KPK Section
└── mk/            # Gambar untuk MK Section
```

## Panduan Penggunaan

### 1. Hero Section (`/hero`)
- Simpan gambar hero section di sini
- Format: WebP
- Contoh: `hero-banner.webp`

### 2. Tim Section (`/tim`)
- Simpan foto-foto anggota tim di sini
- Format: WebP
- Naming convention: `nama-anggota.webp` atau `tim-1.webp`, `tim-2.webp`, `tim-3.webp`
- Ukuran rekomendasi: 400x400px (untuk lingkaran avatar)

### 3. KPK Section (`/kpk`)
- Simpan gambar banner/ilustrasi KPK di sini
- Format: WebP
- Contoh: `kpk-banner.webp`

### 4. MK Section (`/mk`)
- Simpan gambar banner/ilustrasi MK di sini
- Format: WebP
- Contoh: `mk-banner.webp`

## Cara Menggunakan di Komponen

```jsx
// Contoh di TimSection.jsx
<img src="/images/tim/nama-anggota.webp" alt="Nama Anggota" />

// Contoh di HeroSection.jsx
<img src="/images/hero/hero-banner.webp" alt="Hero Banner" />

// Contoh di KPKSection.jsx
<img src="/images/kpk/kpk-banner.webp" alt="KPK Banner" />

// Contoh di MKSection.jsx
<img src="/images/mk/mk-banner.webp" alt="MK Banner" />
```

## Format WebP

WebP adalah format gambar modern yang lebih efisien dari PNG/JPG:
- Ukuran file lebih kecil (20-30% lebih kecil)
- Kualitas lebih baik
- Didukung oleh semua browser modern

Untuk convert gambar ke WebP, gunakan:
- Online: https://convertio.co/webp/
- CLI: `cwebp input.jpg -o output.webp`
