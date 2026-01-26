import React from 'react';
import { Restaurant } from '../types';
import { Phone, Globe, MapPin } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClose: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClose }) => {
  const handleDirections = () => {
    const url = `http://maps.google.com/?q=${restaurant.lat},${restaurant.lng}`;
    window.open(url, '_blank');
  };

  // Función para determinar el estilo de la etiqueta de accesibilidad
  const getAccessBadge = () => {
    if (restaurant.accessScore === 'Oro') {
      return { text: 'Accesibilidad Total', className: 'bg-emerald-600 text-white' };
    }
    if (restaurant.accessScore === 'Plata') {
      // Cambio de texto: ya no garantizamos que sea física, solo que tiene "algo"
      return { text: 'Accesibilidad Parcial', className: 'bg-amber-500 text-white' };
    }
    // Caso Estándar
    return { text: 'Acceso Estándar', className: 'bg-slate-200 text-slate-500' };
  };

  const badge = getAccessBadge();

  return (
    <div className="bg-white rounded-t-3xl shadow-2xl p-6 animate-slide-up max-h-[85vh] overflow-y-auto w-full max-w-md mx-auto relative">
      <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${badge.className}`}>
            {badge.text}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-1">{restaurant.documentName}</h2>
          <p className="text-slate-500 text-sm">{restaurant.municipality}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <span className="sr-only">Cerrar</span>
          <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
            {restaurant.documentDescription || "Sin descripción disponible."}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {restaurant.michelinStar && restaurant.michelinStar !== "0" && (
             <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-semibold flex items-center gap-1">
               ⭐ Michelin: {restaurant.michelinStar}
             </span>
          )}
          {restaurant.repsolSun && restaurant.repsolSun !== "0" && (
             <span className="px-3 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded-lg text-sm font-semibold flex items-center gap-1">
               ☀️ Soles Repsol: {restaurant.repsolSun}
             </span>
          )}
          <div className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-lg text-sm font-medium">
             {restaurant.restorationType}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {restaurant.phone && (
          <a 
            href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
            className="flex-1 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-slate-800 transition-all active:scale-95"
          >
            <Phone size={20} /> Llamar
          </a>
        )}
        
        <button 
          onClick={handleDirections}
          className="flex-1 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-emerald-700 transition-all active:scale-95"
        >
          <MapPin size={20} /> Guíame
        </button>

        {restaurant.web && (
          <a 
            href={restaurant.web}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-14 border-2 border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-slate-50 transition-all active:scale-95"
          >
            <Globe size={20} /> Web
          </a>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;