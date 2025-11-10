import { useState } from "react";
import { useConfig } from "../../hooks/useConfig";

const Navbar = () => {
  const config = useConfig();
  const { business, colors } = config;
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Strona główna", href: "#home" },
    { label: "Usługi", href: "#services" },
    { label: "Galeria", href: "#gallery" },
    { label: "Dojazd", href: "#location" },
  ];

  const scrollToSection = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      style={{ borderBottom: `3px solid ${colors.primary}` }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Nazwa - zawsze widoczne */}
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt={business.name}
              className="h-10 w-auto mr-3"
              onError={(e) => (e.target.style.display = "none")}
            />
            <span
              className="font-bold text-lg"
              style={{ color: colors.primary }}
            >
              {business.name}
            </span>
          </div>

          {/* Desktop Menu - linki obok siebie */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                style={{
                  color: colors.text || "#374151",
                }}
                onMouseEnter={(e) => (e.target.style.color = colors.primary)}
                onMouseLeave={(e) =>
                  (e.target.style.color = colors.text || "#374151")
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile/Tablet Hamburger - tylko ikona hamburgera */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: colors.primary }}
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile/Tablet Menu - odnośniki jeden pod drugim */}
        {isOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                style={{
                  color: colors.text || "#374151",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor =
                    colors.secondary || "#f3f4f6";
                  e.target.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = colors.text || "#374151";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
