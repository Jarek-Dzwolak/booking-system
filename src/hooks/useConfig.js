import { CLIENT_CONFIG } from "../config/client.config";

/**
 * Hook zwracający konfigurację klienta
 * Używaj w każdym komponencie zamiast importować config bezpośrednio
 */
export const useConfig = () => {
  return CLIENT_CONFIG;
};
