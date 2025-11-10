import useSalonConfig from '../hooks/useSalonConfig';

const Footer = () => {
  const { businessName, tagline, colors } = useSalonConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: colors.gradient2,
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '1.1rem',
          marginBottom: '0.5rem',
          fontWeight: 500,
        }}
      >
        &copy; {currentYear} {businessName}. Wszystkie prawa zastrzeżone.
      </p>
      <p
        style={{
          fontSize: '1rem',
          opacity: 0.9,
        }}
      >
        {tagline}
      </p>
    </footer>
  );
};

export default Footer;
