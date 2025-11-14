import { useNavigate } from "react-router-dom";
import useSalonConfig from "../public/hooks/useSalonConfig";
import { useAuth } from "../contexts/AuthContext";

const DashboardLayout = () => {
  const { businessName, colors } = useSalonConfig();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: colors.lighterPink,
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          textAlign: "center",
          background: "white",
          padding: "3rem",
          borderRadius: "25px",
          boxShadow: colors.shadowLg,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              background: colors.gradient2,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Panel Administracyjny
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              color: colors.textDark,
              marginBottom: "0.5rem",
            }}
          >
            {businessName}
          </h2>
        </div>

        {/* User Info Card */}
        <div
          style={{
            padding: "1.5rem",
            background: colors.lightPink,
            borderRadius: "15px",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: colors.gradient2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                color: "white",
              }}
            >
              👤
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: colors.textLight,
                }}
              >
                Zalogowany jako
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: colors.textDark,
                }}
              >
                {currentUser?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "0.75rem 1.5rem",
              background: "white",
              border: `2px solid ${colors.primary}`,
              borderRadius: "10px",
              color: colors.primary,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.color = colors.primary;
            }}
          >
            🚪 Wyloguj
          </button>
        </div>

        {/* Welcome Message */}
        <p
          style={{
            fontSize: "1.2rem",
            color: colors.textLight,
            lineHeight: "1.8",
            marginBottom: "2rem",
          }}
        >
          Witaj w panelu administracyjnym! 🎉
          <br />
          Panel jest w przygotowaniu.
          <br />
          Wkrótce będziesz mógł zarządzać swoim salonem z tego miejsca.
        </p>

        {/* Features List */}
        <div
          style={{
            padding: "1.5rem",
            background: colors.lightPink,
            borderRadius: "15px",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              color: colors.textDark,
              fontWeight: 600,
              fontSize: "1.1rem",
              marginBottom: "1rem",
            }}
          >
            🚀 Planowane funkcje:
          </p>
          <ul
            style={{
              marginTop: "1rem",
              textAlign: "left",
              color: colors.textLight,
              lineHeight: "2",
              paddingLeft: "1.5rem",
            }}
          >
            <li>📅 Zarządzanie rezerwacjami</li>
            <li>💅 Edycja usług i cenników</li>
            <li>📊 Kalendarz wizyt</li>
            <li>📈 Statystyki i raporty</li>
            <li>👥 Zarządzanie klientami</li>
            <li>📷 Zarządzanie galerią</li>
            <li>✉️ System powiadomień</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <a
            href="/"
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              background: colors.gradient2,
              color: "white",
              textDecoration: "none",
              borderRadius: "15px",
              fontWeight: 600,
              transition: "all 0.3s ease",
              boxShadow: colors.shadowMd,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = colors.shadowLg;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = colors.shadowMd;
            }}
          >
            🏠 Strona główna
          </a>

          <button
            onClick={() =>
              window.open("https://console.firebase.google.com", "_blank")
            }
            style={{
              padding: "1rem 2rem",
              background: "white",
              border: `2px solid ${colors.primary}`,
              borderRadius: "15px",
              color: colors.primary,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.color = colors.primary;
            }}
          >
            🔥 Firebase Console
          </button>
        </div>

        {/* Security Info */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#e8f5e9",
            border: "2px solid #4caf50",
            borderRadius: "10px",
            textAlign: "left",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#2e7d32",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>🔒</span>
            <span>
              <strong>Bezpieczeństwo:</strong> Twoja sesja jest chroniona przez
              Firebase Authentication. System automatycznie rozpoznaje
              zalogowanego użytkownika i utrzymuje sesję nawet po odświeżeniu
              strony.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
