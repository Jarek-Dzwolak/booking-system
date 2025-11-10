# 💅 Salon Piękności - Strona Internetowa

Profesjonalna, responsywna strona internetowa dla salonu piękności zbudowana w **React + Vite** z pełną personalizacją poprzez plik konfiguracyjny.

## ✨ Funkcje

- 🎨 **Pełna personalizacja** - wszystkie kolory, teksty, usługi w jednym pliku
- 📱 **Responsywny design** - działa na wszystkich urządzeniach
- ⚡ **Animacje i efekty** - cursor trail, floating particles, parallax
- 🔧 **Łatwa konfiguracja** - zmień wszystko w `salonConfig.js`
- 🎯 **SEO-friendly** - optymalizacja pod wyszukiwarki
- 🚀 **Szybkie ładowanie** - zoptymalizowane pod kątem wydajności

## 📁 Struktura Projektu

```
salon-app/
├── src/
│   ├── public/                    # Strona publiczna
│   │   ├── components/            # Komponenty React
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── VisualEffects.jsx
│   │   ├── hooks/                 # Custom hooks
│   │   │   └── useSalonConfig.js  # Hook do zarządzania konfiguracją
│   │   ├── config/                # Konfiguracja
│   │   │   └── salonConfig.js     # ⭐ GŁÓWNY PLIK KONFIGURACYJNY
│   │   ├── styles/                # Style CSS
│   │   │   └── animations.css
│   │   └── PublicLayout.jsx       # Layout strony publicznej
│   ├── dashboard/                 # Panel administracyjny (w przygotowaniu)
│   │   └── DashboardLayout.jsx
│   ├── App.jsx                    # Główny komponent z routingiem
│   └── main.jsx                   # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Instalacja i Uruchomienie

### Wymagania
- Node.js (v18 lub nowszy)
- npm lub yarn

### Krok 1: Instalacja zależności
```bash
npm install
```

### Krok 2: Uruchomienie w trybie deweloperskim
```bash
npm run dev
```

Strona będzie dostępna pod adresem: `http://localhost:5173`

### Krok 3: Build produkcyjny
```bash
npm run build
```

### Krok 4: Podgląd buildu produkcyjnego
```bash
npm run preview
```

## 🎨 Personalizacja

### Jak zmienić ustawienia salonu?

Wszystkie ustawienia znajdują się w jednym miejscu:
**`src/public/config/salonConfig.js`**

### Przykłady personalizacji:

#### 1. Zmiana nazwy i opisu salonu
```javascript
businessName: "Twój Salon",
tagline: "Twój nowy slogan ✨",
description: "Twój opis salonu...",
```

#### 2. Zmiana kolorów
```javascript
colors: {
  primary: "#ff0000",        // Kolor główny
  secondary: "#cc0000",      // Kolor drugorzędny
  accent: "#ff6666",         // Kolor akcentujący
  // ... pozostałe kolory
}
```

#### 3. Zmiana sekcji Hero
```javascript
hero: {
  title: "Twój Nowy Tytuł",
  subtitle: "Twój nowy podtytuł",
  ctaText: "Twój przycisk",
  ctaLink: "#kontakt",
}
```

#### 4. Dodawanie/edycja usług
```javascript
services: [
  {
    id: 1,
    icon: "💅",
    title: "Twoja Usługa",
    description: "Opis usługi...",
    price: "Od 100 PLN",
    category: "category-name",
  },
  // ... dodaj więcej usług
]
```

#### 5. Zmiana danych kontaktowych
```javascript
contact: {
  address: {
    street: "ul. Twoja 123",
    city: "00-000 Twoje Miasto",
  },
  phone: "+48 123 456 789",
  email: "twoj@email.pl",
  openingHours: {
    display: [
      { days: "Pn-Pt", hours: "9:00 - 20:00" },
      { days: "Sb", hours: "10:00 - 18:00" },
      { days: "Nd", hours: "Zamknięte" },
    ]
  },
}
```

#### 6. Wyłączenie efektów wizualnych
```javascript
effects: {
  cursorTrail: false,        // Wyłącz cursor trail
  floatingParticles: false,  // Wyłącz cząsteczki
  parallaxHero: false,       // Wyłącz parallax
  animationSpeed: 1,         // Prędkość animacji (1 = normalna)
}
```

## 🎯 Użycie Custom Hook

Hook `useSalonConfig` pozwala na łatwy dostęp do konfiguracji w komponentach:

```javascript
import useSalonConfig from '../hooks/useSalonConfig';

function MojKomponent() {
  const { 
    businessName, 
    colors, 
    services, 
    contact,
    getServiceById,
    applyColors 
  } = useSalonConfig();

  // Użyj konfiguracji w komponencie
  return (
    <div style={{ color: colors.primary }}>
      {businessName}
    </div>
  );
}
```

### Dostępne funkcje pomocnicze:

```javascript
// Pobierz usługę po ID
const service = getServiceById(1);

// Pobierz usługi po kategorii
const makeupServices = getServicesByCategory('makeup');

// Sformatuj godziny otwarcia
const hours = getFormattedOpeningHours();

// Zastosuj kolory do CSS Variables
applyColors();
```

## 🛣️ Routing

- `/` - Strona publiczna (strona główna)
- `/dashboard` - Panel administracyjny (w przygotowaniu)

## 🎨 Kolory i Gradienty

Wszystkie kolory są zdefiniowane jako CSS Variables i automatycznie aplikowane przez hook:

```javascript
colors: {
  primary: "#ff6b9d",
  secondary: "#c44569",
  gradient1: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradient2: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  // ... więcej
}
```

## 📱 Responsywność

Strona jest w pełni responsywna i automatycznie dostosowuje się do:
- 📱 Telefony komórkowe
- 📱 Tablety
- 💻 Laptopy
- 🖥️ Desktopy

## 🔧 Technologie

- **React 18** - Biblioteka UI
- **Vite** - Build tool i dev server
- **React Router** - Routing
- **CSS3** - Animacje i style
- **JavaScript ES6+** - Logika aplikacji

## 📝 Notatki

### Dodawanie zdjęć
Możesz dodać własne zdjęcia w sekcji `images` w pliku konfiguracyjnym:

```javascript
images: {
  logo: "/path/to/logo.png",
  heroBackground: "/path/to/hero-bg.jpg",
  serviceImages: {
    manicure: "/path/to/manicure.jpg",
    // ... więcej
  }
}
```

### Integracja formularza kontaktowego
Obecnie formularz wyświetla tylko komunikat sukcesu. Możesz dodać własną logikę wysyłania w:
`src/public/components/Contact.jsx` w funkcji `handleSubmit`

### SEO
Meta tagi są automatycznie ustawiane z pliku konfiguracyjnego:
```javascript
seo: {
  title: "Tytuł strony dla SEO",
  description: "Opis strony dla wyszukiwarek",
  keywords: "słowa, kluczowe, oddzielone, przecinkami",
}
```

## 🚀 Deploy

### Netlify
```bash
npm run build
# Wgraj folder 'dist' do Netlify
```

### Vercel
```bash
npm run build
# Użyj Vercel CLI lub importuj z GitHub
```

## 📄 Licencja

Ten projekt jest szablonem open-source. Możesz go swobodnie modyfikować i używać dla własnych celów.

## 🤝 Wsparcie

Jeśli masz pytania lub problemy, możesz:
1. Sprawdzić dokumentację w pliku konfiguracyjnym
2. Przejrzeć kod komponentów w folderze `src/public/components`
3. Zapoznać się z hookiem `useSalonConfig.js`

---

**Stwórz piękną stronę dla swojego salonu w kilka minut! 💅✨**
