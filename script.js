/**
 * ==============================================================================
 * WEBSITE BIODATA DIRI (PERSONAL PROFILE) - JAVASCRIPT
 * Fitur:
 * 1. Hamburger Menu (Tampilan Mobile)
 * 2. Smooth Scroll & Navbar Offset
 * 3. ScrollSpy (Menandai Menu Navbar Aktif Sesuai Section)
 * 4. Galeri 4 Sisi Rumah & Lightbox Modal (Zoom, Prev, Next, Keyboard Control)
 * 5. Tab Pengalih Pemutar Video (Video Lokal MP4 / YouTube Iframe)
 * 6. Tombol Kembali ke Atas (Back to Top)
 * 7. Animasi Scroll Reveal (Fade In & Slide Up)
 * 8. Penanganan Formulir Kontak Interaktif
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------------------------
  // 1. HAMBURGER MENU (MOBILE NAVIGATION)
  // ----------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    // Buka / Tutup menu saat tombol hamburger diklik
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Tutup menu otomatis saat salah satu link diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Tutup menu jika user mengklik di luar area navbar
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // ----------------------------------------------------------------------------
  // 2. SCROLLSPY (MENANDAI MENU AKTIF DI NAVBAR SAAT DI-SCROLL)
  // ----------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navbar = document.getElementById('navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 75;

  function handleScrollSpy() {
    const scrollPosition = window.scrollY + navbarHeight + 50;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy(); // Inisialisasi awal saat halaman dimuat


  // ----------------------------------------------------------------------------
  // 3. GALERI 4 SISI RUMAH & LIGHTBOX MODAL INTERAKTIF
  // ----------------------------------------------------------------------------
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  // Data 4 Sisi Rumah
  const galleryData = [
    {
      title: 'Tampak Depan',
      caption: '',
      src: 'assets/rumah_depan.jpg',
      fallback: 'assets/rumah_depan.svg'
    },
    {
      title: 'Tampak Belakang',
      caption: '',
      src: 'assets/rumah_belakang.jpg',
      fallback: 'assets/rumah_belakang.svg'
    },
    {
      title: 'Tampak Samping Kiri',
      caption: '',
      src: 'assets/rumah_kiri.jpg',
      fallback: 'assets/rumah_kiri.svg'
    },
    {
      title: 'Tampak Samping Kanan',
      caption: '',
      src: 'assets/rumah_kanan.jpg',
      fallback: 'assets/rumah_kanan.svg'
    }
  ];

  let currentGalleryIndex = 0;

  // Fungsi memperbarui isi modal lightbox
  function updateLightbox(index) {
    currentGalleryIndex = index;
    const item = galleryData[currentGalleryIndex];

    // Coba memuat gambar asli, fallback ke SVG jika file jpg belum diletakkan
    lightboxImage.src = item.src;
    lightboxImage.onerror = () => {
      lightboxImage.onerror = null;
      lightboxImage.src = item.fallback;
    };

    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    if (lightboxCaption) {
      if (item.caption) {
        lightboxCaption.textContent = item.caption;
        lightboxCaption.style.display = 'block';
      } else {
        lightboxCaption.style.display = 'none';
      }
    }
    lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryData.length}`;
  }

  // Fungsi membuka lightbox
  function openLightbox(index) {
    updateLightbox(index);
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Kunci scroll halaman saat lightbox aktif
  }

  // Fungsi menutup lightbox
  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Pulihkan scroll halaman
  }

  // Navigasi foto sebelumnya
  function prevPhoto() {
    const newIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox(newIndex);
  }

  // Navigasi foto berikutnya
  function nextPhoto() {
    const newIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightbox(newIndex);
  }

  // Pasang event listener ke setiap kartu galeri
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.getAttribute('data-index'), 10) || 0;
      openLightbox(index);
    });
  });

  // Tombol navigasi lightbox
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevPhoto);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextPhoto);

  // Klik di luar kotak foto untuk menutup modal
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Kontrol Keyboard (Esc = tutup, Panah Kiri = Prev, Panah Kanan = Next)
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevPhoto();
    } else if (e.key === 'ArrowRight') {
      nextPhoto();
    }
  });


  // ----------------------------------------------------------------------------
  // 4. PENGALIH TAB VIDEO (VIDEO LOKAL MP4 VS YOUTUBE EMBED)
  // ----------------------------------------------------------------------------
  const btnTabLocal = document.getElementById('btnTabLocal');
  const btnTabYoutube = document.getElementById('btnTabYoutube');
  const localVideoContainer = document.getElementById('localVideoContainer');
  const youtubeVideoContainer = document.getElementById('youtubeVideoContainer');
  const mainVideoPlayer = document.getElementById('mainVideoPlayer');

  if (btnTabLocal && btnTabYoutube && localVideoContainer && youtubeVideoContainer) {
    // Mode Video Lokal
    btnTabLocal.addEventListener('click', () => {
      btnTabLocal.classList.add('active');
      btnTabYoutube.classList.remove('active');
      localVideoContainer.style.display = 'block';
      youtubeVideoContainer.style.display = 'none';
    });

    // Mode Video YouTube
    btnTabYoutube.addEventListener('click', () => {
      btnTabYoutube.classList.add('active');
      btnTabLocal.classList.remove('active');
      youtubeVideoContainer.style.display = 'block';
      localVideoContainer.style.display = 'none';

      // Jeda video lokal jika sedang diputar
      if (mainVideoPlayer && !mainVideoPlayer.paused) {
        mainVideoPlayer.pause();
      }
    });
  }


  // ----------------------------------------------------------------------------
  // 5. TOMBOL KEMBALI KE ATAS (BACK TO TOP)
  // ----------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ----------------------------------------------------------------------------
  // 6. ANIMASI FADE-IN SAAT SCROLL (INTERSECTION OBSERVER)
  // ----------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Lepas pengamatan setelah elemen muncul (fade-in 1x)
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback jika browser lawas belum mendukung IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }


  // ----------------------------------------------------------------------------
  // 7. FORMULIR KONTAK INTERAKTIF
  // ----------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const contactSuccessAlert = document.getElementById('contactSuccessAlert');
  const btnSubmitForm = document.getElementById('btnSubmitForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Mohon lengkapi seluruh kolom formulir sebelum mengirim pesan.');
        return;
      }

      // Animasi status pengiriman pada tombol
      const originalBtnHTML = btnSubmitForm.innerHTML;
      btnSubmitForm.disabled = true;
      btnSubmitForm.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim pesan...</span>';

      setTimeout(() => {
        // Tampilkan pesan berhasil
        if (contactSuccessAlert) {
          contactSuccessAlert.style.display = 'block';
          contactSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset tombol dan formulir
        btnSubmitForm.disabled = false;
        btnSubmitForm.innerHTML = originalBtnHTML;
        contactForm.reset();

        // Sembunyikan notifikasi setelah 5 detik
        setTimeout(() => {
          if (contactSuccessAlert) {
            contactSuccessAlert.style.display = 'none';
          }
        }, 5000);
      }, 900);
    });
  }

});


  // ----------------------------------------------------------------------------
  // 8. INTERACTIVE BILLIARD TABLE MINI-GAME ENGINE (2D CANVAS PHYSICS)
  // ----------------------------------------------------------------------------
  const canvas = document.getElementById('billiardCanvas');
  const scorePocketsEl = document.getElementById('gameScorePockets');
  const scoreShotsEl = document.getElementById('gameScoreShots');
  const gameStatusEl = document.getElementById('gameStatusText');
  const btnRackBalls = document.getElementById('btnRackBalls');
  const btnToggleSound = document.getElementById('btnToggleSound');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    const TABLE_WIDTH = 800;
    const TABLE_HEIGHT = 440;
    const CUSHION = 34; // Ketebalan bantalan meja
    const BALL_RADIUS = 12.5;

    // Koordinat batas pantulan bola
    const minX = CUSHION + BALL_RADIUS;
    const maxX = TABLE_WIDTH - CUSHION - BALL_RADIUS;
    const minY = CUSHION + BALL_RADIUS;
    const maxY = TABLE_HEIGHT - CUSHION - BALL_RADIUS;

    // 6 Lubang (Pockets) Meja Biliar
    const pockets = [
      { x: CUSHION + 4, y: CUSHION + 4, radius: 24 }, // Kiri Atas
      { x: TABLE_WIDTH / 2, y: CUSHION - 2, radius: 22 }, // Tengah Atas
      { x: TABLE_WIDTH - CUSHION - 4, y: CUSHION + 4, radius: 24 }, // Kanan Atas
      { x: CUSHION + 4, y: TABLE_HEIGHT - CUSHION - 4, radius: 24 }, // Kiri Bawah
      { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - CUSHION + 2, radius: 22 }, // Tengah Bawah
      { x: TABLE_WIDTH - CUSHION - 4, y: TABLE_HEIGHT - CUSHION - 4, radius: 24 } // Kanan Bawah
    ];

    // Status Game
    let soundEnabled = true;
    let shotsCount = 0;
    let pocketedCount = 0;
    let isAiming = false;
    let dragStart = { x: 0, y: 0 };
    let dragCurrent = { x: 0, y: 0 };
    let balls = [];

    // Web Audio API Synthesizer (Zero-Dependency Efek Suara Biliar)
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    // Suara Benturan Bola ("Clack!")
    function playClack(volume = 0.5) {
      if (!soundEnabled || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const now = audioCtx.currentTime;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200 + Math.random() * 300, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.045);

        gain.gain.setValueAtTime(Math.min(volume * 0.4, 0.45), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
      } catch (err) {}
    }

    // Suara Bola Masuk Lubang ("Plop!")
    function playPocketSound() {
      if (!soundEnabled || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const now = audioCtx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.13);
      } catch (err) {}
    }

    // Warna Bola Biliar Resmi
    const ballColors = [
      { num: 1, base: '#f59e0b', dark: '#b45309' }, // Kuning
      { num: 2, base: '#3b82f6', dark: '#1d4ed8' }, // Biru
      { num: 3, base: '#ef4444', dark: '#b91c1c' }, // Merah
      { num: 4, base: '#8b5cf6', dark: '#5b21b6' }, // Ungu
      { num: 5, base: '#f97316', dark: '#c2410c' }, // Oranye
      { num: 6, base: '#22c55e', dark: '#15803d' }, // Hijau
      { num: 7, base: '#a855f7', dark: '#6b21a8' }, // Maroon
      { num: 8, base: '#1e293b', dark: '#020617' }  // Hitam (8-Ball)
    ];

    // Fungsi Menata Ulang Bola (Rack)
    function rackBalls() {
      balls = [];
      pocketedCount = 0;
      shotsCount = 0;
      if (scorePocketsEl) scorePocketsEl.textContent = '0 / 8';
      if (scoreShotsEl) scoreShotsEl.textContent = '0';
      if (gameStatusEl) gameStatusEl.textContent = 'Siap Menyodok';

      // 1. Bola Putih (Cue Ball)
      balls.push({
        x: 210,
        y: TABLE_HEIGHT / 2,
        vx: 0,
        vy: 0,
        radius: BALL_RADIUS,
        isCue: true,
        num: '',
        color: { base: '#ffffff', dark: '#cbd5e1' },
        pocketed: false
      });

      // 2. Susunan Segitiga 8 Bola (Triangle Rack)
      const startX = 550;
      const startY = TABLE_HEIGHT / 2;
      const d = BALL_RADIUS * 2 + 1;
      const dx = d * Math.cos(Math.PI / 6);
      const dy = d / 2;

      // Urutan tata letak segitiga
      const rackLayout = [
        [0, 0],                         // Baris 1: Bola 1
        [dx, -dy], [dx, dy],            // Baris 2: Bola 2, 3
        [dx * 2, -dy * 2], [dx * 2, 0], [dx * 2, dy * 2], // Baris 3: Bola 4, Bola 8 di tengah!, Bola 5
        [dx * 3, -dy], [dx * 3, dy]     // Baris 4: Bola 6, 7
      ];

      // Petakan ke 8 bola (Bola 8 di posisi tengah indeks 4)
      const ballSequence = [0, 1, 2, 3, 7, 4, 5, 6];

      for (let i = 0; i < 8; i++) {
        const offset = rackLayout[i];
        const colorData = ballColors[ballSequence[i]];
        balls.push({
          x: startX + offset[0],
          y: startY + offset[1],
          vx: 0,
          vy: 0,
          radius: BALL_RADIUS,
          isCue: false,
          num: colorData.num,
          color: colorData,
          pocketed: false
        });
      }
    }

    // Toggle Suara
    if (btnToggleSound) {
      btnToggleSound.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          initAudio();
          soundIcon.className = 'fa-solid fa-volume-high';
          soundLabel.textContent = 'Suara: ON';
        } else {
          soundIcon.className = 'fa-solid fa-volume-xmark';
          soundLabel.textContent = 'Suara: OFF';
        }
      });
    }

    if (btnRackBalls) {
      btnRackBalls.addEventListener('click', () => {
        initAudio();
        playClack(0.7);
        rackBalls();
      });
    }

    // Cek apakah seluruh bola sudah berhenti
    function isTableStill() {
      for (const b of balls) {
        if (!b.pocketed && (Math.abs(b.vx) > 0.05 || Math.abs(b.vy) > 0.05)) {
          return false;
        }
      }
      return true;
    }

    // Input Mouse & Touch untuk Membidik
    function getPointerPos(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    }

    function handleStartAim(e) {
      initAudio();
      if (!isTableStill()) return;

      const cueBall = balls[0];
      if (cueBall.pocketed) return;

      const pos = getPointerPos(e);
      // Boleh mulai bidik jika klik dekat bola putih atau di mana pun di meja
      isAiming = true;
      dragStart = { x: cueBall.x, y: cueBall.y };
      dragCurrent = pos;

      if (gameStatusEl) gameStatusEl.textContent = 'Membidik Sasaran...';
    }

    function handleMoveAim(e) {
      if (!isAiming) return;
      if (e.cancelable && e.touches) e.preventDefault();
      dragCurrent = getPointerPos(e);
    }

    function handleEndAim() {
      if (!isAiming) return;
      isAiming = false;

      const cueBall = balls[0];
      const pullX = dragStart.x - dragCurrent.x;
      const pullY = dragStart.y - dragCurrent.y;
      const dist = Math.hypot(pullX, pullY);

      if (dist > 10) {
        // Pukul bola putih sebanding dengan jarak tarikan (maks 24)
        const power = Math.min(dist * 0.12, 22);
        const angle = Math.atan2(pullY, pullX);
        cueBall.vx = Math.cos(angle) * power;
        cueBall.vy = Math.sin(angle) * power;

        shotsCount++;
        if (scoreShotsEl) scoreShotsEl.textContent = shotsCount;
        if (gameStatusEl) gameStatusEl.textContent = 'Bola Bergerak!';
        playClack(Math.min(power / 10, 1));
      } else {
        if (gameStatusEl) gameStatusEl.textContent = 'Siap Menyodok';
      }
    }

    // Event Listener Canvas
    canvas.addEventListener('mousedown', handleStartAim);
    window.addEventListener('mousemove', handleMoveAim);
    window.addEventListener('mouseup', handleEndAim);

    canvas.addEventListener('touchstart', handleStartAim, { passive: false });
    window.addEventListener('touchmove', handleMoveAim, { passive: false });
    window.addEventListener('touchend', handleEndAim);

    // Fisika Update (Friction, Elastic Collision, Cushion Bounce, Pocket Drop)
    function updatePhysics() {
      const FRICTION = 0.988;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        if (b.pocketed) continue;

        // Terapkan Kecepatan
        b.x += b.vx;
        b.y += b.vy;

        // Gesekan Karpet Meja
        b.vx *= FRICTION;
        b.vy *= FRICTION;

        if (Math.abs(b.vx) < 0.04) b.vx = 0;
        if (Math.abs(b.vy) < 0.04) b.vy = 0;

        // Pantulan Bantalan (Cushions)
        if (b.x < minX) {
          b.x = minX;
          b.vx = -b.vx * 0.85;
          playClack(Math.abs(b.vx));
        } else if (b.x > maxX) {
          b.x = maxX;
          b.vx = -b.vx * 0.85;
          playClack(Math.abs(b.vx));
        }

        if (b.y < minY) {
          b.y = minY;
          b.vy = -b.vy * 0.85;
          playClack(Math.abs(b.vy));
        } else if (b.y > maxY) {
          b.y = maxY;
          b.vy = -b.vy * 0.85;
          playClack(Math.abs(b.vy));
        }

        // Cek Masuk Lubang (Pockets)
        for (const p of pockets) {
          const distToPocket = Math.hypot(b.x - p.x, b.y - p.y);
          if (distToPocket < p.radius) {
            b.pocketed = true;
            b.vx = 0;
            b.vy = 0;
            playPocketSound();

            if (b.isCue) {
              // Jika bola putih masuk (Scratch), tempatkan ulang setelah bola lain berhenti
              setTimeout(() => {
                b.x = 210;
                b.y = TABLE_HEIGHT / 2;
                b.vx = 0;
                b.vy = 0;
                b.pocketed = false;
              }, 700);
            } else {
              pocketedCount++;
              if (scorePocketsEl) scorePocketsEl.textContent = `${pocketedCount} / 8`;
              if (pocketedCount === 8) {
                if (gameStatusEl) gameStatusEl.textContent = '🎉 Luar Biasa! Semua Bola Masuk!';
              }
            }
            break;
          }
        }
      }

      // Deteksi Tabrakan Antar Bola (Elastic Collisions)
      for (let i = 0; i < balls.length; i++) {
        const b1 = balls[i];
        if (b1.pocketed) continue;

        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j];
          if (b2.pocketed) continue;

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.hypot(dx, dy);

          if (dist < BALL_RADIUS * 2) {
            // Pisahkan overlap agar bola tidak menempel
            const overlap = (BALL_RADIUS * 2) - dist;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);

            b1.x -= nx * (overlap / 2);
            b1.y -= ny * (overlap / 2);
            b2.x += nx * (overlap / 2);
            b2.y += ny * (overlap / 2);

            // Pertukaran Momentum Vektor Normal
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            b1.vx -= p * nx * 0.94;
            b1.vy -= p * ny * 0.94;
            b2.vx += p * nx * 0.94;
            b2.vy += p * ny * 0.94;

            playClack(Math.hypot(p * nx, p * ny) * 0.5);
          }
        }
      }

      // Perbarui Status Game
      if (isTableStill() && !isAiming) {
        if (gameStatusEl && pocketedCount < 8) {
          gameStatusEl.textContent = 'Siap Menyodok';
        }
      }
    }

    // Render Meja & Elemen Visual
    function renderTable() {
      ctx.clearRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);

      // 1. Karpet Biliar (Tournament Blue Felt)
      const feltGrad = ctx.createRadialGradient(
        TABLE_WIDTH / 2, TABLE_HEIGHT / 2, 80,
        TABLE_WIDTH / 2, TABLE_HEIGHT / 2, 450
      );
      feltGrad.addColorStop(0, '#1a5f99');
      feltGrad.addColorStop(0.7, '#114a7a');
      feltGrad.addColorStop(1, '#0c385e');

      ctx.fillStyle = feltGrad;
      ctx.fillRect(CUSHION, CUSHION, TABLE_WIDTH - CUSHION * 2, TABLE_HEIGHT - CUSHION * 2);

      // Garis Head String (Garis Servis Putih Lembut)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(210, CUSHION);
      ctx.lineTo(210, TABLE_HEIGHT - CUSHION);
      ctx.stroke();

      // Titik Tengah Break
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(210, TABLE_HEIGHT / 2, 3, 0, Math.PI * 2);
      ctx.arc(550, TABLE_HEIGHT / 2, 3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Bantalan Karet Meja (Inner Cushions)
      ctx.fillStyle = '#0a3052';
      // Bantalan Atas
      ctx.fillRect(CUSHION + 22, CUSHION, TABLE_WIDTH / 2 - CUSHION - 32, 10);
      ctx.fillRect(TABLE_WIDTH / 2 + 10, CUSHION, TABLE_WIDTH / 2 - CUSHION - 32, 10);
      // Bantalan Bawah
      ctx.fillRect(CUSHION + 22, TABLE_HEIGHT - CUSHION - 10, TABLE_WIDTH / 2 - CUSHION - 32, 10);
      ctx.fillRect(TABLE_WIDTH / 2 + 10, TABLE_HEIGHT - CUSHION - 10, TABLE_WIDTH / 2 - CUSHION - 32, 10);
      // Bantalan Kiri & Kanan
      ctx.fillRect(CUSHION, CUSHION + 22, 10, TABLE_HEIGHT - CUSHION * 2 - 44);
      ctx.fillRect(TABLE_WIDTH - CUSHION - 10, CUSHION + 22, 10, TABLE_HEIGHT - CUSHION * 2 - 44);

      // 3. Lubang (Pockets) dengan Kedalaman Bayangan
      for (const p of pockets) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#05070a';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 4. Gambar Seluruh Bola
      for (const b of balls) {
        if (b.pocketed) continue;

        // Bayangan Bola
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.arc(b.x + 3, b.y + 3, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // Badan Bola dengan Gradasi 3D
        const ballGrad = ctx.createRadialGradient(
          b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.1,
          b.x, b.y, b.radius
        );
        ballGrad.addColorStop(0, b.color.base);
        ballGrad.addColorStop(1, b.color.dark);

        ctx.fillStyle = ballGrad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // Sorotan Kilau Specular
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.28, 0, Math.PI * 2);
        ctx.fill();

        // Lingkaran Putih & Angka untuk Bola Sasaran
        if (!b.isCue) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#111827';
          ctx.font = 'bold 8px Poppins, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(b.num, b.x, b.y + 0.5);
        }
      }

      // 5. Gambar Garis Sasaran & Stik Biliar saat Membidik
      const cueBall = balls[0];
      if (isAiming && !cueBall.pocketed && isTableStill()) {
        const pullX = dragStart.x - dragCurrent.x;
        const pullY = dragStart.y - dragCurrent.y;
        const dist = Math.hypot(pullX, pullY);

        if (dist > 8) {
          const angle = Math.atan2(pullY, pullX);

          // Garis Bidik Putus-putus ke Depan (Aiming Guide Line)
          ctx.save();
          ctx.setLineDash([6, 6]);
          ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cueBall.x, cueBall.y);
          ctx.lineTo(cueBall.x + Math.cos(angle) * 350, cueBall.y + Math.sin(angle) * 350);
          ctx.stroke();
          ctx.restore();

          // Posisi Stik Biliar di Belakang Bola Putih
          const cueOffset = cueBall.radius + 10 + Math.min(dist * 0.6, 60);
          const stickStartX = cueBall.x - Math.cos(angle) * cueOffset;
          const stickStartY = cueBall.y - Math.sin(angle) * cueOffset;
          const stickLength = 220;
          const stickEndX = stickStartX - Math.cos(angle) * stickLength;
          const stickEndY = stickStartY - Math.sin(angle) * stickLength;

          // Badan Stik Biliar (Kayu Gradasi & Tip Biru)
          const stickGrad = ctx.createLinearGradient(stickStartX, stickStartY, stickEndX, stickEndY);
          stickGrad.addColorStop(0, '#38bdf8'); // Ujung chalk biru
          stickGrad.addColorStop(0.04, '#f8fafc'); // Ferrule putih
          stickGrad.addColorStop(0.12, '#b45309'); // Kayu maple
          stickGrad.addColorStop(1, '#451a03'); // Pegangan kayu gelap

          ctx.save();
          ctx.strokeStyle = stickGrad;
          ctx.lineWidth = 6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(stickStartX, stickStartY);
          ctx.lineTo(stickEndX, stickEndY);
          ctx.stroke();

          // Garis Tenaga Pukulan (Power Arc/Circle)
          const powerRatio = Math.min(dist / 140, 1);
          ctx.strokeStyle = powerRatio > 0.75 ? '#ef4444' : '#fbbf24';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cueBall.x, cueBall.y, cueBall.radius + 8, angle - Math.PI / 4, angle + Math.PI / 4);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Loop Utama Game Biliar (60 FPS)
    function gameLoop() {
      updatePhysics();
      renderTable();
      requestAnimationFrame(gameLoop);
    }

    // Inisialisasi Pertama
    rackBalls();
    requestAnimationFrame(gameLoop);
  }
