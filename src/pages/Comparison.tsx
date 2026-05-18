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
      list = [];
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
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-4 md:py-8">
      {selectedIds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-low border border-outline-variant p-8 md:p-12 rounded-[32px] max-w-xl shadow-sm"
          >
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6">
              <TriangleAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-primary mb-4 uppercase tracking-tight">Perbandingan Tidak Tersedia</h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-8 font-medium">
              Anda belum memilih destinasi untuk dibandingkan. Silakan <span className="text-secondary font-bold">masukan bobot kriteria</span> terlebih dahulu dan pilih destinasi dari halaman Peringkat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/criteria" 
                className="bg-primary text-on-primary px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Setel Kriteria
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/explore" 
                className="bg-white text-primary border border-outline-variant px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container transition-all flex items-center justify-center gap-2"
              >
                Lihat Destinasi
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="overflow-x-auto pb-6">
            <div className={`min-w-[800px] grid gap-4 items-start`} style={{ gridTemplateColumns: `repeat(${comparedDestinations.length}, 1fr)` }}>
              {comparedDestinations.map(dest => (
                <motion.div 
                  key={dest.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
                >
                  <div className="h-40 relative">
                    <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                      <h3 className="text-lg font-bold text-white leading-tight">{dest.name}</h3>
                    </div>
                  </div>
    
                  <div className="p-4 space-y-4 flex-grow">
                    {/* Budget */}
                    <div className="space-y-1.5">
                      <div className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 px-0.5">
                        <Wallet className="w-2.5 h-2.5" /> Budget Estimasi
                      </div>
                      <div className="p-3 bg-surface-container-low rounded-xl">
                        <span className="text-xs font-bold text-secondary">
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
                    <div className="space-y-1.5">
                      <div className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 px-0.5">
                        <MapPin className="w-2.5 h-2.5" /> Jarak dari Anda
                      </div>
                      <div className="p-3 bg-surface rounded-xl border border-outline-variant/30 flex items-center justify-center">
                        {userLocation ? (
                          <span className="text-xs font-bold text-on-surface">{dest.calculatedDistance} km</span>
                        ) : (
                          <span className="text-[9px] text-on-surface-variant italic">Lokasi belum aktif</span>
                        )}
                      </div>
                    </div>
    
                    {/* Rating */}
                    <div className="space-y-1.5">
                      <div className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 px-0.5">
                        <Star className="w-2.5 h-2.5" /> Rating Pengunjung
                      </div>
                      <div className="p-3 bg-surface rounded-xl border border-outline-variant/30 flex items-center justify-center gap-2">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-on-surface">{dest.rating} / 5</span>
                      </div>
                    </div>
                  </div>
    
                  <div className="p-4 pt-0">
                    <Link to={`/detail/${dest.id}`} className="w-full bg-primary text-on-primary font-bold text-[10px] uppercase tracking-wider py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md flex justify-center items-center gap-2">
                      Lihat Detail
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
