import { useConfig } from "../../hooks/useConfig";

const Hero = () => {
  const config = useConfig();
  const { business, colors } = config;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/hero.jpg)",
        backgroundColor: colors.secondary,
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: "rgba(50, 50, 50, 0.7)",
          zIndex: 1,
        }}
      ></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <img
            src="/images/logo.png"
            alt={business.name}
            className="h-20 w-auto mx-auto md:h-24 lg:h-32 "
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          {business.name}
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 font-light">
          {business.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={"tel:" + business.phone.replace(/\s/g, "")}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{
              backgroundColor: colors.primary,
              color: "white",
            }}
          >
            Zadzwoń: {business.phone}
          </a>

          {config.social && config.social.whatsapp && (
            <a
              href={"https://wa.me/" + config.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg border-2 transition-all duration-300 transform hover:scale-105 shadow-lg bg-white"
              style={{
                borderColor: colors.primary,
                color: colors.primary,
              }}
            >
              WhatsApp
            </a>
          )}
        </div>

        <div className="mt-12 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
