# Website Biodata Diri (Billiard Game Edition) - Nabila Revalia Andini

Website profil pribadi modern, interaktif, dan sepenuhnya responsif milik **Nabila Revalia Andini** dengan konsep visual **Game Billiard / 8-Ball Pool Tournament** yang dibangun menggunakan **HTML5**, **CSS3 (Canvas 2D Physics)**, dan **JavaScript**.

---

## 🎱 Fitur Spesial Edisi Game Billiard
1. **Interactive Billiard Mini-Game**: Meja biliar 2D interaktif langsung di website dengan fisika tabrakan elastis bola (*elastic collision*), pantulan bantalan karet (*cushion bounce*), 6 lubang (*pockets*), bidikan stik biliar (*drag to aim & shoot*), serta efek suara benturan bola menggunakan Web Audio API.
2. **Player HUD Stats**: Panel profil Player 1 lengkap dengan indikator Level 20, Akurasi Strategi, Fokus Konsistensi, dan Target Karir (PNS).
3. **Ikon Bola 3D Bola 1 - 12**: Seluruh data pribadi dan pendidikan dihiasi bola biliar 3D realistis berangka 1 sampai 12.
4. **Hobi & Minat**: Menonjolkan hobi bermain game biliar, eksplorasi teknologi, membaca buku, olahraga, fotografi, dan musik.

---

## 🎨 Tema & Palet Warna
- **Biru Tua (Navy)**: `#0A2540` — Header navbar, footer, teks judul
- **Biru Utama**: `#1E6FD9` — Tombol, link, ikon aktif, aksen
- **Biru Muda**: `#DCEBFF` — Latar belakang section bergantian
- **Putih**: `#FFFFFF` — Latar kartu utama, teks di atas latar gelap
- **Tipografi**: Google Fonts *Poppins*

---

## 📁 Struktur Berkas Proyek

```text
├── index.html              # Dokumen HTML utama (struktur halaman lengkap)
├── style.css               # Seluruh tata letak, warna, transisi, & media query responsif
├── script.js               # Interaktivitas: Hamburger menu, scrollspy, lightbox galeri, video toggle, back-to-top
└── assets/                 # Folder media foto dan video
    ├── PETUNJUK_ASSETS.txt # Petunjuk ringkas pengisian media
    ├── foto_profil.svg     # Placeholder foto profil bawaan
    ├── rumah_depan.svg     # Placeholder tampak depan
    ├── rumah_belakang.svg  # Placeholder tampak belakang
    ├── rumah_kiri.svg      # Placeholder tampak samping kiri
    ├── rumah_kanan.svg     # Placeholder tampak samping kanan
    └── video_poster.svg    # Placeholder poster/thumbnail video
```

---

## 📸 Cara Menempatkan Foto & Video ke dalam Folder `assets/`

Website ini sudah dilengkapi mekanisme otomatis (*fallback*). Ketika Anda membuka `index.html` pertama kali, website sudah menampilkan gambar ilustrasi placeholder bertema biru yang rapi dan estetik.

Untuk menggantinya dengan foto dan video asli Anda:

1. **Foto Profil Bulat**:
   - Siapkan foto profil Anda (disarankan rasio persegi 1:1, misal 500x500 px).
   - Beri nama: `foto_profil.jpg`
   - Masukkan ke dalam folder `assets/`.

2. **Galeri Rumah (4 Sisi)**:
   - Siapkan foto 4 sudut rumah Anda (disarankan format horizontal / landscape 4:3 atau 16:9).
   - Beri nama masing-masing:
     - `rumah_depan.jpg` (Tampak Depan)
     - `rumah_belakang.jpg` (Tampak Belakang)
     - `rumah_kiri.jpg` (Tampak Samping Kiri)
     - `rumah_kanan.jpg` (Tampak Samping Kanan)
   - Masukkan seluruh file tersebut ke dalam folder `assets/`.

3. **Video Profil**:
   - Siapkan video perkenalan dalam format MP4.
   - Beri nama: `nama_video.mp4` atau `video_profil.mp4`
   - Masukkan ke dalam folder `assets/`.
   - *(Opsi YouTube)*: Jika ingin menggunakan video dari YouTube, Anda tidak perlu menaruh video MP4. Cukup buka `index.html`, cari bagian `<iframe id="youtubeIframe">`, lalu ganti link `src` dengan link video YouTube Anda.

---

## 🚀 Cara Menjalankan Website
1. Cukup klik ganda (double-click) file `index.html` untuk langsung membukanya di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll.).
2. Atau jalankan melalui ekstensi *Live Server* di VS Code / Antigravity IDE jika ingin menikmati auto-reload saat mengedit kode.
