import { useState, useEffect, useRef, useCallback } from "react";
import useSalonConfig from "../hooks/useSalonConfig";

const Gallery = () => {
  const { gallery, colors } = useSalonConfig();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  // Intersection Observer dla lazy loading i animacji
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "50px 0px", // Załaduj zdjęcia 50px przed wejściem w viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animacja fade-in
          entry.target.classList.add("visible");

          // Lazy loading obrazów
          const img = entry.target.querySelector("img[data-src]");
          if (img && !loadedImages.has(img.dataset.src)) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            setLoadedImages((prev) => new Set([...prev, img.src]));
          }
        }
      });
    }, observerOptions);

    // Obserwuj elementy galerii
    const elements = sectionRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el));

    // Obserwuj obrazy
    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [loadedImages]);

  // Optymalizacja: Memoizowane funkcje
  const openLightbox = useCallback((image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  }, []);

  // Navigate w lightbox (prev/next)
  const navigateLightbox = useCallback(
    (direction) => {
      if (!selectedImage) return;

      const currentIndex = gallery.images.findIndex(
        (img) => img.id === selectedImage.id
      );
      let newIndex;

      if (direction === "next") {
        newIndex = (currentIndex + 1) % gallery.images.length;
      } else {
        newIndex =
          (currentIndex - 1 + gallery.images.length) % gallery.images.length;
      }

      setSelectedImage(gallery.images[newIndex]);
    },
    [selectedImage, gallery.images]
  );

  // Obsługa klawiatury
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          navigateLightbox("next");
          break;
        case "ArrowLeft":
          navigateLightbox("prev");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, closeLightbox, navigateLightbox]);

  // Preload sąsiednich obrazów w lightbox
  useEffect(() => {
    if (selectedImage) {
      const currentIndex = gallery.images.findIndex(
        (img) => img.id === selectedImage.id
      );
      const nextIndex = (currentIndex + 1) % gallery.images.length;
      const prevIndex =
        (currentIndex - 1 + gallery.images.length) % gallery.images.length;

      // Preload
      [gallery.images[nextIndex], gallery.images[prevIndex]].forEach((img) => {
        if (img) {
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.href = img.src;
          document.head.appendChild(link);
        }
      });
    }
  }, [selectedImage, gallery.images]);

  return (
    <section
      id="galeria"
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
          marginBottom: "1rem",
          background: colors.gradient2,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {gallery.title}
      </h2>

      <p
        className="fade-in"
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          color: colors.textLight,
          marginBottom: "4rem",
          maxWidth: "700px",
          margin: "0 auto 4rem",
          lineHeight: "1.6",
        }}
      >
        {gallery.subtitle}
      </p>

      {/* Gallery Grid - Responsive dla 6-9 zdjęć */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        {gallery.images.map((image, index) => (
          <div
            key={image.id}
            ref={(el) => (imageRefs.current[index] = el)}
            className="fade-in gallery-item"
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: "20px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: colors.shadowMd,
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              willChange: "transform",
            }}
            onClick={() => openLightbox(image)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.boxShadow = colors.shadowLg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = colors.shadowMd;
            }}
          >
            {/* Image with Lazy Loading */}
            <img
              data-src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
                backgroundColor: colors.lightPink,
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            />

            {/* Overlay with gradient */}
            <div
              className="gallery-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "2rem 1.5rem",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <h3
                style={{
                  color: "white",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                {image.title}
              </h3>
              {image.description && (
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.95)",
                    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                    lineHeight: "1.5",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {image.description}
                </p>
              )}
              <div
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.85rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 500,
                }}
              >
                Kliknij aby powiększyć 🔍
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "2rem",
            animation: "fadeIn 0.3s ease",
          }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            aria-label="Zamknij"
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "white",
              fontSize: "2rem",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              zIndex: 10001,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "rotate(90deg) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "rotate(0deg) scale(1)";
            }}
          >
            ✕
          </button>

          {/* Navigation Buttons */}
          {gallery.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("prev");
                }}
                aria-label="Poprzednie zdjęcie"
                style={{
                  position: "absolute",
                  left: "2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                  fontSize: "2rem",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  zIndex: 10001,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.3)";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("next");
                }}
                aria-label="Następne zdjęcie"
                style={{
                  position: "absolute",
                  right: "2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                  fontSize: "2rem",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  zIndex: 10001,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.3)";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                ›
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "15px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                animation: "zoomIn 0.3s ease",
              }}
            />

            {/* Image Info */}
            <div
              style={{
                textAlign: "center",
                color: "white",
                maxWidth: "600px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: "1.6",
                  }}
                >
                  {selectedImage.description}
                </p>
              )}
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  marginTop: "1rem",
                }}
              >
                {gallery.images.findIndex(
                  (img) => img.id === selectedImage.id
                ) + 1}{" "}
                / {gallery.images.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive dla małych ekranów */
        @media (max-width: 768px) {
          .gallery-item {
            aspect-ratio: 1 / 1;
          }
          
          /* Ukryj navigation buttons na mobile */
          button[aria-label="Poprzednie zdjęcie"],
          button[aria-label="Następne zdjęcie"] {
            display: none !important;
          }
        }

        /* Optymalizacja dla różnej liczby zdjęć */
        @media (min-width: 769px) and (max-width: 1024px) {
          /* 2 kolumny dla tabletów */
          #galeria > div:last-of-type {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (min-width: 1025px) {
          /* 3 kolumny dla desktopów */
          #galeria > div:last-of-type {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Performance optimization */
        .gallery-item img {
          content-visibility: auto;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
