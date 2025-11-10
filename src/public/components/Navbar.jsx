import { useState, useEffect } from 'react';
import useSalonConfig from '../hooks/useSalonConfig';

const Navbar = () => {
  const { businessName, navigation, colors } = useSalonConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: isScrolled ? '0.5rem 0' : '1rem 0',
        zIndex: 1000,
        boxShadow: isScrolled ? colors.shadowMd : colors.shadowSm,
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            background: colors.gradient2,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '1px',
          }}
        >
          {businessName}
        </div>

        {/* Desktop Navigation */}
        <ul
          style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
        >
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                style={{
                  textDecoration: 'none',
                  color: colors.textDark,
                  fontWeight: 500,
                  position: 'relative',
                  padding: '0.5rem 0',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = colors.textDark;
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: colors.textDark,
          }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="mobile-nav"
          style={{
            display: 'none',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            boxShadow: colors.shadowMd,
            padding: '1rem 0',
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: '0 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  style={{
                    textDecoration: 'none',
                    color: colors.textDark,
                    fontWeight: 500,
                    display: 'block',
                    padding: '0.5rem 0',
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile Styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
          .mobile-nav {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
