import { useState, useEffect, useMemo } from 'react';
import { Restaurant, UserLocation } from '../types';

export const useRestaurants = (userLocation: UserLocation | null) => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAccess = (val: string | undefined): boolean => {
    if (!val) return false;
    const s = String(val).toLowerCase().trim();
    // Es accesible solo si es "1" o tiene palabras positivas explícitas
    if (s === "1") return true;
    if (s.includes("practicable") || s.includes("adaptado") || s.includes("accesible")) {
      return !s.includes("no es");
    }
    return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data/restaurantes.json');
        if (!response.ok) throw new Error('No se pudo cargar el archivo de datos');
        
        const json = await response.json();
        
        const cleanData = json
          .map((item: any) => {
            const rawLat = String(item.latwgs84 || "").replace(',', '.').trim();
            const rawLng = String(item.lonwgs84 || "").replace(',', '.').trim();
            const lat = parseFloat(rawLat);
            const lng = parseFloat(rawLng);

            // Analizamos accesibilidad
            const isPhysical = checkAccess(item.physical);
            const isVisual = checkAccess(item.visual);
            const isAuditive = checkAccess(item.auditive);
            
            // LÓGICA MODIFICADA (OPCIÓN 1): Sistema de Puntos
            let accessScore: 'Oro' | 'Plata' | 'Estándar' = 'Estándar';
            
            // Contamos cuántas características de accesibilidad tiene (0 a 3)
            const featuresCount = [isPhysical, isVisual, isAuditive].filter(Boolean).length;

            if (featuresCount === 3) {
                accessScore = 'Oro';   // Tiene las 3 (Física + Visual + Auditiva)
            } else if (featuresCount > 0) {
                accessScore = 'Plata'; // Tiene al menos 1 de las 3
            }
            // Si es 0, se queda en Estándar

            return {
              ...item,
              latwgs84: lat, 
              lonwgs84: lng,
              lat: lat,
              lng: lng,
              accessScore,
              isPhysical,
              isVisual,
              isAuditive,
              michelinStar: item.michelinStar,
              repsolSun: item.repsolSun
            };
          })
          .filter((item: any) => 
            Number.isFinite(item.lat) && 
            Number.isFinite(item.lng) && 
            item.lat !== 0 && 
            item.lng !== 0
          );

        setData(cleanData);
      } catch (err) {
        console.error("Error cargando restaurantes:", err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const processedData = useMemo(() => {
    if (!userLocation) return data;
    const withDistance = data.map(rest => ({
      ...rest,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        rest.lat,
        rest.lng
      )
    }));
    return withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [data, userLocation]);

  return { restaurants: processedData, loading, error };
};