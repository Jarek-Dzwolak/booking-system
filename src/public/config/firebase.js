// ============================================
// KONFIGURACJA FIREBASE
// ============================================
// Instrukcje konfiguracji:
// 1. Przejdź do https://console.firebase.google.com/
// 2. Stwórz nowy projekt (lub wybierz istniejący)
// 3. Dodaj aplikację Web (ikona </>)
// 4. Skopiuj dane konfiguracyjne i wklej poniżej
// 5. W Firebase Console włącz Authentication > Email/Password

import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// ============================================
// TWOJA KONFIGURACJA FIREBASE
// ============================================
// ZAMIEŃ PONIŻSZE WARTOŚCI NA SWOJE Z FIREBASE CONSOLE!
const firebaseConfig = {
  apiKey: "TWOJ-API-KEY",
  authDomain: "twoj-projekt.firebaseapp.com",
  projectId: "twoj-projekt-id",
  storageBucket: "twoj-projekt.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
};

// ============================================
// INICJALIZACJA FIREBASE
// ============================================
let app;
let auth;

try {
  // Inicjalizuj aplikację Firebase
  app = initializeApp(firebaseConfig);

  // Inicjalizuj Authentication
  auth = getAuth(app);

  // Ustaw persistence - użytkownik pozostanie zalogowany nawet po odświeżeniu strony
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("✅ Firebase Authentication skonfigurowane pomyślnie");
    })
    .catch((error) => {
      console.error("❌ Błąd ustawiania persistence:", error);
    });
} catch (error) {
  console.error("❌ Błąd inicjalizacji Firebase:", error);
  console.error(
    "📝 Sprawdź czy poprawnie skonfigurowałeś firebaseConfig w src/config/firebase.js"
  );
}
import { getFirestore } from "firebase/firestore";

// Inicjalizuj Firestore
const db = getFirestore(app);

export { auth, db };
export default app;
