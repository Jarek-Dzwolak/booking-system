// ============================================
// PLIK KONFIGURACYJNY SALONU PIĘKNOŚCI
// ============================================
// Tutaj możesz zmienić wszystkie ustawienia salonu w jednym miejscu

export const salonConfig = {
  // ============================================
  // PODSTAWOWE INFORMACJE
  // ============================================
  businessName: "Salon Piękności Bella",
  tagline: "Stwórz swoją piękność z nami ✨",
  description:
    "Odkryj swoje piękno w naszym luksusowym salonie. Oferujemy profesjonalne zabiegi pielęgnacyjne i kosmetyczne z wykorzystaniem najlepszych produktów i najnowszych technologii.",

  // ============================================
  // SEKCJA HERO
  // ============================================
  hero: {
    title: "Odkryj Swoje Piękno",
    subtitle: "Profesjonalne zabiegi kosmetyczne w sercu Warszawy",
    ctaText: "Umów się na wizytę",
    ctaLink: "#kontakt",
  },

  // ============================================
  // KOLORY I STYLE
  // ============================================
  colors: {
    // Kolory główne
    primary: "#ff6b9d",
    secondary: "#c44569",
    accent: "#ffa07a",

    // Kolory tła
    lightPink: "#ffe5ec",
    lighterPink: "#fff0f5",

    // Kolory tekstu
    textDark: "#2d3436",
    textLight: "#636e72",

    // Gradienty
    gradient1: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gradient2: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    gradient3: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    gradientHero:
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)",

    // Cienie
    shadowSm: "0 2px 8px rgba(0, 0, 0, 0.08)",
    shadowMd: "0 4px 16px rgba(0, 0, 0, 0.12)",
    shadowLg: "0 10px 40px rgba(0, 0, 0, 0.15)",
    shadow3d: "0 15px 35px rgba(255, 107, 157, 0.3)",
  },

  // ============================================
  // NAWIGACJA
  // ============================================
  navigation: [
    { name: "Start", href: "#home" },
    { name: "O nas", href: "#o-nas" },
    { name: "Usługi", href: "#uslugi" },
    { name: "Kontakt", href: "#kontakt" },
  ],

  // ============================================
  // USŁUGI
  // ============================================
  services: [
    {
      id: 1,
      icon: "💅",
      title: "Manicure & Pedicure",
      description:
        "Profesjonalna pielęgnacja dłoni i stóp. Hybrydowy, żelowy, klasyczny. Stylizacja paznokci według najnowszych trendów.",
      price: "Od 80 PLN",
      category: "hands",
    },
    {
      id: 2,
      icon: "💄",
      title: "Makijaż",
      description:
        "Makijaż dzienny, wieczorowy, ślubny. Profesjonalny wizaż dopasowany do okazji.",
      price: "Od 150 PLN",
      category: "makeup",
    },
    {
      id: 3,
      icon: "💆",
      title: "Pielęgnacja Twarzy",
      description:
        "Zabiegi oczyszczające, nawilżające, anti-aging. Mezoterapia, mikrodermabrazja.",
      price: "Od 200 PLN",
      category: "face",
    },
    {
      id: 4,
      icon: "🧖",
      title: "Masaż & Spa",
      description:
        "Relaksujący masaż twarzy i ciała. Zabiegi relaksacyjne i regenerujące.",
      price: "Od 180 PLN",
      category: "spa",
    },
    {
      id: 5,
      icon: "✨",
      title: "Depilacja",
      description:
        "Depilacja woskiem, laserowa. Profesjonalne usuwanie owłosienia.",
      price: "Od 60 PLN",
      category: "hair-removal",
    },
    {
      id: 6,
      icon: "👁️",
      title: "Stylizacja Rzęs i Brwi",
      description:
        "Laminacja, henna, regulacja brwi. Przedłużanie rzęs metodą 1:1 oraz objętościową.",
      price: "Od 100 PLN",
      category: "eyes",
    },
  ],

  // ============================================
  // DANE KONTAKTOWE
  // ============================================
  contact: {
    address: {
      street: "ul. Piękna 123",
      city: "00-001 Warszawa",
      full: "ul. Piękna 123, 00-001 Warszawa",
    },
    phone: "+48 123 456 789",
    email: "kontakt@bella.pl",

    // Godziny otwarcia
    openingHours: {
      weekdays: "Pn-Pt: 9:00 - 20:00",
      saturday: "Sb: 10:00 - 18:00",
      sunday: "Nd: Zamknięte",
      display: [
        { days: "Pn-Pt", hours: "9:00 - 20:00" },
        { days: "Sb", hours: "10:00 - 18:00" },
        { days: "Nd", hours: "Zamknięte" },
      ],
    },

    // Social media (opcjonalnie)
    social: {
      facebook: "",
      instagram: "",
      tiktok: "",
    },
  },

  // ============================================
  // SEKCJA "O NAS"
  // ============================================
  about: {
    title: "O Naszym Salonie",
    description:
      "Nasz salon to miejsce, gdzie profesjonalizm spotyka się z pasją. Od ponad 10 lat tworzymy piękno, dbając o każdy szczegół i indywidualne potrzeby naszych klientów.",
    features: [
      {
        icon: "⭐",
        title: "Doświadczenie",
        description: "Ponad 10 lat na rynku",
      },
      {
        icon: "💎",
        title: "Jakość",
        description: "Produkty premium światowych marek",
      },
      {
        icon: "👥",
        title: "Zespół",
        description: "Certyfikowani specjaliści",
      },
      {
        icon: "🏆",
        title: "Nagrody",
        description: "Wielokrotnie nagradzany salon",
      },
    ],
  },

  // ============================================
  // ZDJĘCIA I OBRAZY
  // ============================================
  images: {
    // Logo (opcjonalnie - można dodać własne logo)
    logo: null, // "/path/to/logo.png" lub null dla tekstu

    // Obrazy hero (opcjonalnie - obecnie używamy gradientu)
    heroBackground: null,

    // Galeria usług (opcjonalnie)
    serviceImages: {
      manicure: null,
      makeup: null,
      facial: null,
      spa: null,
      depilation: null,
      eyes: null,
    },

    // Obrazy sekcji o nas
    aboutImages: [],
  },

  // ============================================
  // USTAWIENIA ANIMACJI I EFEKTÓW
  // ============================================
  effects: {
    // Czy włączyć efekt cursor trail
    cursorTrail: true,

    // Czy włączyć floating particles
    floatingParticles: true,

    // Czy włączyć parallax na hero
    parallaxHero: true,

    // Szybkość animacji (1 = normalna, 0.5 = wolniejsza, 2 = szybsza)
    animationSpeed: 1,
  },

  // ============================================
  // SEO I METADANE
  // ============================================
  seo: {
    title:
      "Salon Piękności Bella - Profesjonalne zabiegi kosmetyczne w Warszawie",
    description:
      "Odkryj najlepszy salon piękności w Warszawie. Oferujemy manicure, pedicure, makijaż, pielęgnację twarzy i wiele więcej. Umów się już dziś!",
    keywords:
      "salon piękności, manicure, pedicure, makijaż, Warszawa, zabiegi kosmetyczne",
  },
};

export default salonConfig;
