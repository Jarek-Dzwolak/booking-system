import { useEffect } from 'react';
import useSalonConfig from '../hooks/useSalonConfig';

const Hero = () => {
  const { hero, colors, effects } = useSalonConfig();

  useEffect(() => {
    if (effects.parallaxHero) {
      const handleScroll = () => {
        const heroElement = document.querySelector('.hero-section');
        if (heroElement) {
          const scrolled = window.pageYOffset;
          heroElement.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [effects.parallaxHero]);

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.gradientHero,
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          content: '',
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-200px',
          right: '-200px',
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      <div
        style={{
          content: '',
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-150px',
          left: '-150px',
          animation: 'float 15s ease-in-out infinite reverse',
        }}
      />

      {/* Hero Content */}
      <div
        style={{
          textAlign: 'center',
          zIndex: 1,
          animation: 'fadeInUp 1s ease',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            marginBottom: '1rem',
            color: 'white',
            textShadow: '2px 2px 20px rgba(0, 0, 0, 0.1)',
            animation: 'fadeInUp 1s ease 0.2s both',
          }}
        >
          {hero.title}
        </h1>
        
        <p
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            marginBottom: '2rem',
            color: 'rgba(255, 255, 255, 0.95)',
            animation: 'fadeInUp 1s ease 0.4s both',
          }}
        >
          {hero.subtitle}
        </p>

        <a
          href={hero.ctaLink}
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector(hero.ctaLink);
            if (target) {
              const offset = 80;
              const targetPosition = target.offsetTop - offset;
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
              });
            }
          }}
          style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: 'white',
            color: colors.primary,
            textDecoration: 'none',
            borderRadius: '50px',
            fontWeight: 600,
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            boxShadow: colors.shadow3d,
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeInUp 1s ease 0.6s both',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 20px 50px rgba(255, 107, 157, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = colors.shadow3d;
          }}
        >
          {hero.ctaText}
        </a>
      </div>

      {/* Keyframes for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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
      `}</style>
    </section>
  );
};

export default Hero;
