export const tourConfig = {
  /** Tema warna untuk UI */
  theme: {
    /** Warna utama */
    primary: "#532d6d",
    /** Varian lebih terang */
    primaryLight: "#7a4d9e",
    /** Varian lebih gelap */
    primaryDark: "#3d1f52",
    /** Warna glow efek untuk elemen aktif */
    primaryGlow: "rgba(83, 45, 109, 0.5)",
    /** Background transparan untuk glassmorphism */
    glassBg: "rgba(0, 0, 0, 0.4)",
    /** Border untuk efek glassmorphism */
    glassBorder: "rgba(255, 255, 255, 0.15)",
    /** Warna border spinner loading */
    spinnerBorder: "rgba(255, 255, 255, 0.2)",
    /** Warna accent spinner (bagian yg berputar) */
    spinnerAccent: "#ffffff",
  },

  /** Informasi brand */
  brand: {
    /** Nama lengkap brand */
    name: "TOMORO CC",
    /** Tagline / subtitle */
    tagline: "Virtual Tour 360°",
    /** Nama pendek untuk mobile/compact UI */
    shortName: "TOMORO",
  },

  /** Konfigurasi tur secara umum */
  tour: {
    /** Judul halaman loading */
    title: "Welcome",
    /** Scene pertama yg tampil saat tur dimulai */
    defaultScene: "scene_1",
    /** Jenis transisi default antar scene: "fade" | "zoom" */
    transitionDefault: "fade" as const,
  },

  /** Konfigurasi kamera 3D */
  camera: {
    /** Field of view normal (derajat). Standard: 75 */
    fov: 75,
    /** Jarak kliping terdekat */
    near: 0.1,
    /** Jarak kliping terjauh */
    far: 1000,
    /** Radius sphere panorama. Makin besar = makin halus distorsi */
    sphereRadius: 500,
    /** Segmen sphere. Makin tinggi = makin halus, lebih berat performa */
    sphereSegments: 128,
    /** Kecepatan rotasi kamera (nilai negatif = arah default) */
    rotateSpeed: {
      /** Kecepatan di desktop */
      desktop: -0.3,
      /** Kecepatan di mobile */
      mobile: -0.5,
    },
    /** Efek damping (inersia) saat user berhenti interaksi */
    dampingFactor: {
      /** Damping di desktop */
      desktop: 0.05,
      /** Damping di mobile (lebih berat biar ga goyang) */
      mobile: 0.08,
    },
  },

  /** Konfigurasi auto-rotate (putar otomatis) */
  autoRotate: {
    /** Kecepatan maksimum auto-rotate */
    speedMax: 1,
    /** Akselerasi per step (naik bertahap) */
    acceleration: 0.02,
    /** Interval akselerasi dalam ms (~60fps) */
    accelerationIntervalMs: 16,
    /** Waktu tunggu (ms) sebelum auto-rotate aktif setelah user berhenti */
    inertiaTimeoutMs: 5000,
  },

  /** Konfigurasi transisi antar scene */
  transitions: {
    zoom: {
      /** FOV puncak saat zoom in (lebih kecil = zoom lebih dalem) */
      fovEnd: 50,
      /** FOV awal scene B saat muncul (lebih besar = zoom out lebih wide) */
      zoomOutFov: 110,
    },
    /** Kecepatan progress transisi per frame (0.0085 = ~118 frame / ~2s) */
    speed: 0.0085,
    /** Kecepatan fade per frame */
    fadeSpeed: 0.02,
  },

  /** Animasi intro "Little Planet" — efek masuk pertama kali di scene_1 */
  intro: {
    /** Posisi Y awal kamera. Makin tinggi = planet makin kecil & bersih. Range: 100–500 */
    startPosY: 250,
    /** FOV awal kamera. Makin tinggi = efek wide-angle makin ekstrim. Range: 100–179 */
    startFov: 175,
    /** FOV akhir setelah zoom selesai. Biasanya 75 (standar) */
    targetFov: 75,
    /** Durasi jeda (detik) sebelum zoom dimulai — user liat little planet dulu */
    holdDuration: 0,
    /** Durasi animasi zoom (detik) dari awal sampai selesai */
    animDuration: 4.0,
    /** Set false untuk menonaktifkan intro sepenuhnya */
    enabled: true,
  },

  /** Konfigurasi performa rendering */
  performance: {
    /** Anti-aliasing. Matikan untuk performa lebih baik */
    antialias: false,
    /** Preferensi daya GPU */
    powerPreference: "high-performance" as const,
    /** Alpha channel. false jika ga perlu background transparan */
    alpha: false,
    /** Stencil buffer. false jika ga perlu efek masking */
    stencil: false,
    /** Depth buffer. true untuk rendering 3D yg benar */
    depth: true,
    /** Tone mapping. false untuk warna lebih akurat di HDR */
    toneMapped: false,
    /** Color space */
    colorSpace: "srgb" as const,
    /** Generate mipmaps. false untuk hemat memori */
    generateMipmaps: false,
    /** Filter minifikasi tekstur */
    minFilter: "LinearFilter" as const,
    /** Filter magnifikasi tekstur */
    magFilter: "LinearFilter" as const,
  },

  /** Konfigurasi layar loading */
  loading: {
    /** Judul utama loading */
    title: "",
    /** Subtitle loading (teks) — dipakai kalau subtitleImage tidak diisi */
    subtitle: "",
    /** Path logo sebagai pengganti subtitle — jika diisi, subtitle teks diabaikan */
    subtitleImage: "/icons/logo-label.png",
    /** Ukuran spinner (Tailwind class) */
    spinnerSize: "w-24 h-24",
    /** Ukuran efek glow di belakang spinner */
    glowSize: "w-[400px] h-[400px]",
    /** Buffer (ms) setelah loading 100% sebelum fade — biar GPU selesai render */
    gpuPaintBufferMs: 600,
    /** Durasi fade overlay loading (ms) */
    fadeDurationMs: 800,
    /** Teks progress loading */
    progressText: "Memuat Panorama",
    /** Teks saat loading selesai tapi masih nunggu buffer */
    initializingText: "Siap-Siap, Hampir Selesai",
    /** Warna background loading (Tailwind bg class) */
    backgroundColor: "bg-[#542d6e]",
    /** Warna glow loading */
    glowColor: "rgba(255, 255, 255, 0.08)",
  },

  /** Konfigurasi teks UI */
  ui: {
    /** Judul menu daftar scene */
    sceneMenuTitle: "Pilih Ruangan",
    /** Tombol show navigasi */
    showNavigation: "Tampilkan Navigator",
    /** Tombol hide navigasi */
    hideNavigation: "Sembunyikan Navigator",
    /** Tombol fullscreen */
    fullscreen: "Layar Penuh",
    /** Tombol exit fullscreen */
    exitFullscreen: "Keluar Layar Penuh",
    /** Tombol gyroscope on */
    gyroOn: "Aktifkan Gerak",
    /** Tombol gyroscope off */
    gyroOff: "Matikan Gerak",
    /** Label lokasi saat ini */
    currentLocation: "Lokasi",
  },

  /** Informasi kontak & reservasi */
  contact: {
    whatsapp: {
      /** Nomor WhatsApp untuk reservasi (via env) */
      number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
      /** Label tombol WhatsApp */
      label: "Reservasi",
    },
    booking: {
      /** URL booking eksternal (via env) */
      url: process.env.NEXT_PUBLIC_BOOKING_URL || "https://booking.com",
    },
  },

  /** Fitur yang bisa diaktifkan/dimatikan */
  features: {
    gyro: {
      /** Aktifkan kontrol gyroscope (device orientation) */
      enabled: true,
      /** Tampilkan tombol gyro di desktop */
      showOnDesktop: false,
    },
    fullscreen: {
      /** Aktifkan tombol fullscreen */
      enabled: true,
      /** Tampilkan tombol fullscreen di mobile */
      showOnMobile: false,
    },
  },

  /** Header floating di atas — navbar kompro */
  header: {
    /** Aktifkan header */
    enabled: true,
    logo: {
      /** Path logo di public/ (opsional, fallback ke brand.name) */
      image: "/icons/logo-label.png",
      /** Alt text logo */
      alt: "TOMORO CC",
    },
    /** Deretan link navigasi */
    links: [
      {
        id: "home",
        label: "Home",
        variant: "scene" as const,
        targetScene: "scene_1",
      },
      {
        id: "menu",
        label: "Menu",
        variant: "modal" as const,
        modalImage: "/images/all-menu.jpg",
      },
      {
        id: "all-muffins",
        label: "All Muffins",
        variant: "modal" as const,
        modalImage: "/images/all-muffins.jpg",
      },
      {
        id: "indo-fav",
        label: "Indonesia Favorites",
        variant: "modal" as const,
        modalImage: "/images/indo-fav.jpg",
      },
      {
        id: "promo",
        label: "Promo",
        variant: "modal" as const,
        modalImage: "/images/promo.png",
      },
    ],
  },

  /** Pengalaman interaktif per kategori tempat */
  experiences: {
    restoran: [
      {
        /** ID unik aksi */
        id: "menu",
        /** Label tombol */
        label: "Lihat Menu",
        /** Nama ikon dari library */
        icon: "Utensils",
        /** Jenis aksi: "popup" | "whatsapp" | "url" */
        variant: "popup" as const,
        /** Pesan popup (untuk variant popup) */
        popupMessage: "Buku Menu akan segera ditampilkan...",
      },
      {
        id: "reservasi",
        label: "Buat Reservasi",
        icon: "CalendarDays",
        variant: "whatsapp" as const,
      },
    ],
    penginapan: [
      {
        id: "fasilitas",
        label: "Lihat Fasilitas",
        icon: "Info",
        variant: "popup" as const,
        popupMessage: "Fasilitas akan segera ditampilkan...",
      },
      {
        id: "booking",
        label: "Pesan Sekarang",
        icon: "BedDouble",
        variant: "url" as const,
        url: process.env.NEXT_PUBLIC_BOOKING_URL || "https://booking.com",
      },
    ],
    properti: [
      {
        id: "denah",
        label: "Lihat Denah",
        icon: "LayoutDashboard",
        variant: "popup" as const,
        popupMessage: "Denah akan segera ditampilkan...",
      },
      {
        id: "agen",
        label: "Hubungi Agen",
        icon: "Phone",
        variant: "whatsapp" as const,
      },
    ],
  },

  /** Floating social media icons di bawah */
  social: {
    /** Aktifkan social media bar */
    enabled: true,
    /** Posisi: "left" | "right" | "bottom" */
    position: "bottom" as const,
    /** Daftar platform sosial media */
    links: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/coffeebeanindonesia/",
        label: "Instagram",
      },
      {
        platform: "tiktok",
        url: "https://www.tiktok.com/@transfnb",
        label: "TikTok",
      },
      {
        platform: "whatsapp",
        url: "https://api.whatsapp.com/send/?phone=6289602595413&text=Halo%2C+saya+baru+melihat+360+Virtual+Tour+The+Coffee+Bean+%26+Tea+Leaf+Trans+Icon+Surabaya.+Saya+ingin+bertanya+informasi+lebih+lanjut+terkait+lokasi%2C+reservasi%2C+atau+kebutuhan+kunjungan+ke+kafe+ini.&type=phone_number&app_absent=0",
        label: "WhatsApp",
      },
    ],
    info: {
      enabled: true,
      label: "About Us",
      content: `<div style="color:#fff;max-width:100%;margin:0 auto">
  <div style="display:flex;flex-wrap:wrap;gap:24px">
    <div style="flex:1 1 280px;min-width:200px">
      <img
        src="/panoramas/scene-5.jpg"
        alt="The Coffee Bean &amp; Tea Leaf"
        style="width:100%;height:auto;border-radius:16px;object-fit:cover;box-shadow:0 8px 30px rgba(0,0,0,0.5);aspect-ratio:3/4;display:block"
      />
    </div>
    <div style="flex:2 1 300px;min-width:240px">
      <div style="margin-bottom:20px">
        <span style="color:#c084fc;font-size:clamp(20px,4vw,32px);font-family:'Montserrat',Arial,sans-serif;font-weight:700;line-height:1.2">The Coffee Bean &amp; Tea Leaf</span>
      </div>

      <div style="font-size:clamp(13px,1.8vw,16px);line-height:1.8;color:rgba(255,255,255,0.85);font-family:Arial,Helvetica,sans-serif">
        <p style="margin:0 0 14px">The Coffee Bean &amp; Tea Leaf (CBTL) adalah jaringan kedai kopi global asal Amerika Serikat yang beroperasi luas di Indonesia di bawah manajemen PT Trans Coffee, anak perusahaan dari CT Corp milik Chairul Tanjung. Secara global, merek ini dimiliki oleh Jollibee Foods Corporation sejak tahun 2019.</p>

        <p style="margin:0 0 10px;font-weight:600;color:#c084fc">📍 Lokasi &amp; Suasana</p>
        <p style="margin:0 0 14px">CBTL memiliki banyak cabang di kota-kota besar Indonesia, sering ditemukan di mal-mal terkemuka dan pusat perbelanjaan. Seperti di Jakarta dan Wilayah Surabaya, gerai juga ada di Trans Icon Mall Surabaya, Tunjungan Plaza 6, Galaxy Mall, Transmart Rungkut, dan RS Islam Wonokromo.</p>

        <p style="margin:0 0 10px;font-weight:600;color:#c084fc">☕ Menu Unggulan</p>
        <p style="margin:0 0 6px"><strong>Minuman</strong>: Terkenal dengan lini Original Ice Blended, kopi panas, serta berbagai pilihan teh.</p>
        <p style="margin:0 0 14px"><strong>Makanan</strong>: Menawarkan hidangan seperti sup buntut (salah satu produk terlaris), pizza, lasagna, serta aneka pastry dan kue.</p>

        <p style="margin:0 0 10px;font-weight:600;color:#c084fc">🏷️ Promo &amp; Layanan</p>
        <p style="margin:0 0 8px"><strong>Diskon Bank</strong>: Sering mengadakan promo khusus bagi pengguna kartu Bank Mega (diskon hingga 50%) dan Allo Bank.</p>
      </div>
    </div>
  </div>
</div>`,
    },
    location: {
      enabled: true,
      label: "Our Location",
      mapsUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.133050054558!2d112.72872869999999!3d-7.3389519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbb7d52737e9%3A0xac078435bbf09692!2sThe%20Coffee%20Bean%20and%20Tea%20Leaf!5e0!3m2!1sen!2sid!4v1780920097181!5m2!1sen!2sid",
    },
  },
};

export type TourConfig = typeof tourConfig;
export type ExperienceVariant = keyof typeof tourConfig.experiences;
export type ActionVariant = "popup" | "whatsapp" | "url" | "scene" | "modal";
