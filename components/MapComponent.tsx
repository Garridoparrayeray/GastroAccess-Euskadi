import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Restaurant, UserLocation } from '../types';

// --- NUEVO COMPONENTE: Fuerza la actualización del tamaño del mapa ---
// Esto soluciona el problema de que el mapa se quede gris o cortado al cargar
const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    // Da tiempo a que React pinte el contenedor con Tailwind antes de calcular el tamaño
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timeout);
  }, [map]);
  return null;
};
// --------------------------------------------------------------------

interface MapComponentProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelect: (restaurant: Restaurant) => void;
  userLocation: UserLocation | null;
}

// Custom icons to avoid default Leaflet path issues in React
const createIcon = (score: 'Oro' | 'Plata') => {
  const color = score === 'Oro' ? '#10b981' : '#f59e0b';
  return new L.DivIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
};

const UserIcon = new L.DivIcon({
  html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const ChangeView: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ 
  restaurants, 
  selectedRestaurant, 
  onSelect, 
  userLocation 
}) => {
  const defaultCenter: [number, number] = [43.15, -2.45]; // Centro aproximado de Euskadi
  const mapCenter: [number, number] = selectedRestaurant 
    ? [Number(selectedRestaurant.latwgs84), Number(selectedRestaurant.lonwgs84)]
    : (userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter);

  return (
    <div className="h-full w-full overflow-hidden">
      <MapContainer 
        center={defaultCenter} 
        zoom={9} 
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        {/* COMPONENTE RESIZER AÑADIDO AQUÍ */}
        <MapResizer />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={UserIcon}>
          </Marker>
        )}

       {/* Le añadimos un 'key' dinámico para que los pines se borren y se vuelvan a pintar al filtrar */}
        <MarkerClusterGroup chunkedLoading key={restaurants.map(r => r.documentName).join(',')}>
          {restaurants.map((rest, idx) => (
            <Marker 
              key={idx}
              position={[Number(rest.latwgs84), Number(rest.lonwgs84)]}
              icon={createIcon(rest.accessScore)}
              eventHandlers={{
                click: () => onSelect(rest),
              }}
            />
          ))}
        </MarkerClusterGroup>

        {(selectedRestaurant || userLocation) && (
          <ChangeView center={mapCenter} zoom={selectedRestaurant ? 15 : 12} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;