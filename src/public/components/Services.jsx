import { useEffect, useRef } from 'react';
import useSalonConfig from '../hooks/useSalonConfig';

const Services = () => {
  const { services, colors } = useSalonConfig();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="uslugi"
      ref={sectionRef}
      style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        background: colors.lighterPink,
      }}
    >
      {/* Section Title */}
      <h2
        className="fade-in"
        style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          marginBottom: '3rem',
          background: colors.gradient2,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Nasze Usługi
      </h2>

      {/* Services Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="fade-in service-card"
            style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '25px',
              boxShadow: colors.shadowMd,
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
              e.currentTarget.style.boxShadow = colors.shadowLg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = colors.shadowMd;
            }}
          >
            {/* Decorative gradient background */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: colors.gradient2,
              }}
            />

            {/* Service Icon */}
            <div
              style={{
                fontSize: '4rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              {service.icon}
            </div>

            {/* Service Title */}
            <h3
              style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: colors.textDark,
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              {service.title}
            </h3>

            {/* Service Description */}
            <p
              style={{
                color: colors.textLight,
                lineHeight: '1.6',
                textAlign: 'center',
                marginBottom: '1.5rem',
                minHeight: '4.8rem',
              }}
            >
              {service.description}
            </p>

            {/* Service Price */}
            <div
              style={{
                textAlign: 'center',
                padding: '0.75rem 1.5rem',
                background: colors.lightPink,
                borderRadius: '15px',
                fontWeight: 600,
                fontSize: '1.1rem',
                color: colors.primary,
                marginTop: 'auto',
              }}
            >
              {service.price}
            </div>
          </div>
        ))}
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

        .service-card {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </section>
  );
};

export default Services;
