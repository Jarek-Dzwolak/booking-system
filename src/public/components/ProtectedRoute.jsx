import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useSalonConfig from "../hooks/useSalonConfig";

/**
 * Komponent chroniący trasy przed nieautoryzowanym dostępem
 * Jeśli użytkownik nie jest zalogowany, przekierowuje go na stronę logowania
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { colors } = useSalonConfig();

  // Pokaż loader podczas sprawdzania stanu autoryzacji
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.lighterPink,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "4px solid " + colors.lightPink,
              borderTop: "4px solid " + colors.primary,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          />
          <p
            style={{
              fontSize: "1.2rem",
              color: colors.textDark,
              fontWeight: 500,
            }}
          >
            Sprawdzanie autoryzacji...
          </p>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Jeśli użytkownik niezalogowany, przekieruj do logowania
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Jeśli zalogowany, pokaż chronioną stronę
  return children;
};

export default ProtectedRoute;
