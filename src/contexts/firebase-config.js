import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TWOJ-API-KEY",
  authDomain: "twoj-projekt.firebaseapp.com",
  projectId: "twoj-projekt-id",
  storageBucket: "twoj-projekt.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
};

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("✅ Firebase skonfigurowane pomyślnie");
    })
    .catch((error) => {
      console.error("❌ Błąd ustawiania persistence:", error);
    });
} catch (error) {
  console.error("❌ Błąd inicjalizacji Firebase:", error);
}

export { auth, db };
export default app;
