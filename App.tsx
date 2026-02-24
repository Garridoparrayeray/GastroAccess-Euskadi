import React, { useState, useMemo } from 'react';
import { useRestaurants } from './hooks/useRestaurants';
import MapComponent from './components/MapComponent';
import RestaurantCard from './components/RestaurantCard';
import { Map as MapIcon, List, Navigation2, Search, Utensils, MapPin, Award, ChevronUp, ChevronDown } from 'lucide-react';
import { Restaurant, UserLocation } from './types';

const App = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMunicipality, setFilterMunicipality] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterAccess, setFilterAccess] = useState(''); 
  const [showFilters, setShowFilters] = useState(true);

  const { restaurants, loading } = useRestaurants(userLocation);

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
      const matchesAccess = filterAccess === '' || r.accessScore === filterAccess; 
      
      return matchesSearch && matchesMunicipality && matchesType && matchesAccess;
    });
  }, [restaurants, searchQuery, filterMunicipality, filterType, filterAccess]);

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setViewMode('list');
      },
      () => alert("No se pudo obtener la ubicación.")
    );
  };

  const handleGoHome = () => {
    setViewMode('map');
    setSelectedRestaurant(null);
    setFilterAccess('');
    setSearchQuery('');
    setFilterMunicipality('');
    setFilterType('');
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
      <p className="text-slate-900 font-bold">Kargatzen...</p>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Header - Tamaño Medio */}
      <header className="bg-white border-b-2 border-emerald-600 px-5 py-3 flex items-center justify-between z-20 shrink-0 shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleGoHome}>
          <div className="bg-emerald-600 p-2 rounded-xl group-hover:bg-red-600 transition-colors shadow-md">
            <Utensils className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">GASTROACCESS</h1>
            <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">Euskadi Irisgarria</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all border border-slate-200"
          >
            {showFilters ? <ChevronUp size={16} /> : <Search size={16} />}
            <span className="hidden sm:inline">{showFilters ? 'Ezkutatu' : 'Bilatu'}</span>
          </button>
          
          <button 
            onClick={handleNearMe}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-black text-sm border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            <Navigation2 size={16} />
            <span className="hidden sm:inline">Gertu</span>
          </button>
        </div>
      </header>

      {/* Filters Area - Tamaño Medio */}
      {showFilters && (
        <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 z-20 flex flex-col gap-4 shrink-0 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Bilatu jatetxea..."
                className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select 
                className="h-11 px-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 flex-1 md:w-48 focus:border-emerald-500 outline-none shadow-sm cursor-pointer"
                value={filterMunicipality}
                onChange={(e) => setFilterMunicipality(e.target.value)}
              >
                <option value="">Euskadi Osoa</option>
                {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select 
                className="h-11 px-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 flex-1 md:w-48 focus:border-emerald-500 outline-none shadow-sm cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Mota guztiak</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setFilterAccess('')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filterAccess === '' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'}`}
            >
              GUZTIAK
            </button>
            <button 
              onClick={() => setFilterAccess('Oro')}
              className={`px-4 py-2 rounded-xl text-xs font-black border transition-all flex items-center gap-2 ${filterAccess === 'Oro' ? 'bg-emerald-600 text-white border-emerald-700 shadow-md' : 'bg-white text-emerald-700 border-emerald-100 hover:bg-emerald-50'}`}
            >
              🥇 URREA
            </button>
            <button 
              onClick={() => setFilterAccess('Plata')}
              className={`px-4 py-2 rounded-xl text-xs font-black border transition-all flex items-center gap-2 ${filterAccess === 'Plata' ? 'bg-slate-500 text-white border-slate-600 shadow-md' : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'}`}
            >
              🥈 ZILARRA
            </button>
            <div className="flex-1 text-right text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
               {filteredRestaurants.length} JATETXE
            </div>
          </div>
        </div>
      )}

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
          <div className="h-full overflow-y-auto bg-slate-100 p-5 space-y-4">
              {filteredRestaurants.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200 max-w-lg mx-auto mt-10">
                  <Search size={48} className="mx-auto text-slate-200 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900">Ez dago emaitzarik</h3>
                  <p className="text-slate-500 text-sm">Proba ezazu iragazkiak aldatzen.</p>
                </div>
              ) : (
                filteredRestaurants.map((rest, i) => (
                  <div 
                    key={i} 
                    className="bg-white w-full max-w-4xl mx-auto p-5 rounded-2xl shadow-sm border-2 border-transparent hover:border-emerald-500 transition-all cursor-pointer flex justify-between items-center gap-4 group"
                    onClick={() => { setSelectedRestaurant(rest); setViewMode('map'); }}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-base text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">{rest.documentName}</h3>
                        <span className="text-[9px] px-2 py-0.5 rounded-lg font-black bg-slate-100 text-slate-600 border border-slate-200">
                          {rest.accessScore.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
                        <MapPin size={14} className="text-red-500" /> {rest.municipality} • {rest.restorationType}
                      </div>
                    </div>
                    {rest.distance && (
                      <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-black shrink-0 border border-emerald-100">
                        {rest.distance.toFixed(1)} km
                      </div>
                    )}
                  </div>
                ))
              )}
          </div>
        )}

        {/* Tarjeta de detalle flotante */}
        {selectedRestaurant && (
          <div className="absolute inset-x-0 bottom-28 z-50 p-4 flex justify-center pointer-events-none">
            <div className="w-full max-w-lg pointer-events-auto animate-in slide-in-from-bottom-10 duration-300">
               <RestaurantCard 
                 restaurant={selectedRestaurant} 
                 onClose={() => setSelectedRestaurant(null)} 
               />
            </div>
          </div>
        )}
      </main>

      {/* Nav Flotante Equilibrado */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 flex bg-slate-900 p-1.5 rounded-3xl shadow-2xl z-40 border border-white/10">
        <button 
          onClick={() => setViewMode('map')}
          className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs transition-all ${viewMode === 'map' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <MapIcon size={18} /> MAPA
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs transition-all ${viewMode === 'list' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <List size={18} /> ZERRENDA
        </button>
      </nav>
    </div>
  );
};

export default App;