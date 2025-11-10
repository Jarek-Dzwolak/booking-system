import { useState, useEffect, useRef } from 'react';
import useSalonConfig from '../hooks/useSalonConfig';

const Contact = () => {
  const { contact, colors } = useSalonConfig();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState('');
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tutaj możesz dodać rzeczywistą logikę wysyłania formularza
    setSubmitStatus('success');
    
    // Reset formularza po 3 sekundach
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setSubmitStatus('');
    }, 3000);
  };

  return (
    <section
      id="kontakt"
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
        Skontaktuj się z nami
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginTop: '3rem',
        }}
      >
        {/* Contact Information */}
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Address */}
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '15px',
              boxShadow: colors.shadowSm,
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ fontSize: '2rem' }}>📍</div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: colors.textDark }}>
                Adres
              </h3>
              <p style={{ color: colors.textLight, lineHeight: '1.6' }}>
                {contact.address.street}
                <br />
                {contact.address.city}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '15px',
              boxShadow: colors.shadowSm,
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ fontSize: '2rem' }}>📞</div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: colors.textDark }}>
                Telefon
              </h3>
              <p style={{ color: colors.textLight }}>{contact.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '15px',
              boxShadow: colors.shadowSm,
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ fontSize: '2rem' }}>📧</div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: colors.textDark }}>
                Email
              </h3>
              <p style={{ color: colors.textLight }}>{contact.email}</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '15px',
              boxShadow: colors.shadowSm,
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ fontSize: '2rem' }}>🕐</div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: colors.textDark }}>
                Godziny otwarcia
              </h3>
              {contact.openingHours.display.map((item, index) => (
                <p key={index} style={{ color: colors.textLight, lineHeight: '1.8' }}>
                  {item.days}: {item.hours}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className="fade-in"
          style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '25px',
            boxShadow: colors.shadowMd,
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: colors.textDark,
                  fontWeight: 500,
                }}
              >
                Imię i nazwisko
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: `2px solid ${colors.lightPink}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.lightPink)}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: colors.textDark,
                  fontWeight: 500,
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: `2px solid ${colors.lightPink}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.lightPink)}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="phone"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: colors.textDark,
                  fontWeight: 500,
                }}
              >
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: `2px solid ${colors.lightPink}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.lightPink)}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="message"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: colors.textDark,
                  fontWeight: 500,
                }}
              >
                Wiadomość
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: `2px solid ${colors.lightPink}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  resize: 'vertical',
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.lightPink)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: submitStatus === 'success' 
                  ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
                  : colors.gradient2,
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: colors.shadowMd,
              }}
              onMouseEnter={(e) => {
                if (submitStatus !== 'success') {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = colors.shadowLg;
                }
              }}
              onMouseLeave={(e) => {
                if (submitStatus !== 'success') {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = colors.shadowMd;
                }
              }}
            >
              {submitStatus === 'success' ? '✓ Wysłano!' : 'Wyślij wiadomość'}
            </button>
          </form>
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
      `}</style>
    </section>
  );
};

export default Contact;
