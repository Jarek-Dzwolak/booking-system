import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../public/config/firebase";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Wystąpił błąd podczas logowania";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Nieprawidłowy adres email";
          break;
        case "auth/user-disabled":
          errorMessage = "To konto zostało zablokowane";
          break;
        case "auth/user-not-found":
          errorMessage = "Nie znaleziono użytkownika o podanym adresie email";
          break;
        case "auth/wrong-password":
          errorMessage = "Nieprawidłowe hasło";
          break;
        case "auth/invalid-credential":
          errorMessage = "Nieprawidłowy email lub hasło";
          break;
        case "auth/too-many-requests":
          errorMessage = "Zbyt wiele prób logowania. Spróbuj ponownie później";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Błąd połączenia z serwerem. Sprawdź połączenie internetowe";
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      setError("Wystąpił błąd podczas wylogowania");
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error("Reset password error:", error);

      let errorMessage = "Wystąpił błąd podczas resetowania hasła";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Nieprawidłowy adres email";
          break;
        case "auth/user-not-found":
          errorMessage = "Nie znaleziono użytkownika o podanym adresie email";
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        console.log("✅ Użytkownik zalogowany:", user.email);
      } else {
        console.log("👤 Użytkownik niezalogowany");
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
    error,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
