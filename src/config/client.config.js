// ========================================
// BOOKING SYSTEM - KONFIGURACJA DEMO
// ========================================
// To jest przykładowa konfiguracja do pokazywania klientom
// Dla prawdziwego klienta: skopiuj i zmień dane

export const CLIENT_CONFIG = {
  // 🏢 INFORMACJE O SALONIE
  business: {
    name: "Demo Beauty Studio",
    tagline: "Twoje piękno w profesjonalnych rękach",
    description: "Profesjonalne usługi kosmetyczne w centrum miasta",

    // Kontakt
    phone: "+48 123 456 789",
    email: "kontakt@demobeauty.pl",

    // Adres
    address: {
      street: "ul. Przykładowa 15",
      city: "Warszawa",
      postalCode: "00-001",
      googleMapsUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.159!2d21.012!3d52.229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
    },

    // Godziny otwarcia
    workingHours: {
      monday: { open: "09:00", close: "17:00", closed: false },
      tuesday: { open: "09:00", close: "17:00", closed: false },
      wednesday: { open: "09:00", close: "17:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "14:00", closed: false },
      sunday: { closed: true },
    },
  },

  // 👤 WŁAŚCICIEL (kto może się zalogować)
  owner: {
    email: "demo@gmail.com", // Zmień na prawdziwy email klienta
    name: "Anna Kowalska",
  },

  // 🎨 KOLORY MARKI
  colors: {
    primary: "#ec4899", // Różowy
    secondary: "#fdf2f8", // Jasny różowy
    accent: "#be185d", // Ciemny różowy
    text: "#1f2937", // Ciemny szary
  },

  // 💼 USŁUGI
  services: [
    {
      id: 1,
      name: "Manicure klasyczny",
      description: "Profesjonalny manicure z lakierem",
      duration: 45,
      price: 60,
      category: "Paznokcie",
    },
    {
      id: 2,
      name: "Manicure hybrydowy",
      description: "Trwały manicure hybrydowy",
      duration: 60,
      price: 80,
      category: "Paznokcie",
    },
    {
      id: 3,
      name: "Pedicure",
      description: "Pielęgnacja stóp z malowaniem",
      duration: 60,
      price: 90,
      category: "Paznokcie",
    },
    {
      id: 4,
      name: "Makijaż dzienny",
      description: "Naturalny makijaż na co dzień",
      duration: 45,
      price: 100,
      category: "Makijaż",
    },
    {
      id: 5,
      name: "Makijaż wieczorowy",
      description: "Makijaż na specjalne okazje",
      duration: 90,
      price: 150,
      category: "Makijaż",
    },
  ],

  // 📸 GALERIA (ścieżki do zdjęć)
  gallery: [
    "/images/gallery/demo-1.jpg",
    "/images/gallery/demo-2.jpg",
    "/images/gallery/demo-3.jpg",
    "/images/gallery/demo-4.jpg",
    "/images/gallery/demo-5.jpg",
    "/images/gallery/demo-6.jpg",
  ],

  // 🔗 SOCIAL MEDIA
  social: {
    instagram: "@demobeauty",
    facebook: "https://facebook.com/demobeauty",
    whatsapp: "48123456789",
  },
};

// ========================================
// KONIEC KONFIGURACJI
// ========================================
