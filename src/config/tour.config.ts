export const tourConfig = {
  /** Tema warna untuk UI */
  theme: {
    /** Warna utama (oranye brand) */
    primary: "#EF7845",
    /** Varian lebih terang */
    primaryLight: "#FF9B6D",
    /** Varian lebih gelap */
    primaryDark: "#D45D2A",
    /** Warna glow efek untuk elemen aktif */
    primaryGlow: "rgba(239, 120, 69, 0.5)",
    /** Background transparan untuk glassmorphism */
    glassBg: "rgba(0, 0, 0, 0.4)",
    /** Border untuk efek glassmorphism */
    glassBorder: "rgba(255, 255, 255, 0.15)",
    /** Warna border spinner loading */
    spinnerBorder: "rgba(239, 120, 69, 0.2)",
    /** Warna accent spinner (bagian yg berputar) */
    spinnerAccent: "#EF7845",
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
    title: "Jelajahi Ruang",
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
      /** FOV awal saat transisi zoom */
      fovStart: 75,
      /** FOV akhir saat transisi zoom (lebih kecil = zoom in) */
      fovEnd: 58,
      /** Jenis easing: "ease-out" */
      easing: "ease-out" as const,
    },
    /** Kecepatan progress transisi per frame (0.02 = ~50 frame) */
    speed: 0.02,
    /** Kecepatan fade per frame */
    fadeSpeed: 0.02,
  },

  /** Animasi intro "Little Planet" — efek masuk pertama kali di scene_1 */
  intro: {
    /** Posisi Y awal kamera. Makin tinggi = planet makin kecil & bersih. Range: 100–500 */
    startPosY: 300,
    /** FOV awal kamera. Makin tinggi = efek wide-angle makin ekstrim. Range: 100–179 */
    startFov: 175,
    /** FOV akhir setelah zoom selesai. Biasanya 75 (standar) */
    targetFov: 75,
    /** Durasi jeda (detik) sebelum zoom dimulai — user liat little planet dulu */
    holdDuration: 1.5,
    /** Durasi animasi zoom (detik) dari awal sampai selesai */
    animDuration: 6.0,
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
    title: "Jelajahi Ruang",
    /** Subtitle loading */
    subtitle: "Virtual Tour 360°",
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
    /** Warna background loading */
    backgroundColor: "bg-black",
    /** Warna glow loading */
    glowColor: "rgba(239, 120, 69, 0.15)",
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
};

export type TourConfig = typeof tourConfig;
export type ExperienceVariant = keyof typeof tourConfig.experiences;
export type ActionVariant = "popup" | "whatsapp" | "url";
