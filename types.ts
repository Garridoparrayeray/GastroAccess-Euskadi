export interface UserLocation {
  lat: number;
  lng: number;
}

export interface Restaurant {
  // Datos originales
  documentName: string;
  documentDescription: string;
  municipality: string;
  restorationType: string;
  physical: string;
  visual: string;
  auditive: string;
  phone: string;
  web: string;
  tourismEmail: string;

  // --- NUEVOS CAMPOS (GUÍAS) ---
  michelinStar?: string; // Ej: "1", "2", "3"
  repsolSun?: string;    // Ej: "1", "2", "3"

  // --- PROPIEDADES PROCESADAS ---
  id?: string;
  
  // Coordenadas
  latwgs84: number;
  lonwgs84: number;
  lat: number;
  lng: number;

  // Lógica de Negocio
  accessScore: 'Oro' | 'Plata' | 'Estándar'; // Añadimos 'Estándar' para los no accesibles
  distance?: number;

  // Flags booleanos
  isPhysical?: boolean;
  isVisual?: boolean;
  isAuditive?: boolean;
}