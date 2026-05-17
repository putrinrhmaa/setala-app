import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { Wallet, MapPin, Star, CheckCircle2, ChevronRight, Info, ArrowRightLeft, LocateFixed, TriangleAlert, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../constants';
import { useLocation } from '../contexts/LocationContext';
import { calculateDistance } from '../utils';

export const Comparison = () => {
  const { userLocation, isLoading, error, requestLocation } = useLocation();
  const [searchParams] = useSearchParams();
  
  const selectedIds = useMemo(() => {
    const ids = searchParams.get('ids');
    return ids ? ids.split(',') : [];
  }, [searchParams]);

  const comparedDestinations = useMemo(() => {
    let list = DESTINATIONS;
    
    if (selectedIds.length > 0) {
      list = selectedIds.map(id => DESTINATIONS.find(d => d.id === id)).filter(Boolean) as typeof DESTINATIONS;
    } else {
      list = DESTINATIONS.slice(0, 3);
    }

    return list.map(dest => {
      let distance = 0;
      if (userLocation) {
        distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          dest.coordinates.lat,
          dest.coordinates.lng
        );
      }
      return { ...dest, calculatedDistance: distance };
    });
  }, [userLocation, selectedIds]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Bandingkan Destinasi</h1>
        <p className="text-lg text-on-surface-variant">Evaluasi pilihan perjalanan Anda berdampingan untuk menemukan destinasi yang paling sesuai dengan preferensi Anda.</p>
        
        {!userLocation && (
          <div className="flex flex-col items-center gap-3">
            <button 
              type="button"
              onClick={requestLocation}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 active:scale-95"
            >
              <LocateFixed className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Mendeteksi Lokasi...' : 'Deteksi Lokasi Saya'}
            </button>
            {error && (
              <p className="text-sm text-error font-medium bg-error/10 px-4 py-2 rounded-lg">{error}</p>
            )}
          </div>
        )}

        {selectedIds.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-800 text-sm font-medium">
            <TriangleAlert className="w-5 h-5 shrink-0" />
            <span>Pilih destinasi dari halaman Peringkat untuk membandingkan pilihan spesifik Anda.</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto pb-10">
        <div className={`min-w-[800px] grid gap-6 items-start`} style={{ gridTemplateColumns: `repeat(${comparedDestinations.length}, 1fr)` }}>
          {comparedDestinations.map(dest => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
            >
              <div className="h-48 relative">
                <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                </div>
              </div>

              <div className="p-5 space-y-6 flex-grow">
                {/* Budget */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 px-1">
                    <Wallet className="w-3 h-3" /> Budget Estimasi
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <span className="text-sm font-bold text-secondary">
                      {dest.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}
                    </span>
                    {dest.id === '1' && (
                      <div className="mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-secondary" />
                        <span className="text-[9px] font-bold text-secondary uppercase tracking-tighter">Pilihan Hemat</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Distance */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 px-1">
                    <MapPin className="w-3 h-3" /> Jarak dari Anda
                  </div>
                  <div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex items-center justify-center">
                    {userLocation ? (
                      <span className="text-sm font-bold text-on-surface">{dest.calculatedDistance} km</span>
                    ) : (
                      <span className="text-[10px] text-on-surface-variant italic">Lokasi belum aktif</span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 px-1">
                    <Star className="w-3 h-3" /> Rating Pengunjung
                  </div>
                  <div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-on-surface">{dest.rating} / 5</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link to={`/detail/${dest.id}`} className="w-full bg-primary text-on-primary font-bold text-sm py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md flex justify-center items-center gap-2">
                  Lihat Detail Lengkap
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
