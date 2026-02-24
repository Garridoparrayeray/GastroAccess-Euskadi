import React from 'react';
import { Restaurant } from '../types';
import { X, Phone, Map as MapIcon, Globe, MessageSquarePlus, ChevronUp } from 'lucide-react';

interface Props {
  restaurant: Restaurant;
  onClose: () => void;
}

const RestaurantCard: React.FC<Props> = ({ restaurant, onClose }) => {
  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latwgs84},${restaurant.lonwgs84}`;
    window.open(url, '_blank');
  };

  const handleCrowdsourcing = () => {
    alert(`Eskerrik asko! \n\nLaster, formulario honen bidez "${restaurant.documentName}"-ri buruzko irisgarritasun informazioa bidali ahal izango duzu datu-basea osatzeko.`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
      <button 
        onClick={onClose}
        className="absolute right-4 top-4 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all z-10"
      >
        <X size={20} />
      </button>

      <div className="p-6">
        <div className="mb-3">
          <span className={`text-[10px] px-3 py-1 rounded-full font-black tracking-widest border-2 ${
            restaurant.accessScore === 'Oro' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
            restaurant.accessScore === 'Plata' ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-slate-50 text-slate-400 border-slate-100'
          }`}>
            {restaurant.accessScore === 'Oro' ? '🥇 URREA' : restaurant.accessScore === 'Plata' ? '🥈 ZILARRA' : 'ESTANDARRA'}
          </span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 leading-tight mb-2 pr-8">
          {restaurant.documentName}
        </h2>

        <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          {restaurant.municipality} • {restaurant.restorationType}
        </div>

        {/* Acciones principales */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a 
            href={restaurant.phone ? `tel:${restaurant.phone}` : '#'}
            className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm transition-colors ${
              restaurant.phone ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-50 text-slate-300 cursor-not-allowed'
            }`}
          >
            <Phone size={18} /> DEITU
          </a>

          <button 
            onClick={handleDirections}
            className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-2xl font-black text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all"
          >
            <MapIcon size={18} /> IRITSI
          </button>
        </div>

        {/* SECCIÓN DE CROWDSOURCING (PUNTOS EXTRA) */}
        <div className="pt-4 border-t border-dashed border-slate-200">
          <button 
            onClick={handleCrowdsourcing}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                <MessageSquarePlus size={18} />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-black leading-none uppercase">Lagundu iezaguzu</p>
                <p className="text-[10px] font-medium opacity-80">Informazioa gehitu edo aldatu</p>
              </div>
            </div>
            <ChevronUp size={16} className="rotate-90 opacity-50" />
          </button>
        </div>

        {restaurant.web && (
          <a 
            href={restaurant.web} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 mt-4 text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest"
          >
            <Globe size={14} /> Webgunea
          </a>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;