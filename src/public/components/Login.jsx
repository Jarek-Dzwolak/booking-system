import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useSalonConfig from "../../public/hooks/useSalonConfig";

const Login = () => {
  const { businessName, colors } = useSalonConfig();
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Walidacja
    if (!email || !password) {
      setError("Wypełnij wszystkie pola");
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      // Przekieruj do dashboard po udanym logowaniu
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Wystąpił błąd podczas logowania");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.gradientHero,
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          content: "",
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "-200px",
          right: "-200px",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        style={{
          content: "",
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "-150px",
          left: "-150px",
          animation: "float 15s ease-in-out infinite reverse",
        }}
      />

      {/* Login Card */}
      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "30px",
          boxShadow: colors.shadowLg,
          maxWidth: "450px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo/Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "0.5rem",
              background: colors.gradient2,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {businessName}
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: colors.textLight,
            }}
          >
            Panel Administracyjny
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
                color: colors.textDark,
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              disabled={loading}
              style={{
                width: "100%",
                padding: "1rem",
                border: `2px solid ${colors.lightPink}`,
                borderRadius: "15px",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.lightPink}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.lightPink;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
                color: colors.textDark,
              }}
            >
              Hasło
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "1rem",
                  paddingRight: "3rem",
                  border: `2px solid ${colors.lightPink}`,
                  borderRadius: "15px",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.lightPink}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.lightPink;
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  padding: "0.5rem",
                  color: colors.textLight,
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {(error || authError) && (
            <div
              style={{
                padding: "1rem",
                background: "#fee",
                border: "2px solid #fcc",
                borderRadius: "10px",
                marginBottom: "1.5rem",
                color: "#c33",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>⚠️</span>
              <span>{error || authError}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              background: loading ? colors.textLight : colors.gradient2,
              color: "white",
              border: "none",
              borderRadius: "15px",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: colors.shadowMd,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = colors.shadowLg;
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = colors.shadowMd;
            }}
          >
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid white",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Logowanie...
              </span>
            ) : (
              "Zaloguj się"
            )}
          </button>
        </form>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "1rem",
            padding: "1rem",
            background: "transparent",
            color: colors.textLight,
            border: `2px solid ${colors.lightPink}`,
            borderRadius: "15px",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.borderColor = colors.primary;
              e.target.style.color = colors.primary;
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = colors.lightPink;
            e.target.style.color = colors.textLight;
          }}
        >
          Powrót do strony głównej
        </button>

        {/* Info Box */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: colors.lightPink,
            borderRadius: "10px",
            textAlign: "center",
            fontSize: "0.9rem",
            color: colors.textDark,
          }}
        >
          <p style={{ margin: 0 }}>
            💡 <strong>Pierwsza konfiguracja?</strong>
          </p>
          <p style={{ margin: "0.5rem 0 0 0" }}>
            Stwórz użytkownika w Firebase Console
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
          }
          33% { 
            transform: translate(30px, -30px) rotate(120deg); 
          }
          66% { 
            transform: translate(-20px, 20px) rotate(240deg); 
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
