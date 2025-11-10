import { useMemo } from 'react';
import salonConfig from '../config/salonConfig';

/**
 * Custom Hook do zarządzania konfiguracją salonu
 * 
 * Użycie:
 * const { colors, services, contact, hero, applyColors } = useSalonConfig();
 * 
 * Możesz również nadpisać domyślną konfigurację:
 * const config = useSalonConfig({ 
 *   colors: { primary: '#ff0000' } 
 * });
 */
export const useSalonConfig = (overrides = {}) => {
  // Łączenie domyślnej konfiguracji z nadpisaniami
  const config = useMemo(() => {
    return {
      ...salonConfig,
      ...overrides,
      colors: {
        ...salonConfig.colors,
        ...(overrides.colors || {}),
      },
      hero: {
        ...salonConfig.hero,
        ...(overrides.hero || {}),
      },
      contact: {
        ...salonConfig.contact,
        ...(overrides.contact || {}),
      },
      services: overrides.services || salonConfig.services,
      about: {
        ...salonConfig.about,
        ...(overrides.about || {}),
      },
    };
  }, [overrides]);

  // Funkcja do aplikowania kolorów do CSS Variables
  const applyColors = () => {
    const root = document.documentElement;
    Object.entries(config.colors).forEach(([key, value]) => {
      // Konwertuj camelCase na kebab-case
      const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVarName}`, value);
    });
  };

  // Funkcja pomocnicza do pobierania usługi po ID
  const getServiceById = (id) => {
    return config.services.find(service => service.id === id);
  };

  // Funkcja pomocnicza do pobierania usług po kategorii
  const getServicesByCategory = (category) => {
    return config.services.filter(service => service.category === category);
  };

  // Funkcja pomocnicza do formatowania godzin otwarcia
  const getFormattedOpeningHours = () => {
    return config.contact.openingHours.display
      .map(item => `${item.days}: ${item.hours}`)
      .join('\n');
  };

  return {
    // Zwracamy całą konfigurację
    ...config,
    
    // Funkcje pomocnicze
    applyColors,
    getServiceById,
    getServicesByCategory,
    getFormattedOpeningHours,
  };
};

export default useSalonConfig;
