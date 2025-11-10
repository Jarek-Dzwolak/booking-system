import { useEffect, useRef } from 'react';
import useSalonConfig from '../hooks/useSalonConfig';

const About = () => {
  const { about, colors, description } = useSalonConfig();
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
      id="o-nas"
      ref={sectionRef}
      style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
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
        {about.title}
      </h2>

      {/* Description */}
      <div
        className="fade-in"
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 4rem',
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: colors.textLight,
        }}
      >
        <p>{about.description}</p>
        <p style={{ marginTop: '1rem' }}>{description}</p>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '3rem',
        }}
      >
        {about.features.map((feature, index) => (
          <div
            key={index}
            className="fade-in"
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: colors.shadowMd,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = colors.shadowLg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = colors.shadowMd;
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              {feature.icon}
            </div>
            <h3
              style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
                color: colors.textDark,
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                color: colors.textLight,
                lineHeight: '1.6',
              }}
            >
              {feature.description}
            </p>
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
      `}</style>
    </section>
  );
};

export default About;
