import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { SlidersHorizontal, MapPin, Star, Wallet, CheckCircle2, ArrowRightLeft, Heart, ChevronRight, Edit3, LocateFixed, ArrowRight, Hotel } from 'lucide-react';
import { DESTINATIONS } from '../constants';
import { useFavorites } from '../contexts/FavoritesContext';

import { calculateDistance } from '../utils';
import { useLocation } from '../contexts/LocationContext';

export const Results = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userLocation, isLoading, error, requestLocation } = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Get weights from URL or use defaults
  const weights = {
    budget: parseInt(searchParams.get('b') || '40'),
    distance: parseInt(searchParams.get('d') || '30'),
    rating: parseInt(searchParams.get('r') || '30')
  };

  React.useEffect(() => {
    if (!userLocation) {
      requestLocation();
    }
  }, [userLocation, requestLocation]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id].slice(0, 4)
    );
  };

  const rankedDestinations = React.useMemo(() => {
    // 1. Calculate distances first
    const withDistance = DESTINATIONS.map(dest => {
      let dist = 0;
      if (userLocation) {
        dist = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          dest.coordinates.lat,
          dest.coordinates.lng
        );
      }
      return { ...dest, distanceCalc: dist };
    });

    // 2. Find normalization ranges
    const maxRating = Math.max(...withDistance.map(d => d.rating));
    const minRating = Math.min(...withDistance.map(d => d.rating));
    const maxPrice = Math.max(...withDistance.map(d => d.price));
    const minPrice = Math.min(...withDistance.map(d => d.price));
    
    const distances = withDistance.map(d => d.distanceCalc).filter(d => d > 0);
    const maxDist = distances.length > 0 ? Math.max(...distances) : 1;
    const minDist = distances.length > 0 ? Math.min(...distances) : 0;

    // 3. Score calculation
    const withScores = withDistance.map(d => {
      // Benefit normalization: (current - min) / (max - min)
      const nRating = (d.rating - minRating) / (maxRating - minRating || 1);
      
      // Cost normalization: (max - current) / (max - min)
      const nPrice = (maxPrice - d.price) / (maxPrice - minPrice || 1);
      const nDist = userLocation && d.distanceCalc > 0 
        ? (maxDist - d.distanceCalc) / (maxDist - minDist || 1)
        : 0.5;

      const score = (
        (weights.rating * nRating) + 
        (weights.budget * nPrice) + 
        (weights.distance * nDist)
      );

      return { ...d, calculatedScore: Math.round(score) };
    });

    return withScores.sort((a, b) => b.calculatedScore - a.calculatedScore);
  }, [userLocation, weights]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Hasil Rekomendasi Destinasi</h1>
        <p className="text-lg text-on-surface-variant mt-3 max-w-3xl">Berdasarkan preferensi Anda, berikut adalah urutan destinasi yang paling cocok. Jarak dihitung dari lokasi terdeteksi Anda.</p>
        {!userLocation ? (
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button 
              type="button"
              onClick={requestLocation}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 active:scale-95"
            >
              <LocateFixed className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Mendeteksi Lokasi...' : 'Aktifkan Deteksi Lokasi'}
            </button>
            {error && <p className="text-sm text-error font-medium bg-error/10 px-4 py-2 rounded-lg italic">Gagal: {error}</p>}
            {!isLoading && !error && <p className="text-sm text-amber-600 font-semibold italic">Catatan: Deteksi lokasi belum aktif, jarak tampil sebagai 0km.</p>}
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2 text-sm text-secondary font-bold bg-secondary/10 w-fit px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            Lokasi Berhasil Terdeteksi
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar: Criteria Weights */}
        <aside className="col-span-1 md:col-span-4 lg:col-span-3">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-on-surface mb-8 flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5 text-secondary" />
              Bobot Kriteria
            </h2>
            
            <div className="space-y-8">
              {[
                { label: 'Anggaran', weight: weights.budget, color: 'bg-secondary', icon: Wallet },
                { label: 'Rating', weight: weights.rating, color: 'bg-primary-container', icon: Star },
                { label: 'Jarak', weight: weights.distance, color: 'bg-surface-tint', icon: MapPin }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-3 h-3 text-secondary" />
                      <span className="text-sm font-semibold text-on-surface-variant">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">{item.weight}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${item.weight}%` }}></div>
                   </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-outline-variant">
              <Link to="/criteria" className="w-full py-3 px-4 border border-outline rounded-lg text-sm font-bold text-on-surface hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                <Edit3 className="w-4 h-4" />
                Ubah Kriteria
              </Link>
            </div>
          </div>
        </aside>

        {/* Destination List */}
        <div className="col-span-1 md:col-span-8 lg:col-span-9 flex flex-col gap-8">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Urutan Teratas (Kecocokan Tertinggi)</h2>
            <span className="text-xs text-secondary font-bold bg-secondary/10 px-3 py-1 rounded-full">Top {Math.min(5, rankedDestinations.length)} Rekomendasi</span>
          </div>

          {rankedDestinations.slice(0, 5).map((dest, idx) => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-surface-container-lowest border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row relative group ${selectedIds.includes(dest.id) ? 'border-secondary ring-2 ring-secondary/20' : 'border-outline-variant'} scale-100`}
            >
              <div className={`absolute top-4 left-4 ${idx === 0 ? 'bg-secondary' : idx < 3 ? 'bg-primary' : 'bg-outline'} text-on-primary rounded-full w-10 h-10 flex items-center justify-center font-bold z-10 shadow-md transform group-hover:scale-110 transition-transform`}>
                #{idx + 1}
              </div>
              
              <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
                <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => toggleFavorite(dest.id)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all z-20 backdrop-blur-md ${
                    isFavorite(dest.id)
                      ? 'bg-secondary text-white shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/40'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(dest.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-on-surface">{dest.name}</h3>
                    <div className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full border border-secondary/20">
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                      <span className="text-xs font-bold">{dest.calculatedScore}% Kecocokan</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                      <Wallet className="w-4 h-4 text-secondary" />
                      {dest.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}
                    </div>
                    <span className="text-outline-variant hidden sm:block">•</span>
                    <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                      <MapPin className="w-4 h-4 text-secondary" />
                      {dest.distanceCalc > 0 ? `${dest.distanceCalc.toLocaleString('id-ID')} km` : 'Mendeteksi Lokasi...'}
                    </div>
                    <span className="text-outline-variant hidden sm:block">•</span>
                    <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                      {dest.rating}/5
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {dest.tags.map(tag => (
                      <span key={tag} className="bg-surface-container-low border border-secondary/30 text-secondary px-2.5 py-1 rounded-md text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Link to={`/detail/${dest.id}`} className="text-sm font-bold text-secondary hover:underline flex items-center gap-1">
                      Lihat Detail
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <span className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">Bandingkan</span>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(dest.id)}
                        onChange={() => toggleSelect(dest.id)}
                        className="w-5 h-5 text-secondary border-outline rounded focus:ring-secondary focus:ring-offset-0" 
                      />
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedIds.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant shadow-2xl py-6 px-4 md:px-12 z-40"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-md text-on-surface font-semibold"><strong>{selectedIds.length}</strong> destinasi dipilih</span>
              <span className="text-outline-variant hidden md:inline">|</span>
              <span className="text-xs text-on-surface-variant hidden md:inline">Maksimal 4 destinasi untuk perbandingan</span>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={() => setSelectedIds([])}
                className="flex-1 md:flex-none py-2.5 px-6 border border-outline text-on-surface rounded-lg text-sm font-bold hover:bg-surface-container-low transition-colors"
              >
                Batal
              </button>
              <Link 
                to={`/compare?ids=${selectedIds.join(',')}`}
                className="flex-1 md:flex-none bg-primary text-on-primary py-2.5 px-8 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all shadow-md flex justify-center items-center gap-2"
              >
                <ArrowRightLeft className="w-5 h-5" />
                Bandingkan Sekarang
              </Link>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Spacer for floating bar */}
      {selectedIds.length > 0 && <div className="h-32"></div>}
    </div>
  );
};
