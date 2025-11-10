import { useConfig } from "../../hooks/useConfig";

const Services = () => {
  const config = useConfig();
  const { business, services, colors } = config;

  // Grupowanie usług po kategorii
  const servicesByCategory = services.reduce((acc, service) => {
    const category = service.category || "Inne";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

  return (
    <section id="services" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Nagłówek */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Nasze Usługi
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Profesjonalne usługi dostosowane do Twoich potrzeb
          </p>
        </div>

        {/* Usługi pogrupowane */}
        {Object.entries(servicesByCategory).map(
          ([category, categoryServices]) => (
            <div key={category} className="mb-12">
              {/* Nazwa kategorii */}
              <h3
                className="text-2xl font-bold mb-6 pb-2 border-b-2"
                style={{
                  color: colors.primary,
                  borderColor: colors.primary,
                }}
              >
                {category}
              </h3>

              {/* Grid usług */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-transparent hover:border-current"
                    style={{ "--tw-border-opacity": 0.2 }}
                  >
                    {/* Header karty */}
                    <div
                      className="p-4 text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <h4 className="text-xl font-bold">{service.name}</h4>
                    </div>

                    {/* Treść karty */}
                    <div className="p-6">
                      {/* Opis */}
                      {service.description && (
                        <p className="text-gray-600 mb-4 text-sm">
                          {service.description}
                        </p>
                      )}

                      {/* Info */}
                      <div className="flex justify-between items-center">
                        {/* Czas */}
                        <div className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm">
                            {service.duration} min
                          </span>
                        </div>

                        {/* Cena */}
                        <div
                          className="text-2xl font-bold"
                          style={{ color: colors.primary }}
                        >
                          {service.price} zł
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          href={`tel:${business.phone.replace(/\s/g, "")}`}
          className="inline-block px-8 py-4 rounded-full font-semibold text-lg
          text-white transition-all duration-300 transform hover:scale-105
          shadow-lg" style={{ backgroundColor: colors.primary }}
          <a>📞 Umów się: {business.phone}</a>
        </div>
      </div>
    </section>
  );
};

export default Services;
