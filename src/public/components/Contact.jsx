import { useEffect, useRef } from "react";
import useSalonConfig from "../hooks/useSalonConfig";

const Contact = () => {
  const { contact, colors } = useSalonConfig();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elements = sectionRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Funkcja do obsługi kliknięć w social media
  const handleSocialClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  return (
    <section
      id="kontakt"
      ref={sectionRef}
      style={{
        padding: "6rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Section Title */}
      <h2
        className="fade-in"
        style={{
          textAlign: "center",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          marginBottom: "3rem",
          background: colors.gradient2,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Skontaktuj się z nami
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "3rem",
          marginTop: "3rem",
        }}
      >
        {/* LEWA STRONA - Contact Information */}
        <div
          className="fade-in"
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* Address */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              padding: "1.5rem",
              background: "white",
              borderRadius: "15px",
              boxShadow: colors.shadowSm,
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ fontSize: "2rem" }}>📍</div>
            <div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "0.5rem",
                  color: colors.textDark,
                }}
              >
                Adres
              </h3>
              <p style={{ color: colors.textLight, lineHeight: "1.6" }}>
                {contact.address.street}
                <br />
                {contact.address.city}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              padding: "1.5rem",
              background: "white",
              borderRadius: "15px",
              boxShadow: colors.shadowSm,
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ fontSize: "2rem" }}>📞</div>
            <div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "0.5rem",
                  color: colors.textDark,
                }}
              >
                Telefon
              </h3>
              <p style={{ color: colors.textLight }}>{contact.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              padding: "1.5rem",
              background: "white",
              borderRadius: "15px",
              boxShadow: colors.shadowSm,
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ fontSize: "2rem" }}>📧</div>
            <div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "0.5rem",
                  color: colors.textDark,
                }}
              >
                Email
              </h3>
              <p style={{ color: colors.textLight }}>{contact.email}</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              padding: "1.5rem",
              background: "white",
              borderRadius: "15px",
              boxShadow: colors.shadowSm,
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ fontSize: "2rem" }}>🕐</div>
            <div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "0.5rem",
                  color: colors.textDark,
                }}
              >
                Godziny otwarcia
              </h3>
              {contact.openingHours.display.map((item, index) => (
                <p
                  key={index}
                  style={{ color: colors.textLight, lineHeight: "1.8" }}
                >
                  {item.days}: {item.hours}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* PRAWA STRONA - Social Media Cards */}
        <div
          className="fade-in"
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* Header z opisem */}
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              background: "white",
              borderRadius: "20px",
              boxShadow: colors.shadowMd,
            }}
          >
            <h3
              style={{
                fontSize: "1.8rem",
                marginBottom: "1rem",
                color: colors.textDark,
                fontWeight: 600,
              }}
            >
              Napisz do nas!
            </h3>
            <p
              style={{
                fontSize: "1.1rem",
                color: colors.textLight,
                lineHeight: "1.6",
              }}
            >
              Skontaktuj się z nami przez social media lub telefonicznie.
              Odpowiadamy na każdą wiadomość! 💬
            </p>
          </div>

          {/* Grid z social media */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
          >
            {/* Instagram */}
            {contact.social.instagram && (
              <div
                onClick={() => handleSocialClick(contact.social.instagram)}
                style={{
                  background:
                    "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  padding: "2rem 1.5rem",
                  borderRadius: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  color: "white",
                  boxShadow: colors.shadowMd,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(188, 24, 136, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = colors.shadowMd;
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "0.8rem" }}>
                  📷
                </div>
                <h4
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    marginBottom: "0.3rem",
                  }}
                >
                  Instagram
                </h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                  Nasze realizacje
                </p>
              </div>
            )}

            {/* Facebook */}
            {contact.social.facebook && (
              <div
                onClick={() => handleSocialClick(contact.social.facebook)}
                style={{
                  background:
                    "linear-gradient(135deg, #4267B2 0%, #3b5998 100%)",
                  padding: "2rem 1.5rem",
                  borderRadius: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  color: "white",
                  boxShadow: colors.shadowMd,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(59, 89, 152, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = colors.shadowMd;
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "0.8rem" }}>
                  👍
                </div>
                <h4
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    marginBottom: "0.3rem",
                  }}
                >
                  Facebook
                </h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>Polub nas</p>
              </div>
            )}

            {/* TikTok */}
            {contact.social.tiktok && (
              <div
                onClick={() => handleSocialClick(contact.social.tiktok)}
                style={{
                  background:
                    "linear-gradient(135deg, #000000 0%, #ee1d52 50%, #69c9d0 100%)",
                  padding: "2rem 1.5rem",
                  borderRadius: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  color: "white",
                  boxShadow: colors.shadowMd,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(238, 29, 82, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = colors.shadowMd;
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "0.8rem" }}>
                  🎵
                </div>
                <h4
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    marginBottom: "0.3rem",
                  }}
                >
                  TikTok
                </h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>Nasze filmy</p>
              </div>
            )}

            {/* Telefon */}
            <div
              onClick={handlePhoneClick}
              style={{
                background: colors.gradient2,
                padding: "2rem 1.5rem",
                borderRadius: "20px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: "white",
                boxShadow: colors.shadowMd,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px) scale(1.05)";
                e.currentTarget.style.boxShadow = colors.shadowLg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = colors.shadowMd;
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "0.8rem" }}>📱</div>
              <h4
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  marginBottom: "0.3rem",
                }}
              >
                Zadzwoń
              </h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                {contact.phone}
              </p>
            </div>
          </div>

          {/* Dodatkowa informacja */}
          <div
            style={{
              padding: "1.5rem",
              background: colors.lightPink,
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: colors.textDark,
                fontSize: "1rem",
                lineHeight: "1.6",
              }}
            >
              💝 Odpowiadamy najszybciej na Instagramie i telefonicznie!
            </p>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsywność */
        @media (max-width: 768px) {
          #kontakt > div:nth-of-type(2) > div:last-child > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
