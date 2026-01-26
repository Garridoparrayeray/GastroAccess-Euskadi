
import React, { useState, useMemo } from 'react';
import { useRestaurants } from './hooks/useRestaurants';
import MapComponent from './components/MapComponent';
import RestaurantCard from './components/RestaurantCard';
import { Restaurant, UserLocation } from './types';
// Fixed: Added MapPin to the lucide-react imports to resolve the missing component error.
import { Map as MapIcon, List, Navigation2, Search, Filter, Utensils, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMunicipality, setFilterMunicipality] = useState('');
  const [filterType, setFilterType] = useState('');

  const { restaurants, loading, error } = useRestaurants(userLocation);

  const municipalities = useMemo(() => 
    Array.from(new Set(restaurants.map(r => r.municipality))).sort()
  , [restaurants]);

  const types = useMemo(() => 
    Array.from(new Set(restaurants.map(r => r.restorationType))).sort()
  , [restaurants]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const matchesSearch = r.documentName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMunicipality = !filterMunicipality || r.municipality === filterMunicipality;
      const matchesType = !filterType || r.restorationType === filterType;
      return matchesSearch && matchesMunicipality && matchesType;
    });
  }, [restaurants, searchQuery, filterMunicipality, filterType]);

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert("La geolocalización no está soportada por tu navegador.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setViewMode('list');
      },
      () => alert("No se pudo obtener tu ubicación.")
    );
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
      <p className="text-slate-900 font-bold animate-pulse">Cargando Guía Accesible...</p>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Utensils className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tighter leading-none uppercase">GastroAccess</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Euskadi Sinsorpresas</p>
          </div>
        </div>
        
        <button 
          onClick={handleNearMe}
          className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm border-2 border-emerald-100 hover:bg-emerald-100 transition-colors h-11"
          aria-label="Buscar restaurantes cerca de mí"
        >
          <Navigation2 size={16} />
          <span className="hidden sm:inline">Cerca de mí</span>
        </button>
      </header>

      {/* Filters Area */}
      <div className="bg-white px-4 py-3 shadow-sm z-20 flex flex-col gap-2 md:flex-row shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full h-11 pl-10 pr-4 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar por nombre de restaurante"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            className="h-11 px-4 bg-slate-100 border-none rounded-xl text-sm flex-1 md:w-48 appearance-none focus:ring-2 focus:ring-emerald-500 font-medium"
            value={filterMunicipality}
            onChange={(e) => setFilterMunicipality(e.target.value)}
            aria-label="Filtrar por municipio"
          >
            <option value="">Todo Euskadi</option>
            {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <select 
            className="h-11 px-4 bg-slate-100 border-none rounded-xl text-sm flex-1 md:w-48 appearance-none focus:ring-2 focus:ring-emerald-500 font-medium"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            aria-label="Filtrar por tipo de restauración"
          >
            <option value="">Cualquier tipo</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {viewMode === 'map' ? (
          <MapComponent 
            restaurants={filteredRestaurants} 
            selectedRestaurant={selectedRestaurant}
            onSelect={setSelectedRestaurant}
            userLocation={userLocation}
          />
        ) : (
          <div className="h-full overflow-y-auto p-4 space-y-4 pb-24">
            {filteredRestaurants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Search size={48} className="mb-4 opacity-20" />
                <p className="font-bold">No se encontraron resultados accesibles</p>
              </div>
            ) : (
              filteredRestaurants.map((rest, i) => (
                <div 
                  key={i} 
                  className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all cursor-pointer"
                  onClick={() => { setSelectedRestaurant(rest); setViewMode('map'); }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-slate-900 leading-tight pr-4">{rest.documentName}</h3>
                    <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                      rest.accessScore === 'Oro' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {rest.accessScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold mb-2">
                    <MapPin size={12} /> {rest.municipality}
                  </div>
                  {rest.distance && (
                    <div className="text-xs text-emerald-600 font-bold">
                      A {rest.distance.toFixed(1)} km de ti
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Selected Detail Overlay */}
        {selectedRestaurant && (
          <div className="absolute inset-x-0 bottom-0 z-50 px-4 pb-4 detail-drawer translate-y-0">
            <RestaurantCard 
              restaurant={selectedRestaurant} 
              onClose={() => setSelectedRestaurant(null)} 
            />
          </div>
        )}
      </main>

      {/* Floating Action Bar (Sticky Mobile Toggle) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex bg-slate-900 text-white p-1 rounded-full shadow-2xl z-40">
        <button 
          onClick={() => setViewMode('map')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${viewMode === 'map' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}
          aria-label="Ver en mapa"
        >
          <MapIcon size={20} />
          <span>Mapa</span>
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}
          aria-label="Ver en lista"
        >
          <List size={20} />
          <span>Lista</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
