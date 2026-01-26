import React from 'react';
import { Restaurant } from '../types';
import { Phone, Globe, MapPin, AlertCircle, ShieldCheck, X, Star, Sun } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClose: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClose }) => {
  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`;
    window.open(url, '_blank');
  };

  const hasMichelin = restaurant.michelinStar && restaurant.michelinStar !== "" && restaurant.michelinStar !== "0";
  const hasRepsol = restaurant.repsolSun && restaurant.repsolSun !== "" && restaurant.repsolSun !== "0";

  // Función para determinar el estilo de la etiqueta de accesibilidad
  const getAccessBadge = () => {
    if (restaurant.accessScore === 'Oro') {
      return { text: 'Accesibilidad Total', className: 'bg-emerald-600 text-white' };
    }
    if (restaurant.accessScore === 'Plata') {
      return { text: 'Física Adaptada', className: 'bg-amber-500 text-white' };
    }
    // Caso Estándar
    return { text: 'Acceso Estándar', className: 'bg-slate-200 text-slate-500' };
  };

  const badge = getAccessBadge();

  return (
    <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl p-6 relative max-w-2xl mx-auto border-t-4 border-slate-300">
      <button 
        onClick={onClose}
        className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full h-11 w-11 flex items-center justify-center"
        aria-label="Cerrar detalles"
      >
        <X size={24} />
      </button>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Etiqueta Accesibilidad Corregida */}
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${badge.className}`}>
          {badge.text}
        </span>
        
        {hasMichelin && (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black border border-red-700 uppercase tracking-widest shadow-sm">
            <Star size={10} fill="currentColor" /> Michelin {restaurant.michelinStar}*
          </span>
        )}

        {hasRepsol && (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-[10px] font-black border border-yellow-500 uppercase tracking-widest shadow-sm">
            <Sun size={10} fill="currentColor" /> Soles Repsol: {restaurant.repsolSun}
          </span>
        )}
      </div>

      <h2 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
        {restaurant.documentName}
      </h2>
      
      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
        {restaurant.documentDescription || "Sin descripción disponible."}
      </p>

      {/* ... resto del componente igual ... */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
          <MapPin className="text-emerald-500" size={20} />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Ubicación</span>
            <span className="text-sm font-bold text-slate-700">{restaurant.municipality}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
          <ShieldCheck className="text-emerald-500" size={20} />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Categoría</span>
            <span className="text-sm font-bold text-slate-700">{restaurant.restorationType}</span>
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

      <p className="mt-6 text-center text-slate-400 text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2">
        <AlertCircle size={12} /> Datos verificados por GastroAccess
      </p>
    </div>
  );
};

export default RestaurantCard;