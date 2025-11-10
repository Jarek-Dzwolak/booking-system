import useSalonConfig from '../public/hooks/useSalonConfig';

const DashboardLayout = () => {
  const { businessName, colors } = useSalonConfig();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.lighterPink,
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          textAlign: 'center',
          background: 'white',
          padding: '3rem',
          borderRadius: '25px',
          boxShadow: colors.shadowLg,
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            background: colors.gradient2,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Panel Administracyjny
        </h1>
        <h2
          style={{
            fontSize: '1.5rem',
            color: colors.textDark,
            marginBottom: '2rem',
          }}
        >
          {businessName}
        </h2>
        <p
          style={{
            fontSize: '1.2rem',
            color: colors.textLight,
            lineHeight: '1.8',
          }}
        >
          Panel administracyjny jest w przygotowaniu. 
          <br />
          Wkrótce będziesz mógł zarządzać swoim salonem z tego miejsca.
        </p>

        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: colors.lightPink,
            borderRadius: '15px',
          }}
        >
          <p style={{ color: colors.textDark, fontWeight: 500 }}>
            🚀 Planowane funkcje:
          </p>
          <ul
            style={{
              marginTop: '1rem',
              textAlign: 'left',
              color: colors.textLight,
              lineHeight: '2',
            }}
          >
            <li>Zarządzanie rezerwacjami</li>
            <li>Edycja usług i cenników</li>
            <li>Kalendarz wizyt</li>
            <li>Statystyki i raporty</li>
            <li>Zarządzanie klientami</li>
          </ul>
        </div>

        <a
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '2rem',
            padding: '1rem 2rem',
            background: colors.gradient2,
            color: 'white',
            textDecoration: 'none',
            borderRadius: '50px',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: colors.shadowMd,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = colors.shadowLg;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = colors.shadowMd;
          }}
        >
          Powrót do strony głównej
        </a>
      </div>
    </div>
  );
};

export default DashboardLayout;
