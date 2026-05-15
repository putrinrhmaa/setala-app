import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Wallet, MapPin, Star, Hotel, CheckCircle2, ChevronRight, Info, ArrowRightLeft, LocateFixed } from 'lucide-react';
import { DESTINATIONS } from '../constants';
import { useLocation } from '../contexts/LocationContext';
import { calculateDistance } from '../utils';

export const Comparison = () => {
  const { userLocation, isLoading, error, requestLocation } = useLocation();

  const comparedDestinations = useMemo(() => {
    return DESTINATIONS.slice(0, 3).map(dest => {
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
  }, [userLocation]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Bandingkan Destinasi</h1>
        <p className="text-lg text-on-surface-variant">Evaluasi pilihan perjalanan Anda berdampingan untuk menemukan destinasi yang paling sesuai dengan preferensi Anda.</p>
        
        {!userLocation && (
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={(e) => {
                e.preventDefault();
                requestLocation();
              }}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              <LocateFixed className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Mendeteksi Lokasi...' : 'Deteksi Lokasi Saya'}
            </button>
            {error && (
              <p className="text-sm text-error font-medium">Gagal mendeteksi lokasi: {error}</p>
            )}
          </div>
        )}
      </div>

      <div className="overflow-x-auto pb-10">
        <div className="min-w-[900px] grid grid-cols-4 gap-8 items-start">
          {/* Column: Attributes */}
          <div className="space-y-4 mt-[230px]">
            <div className="h-16 flex items-center px-4 font-bold text-sm text-on-surface-variant bg-surface-container-low rounded-lg">Budget Estimasi</div>
            <div className="h-16 flex items-center px-4 font-bold text-sm text-on-surface-variant bg-surface rounded-lg">Jarak dari Anda</div>
            <div className="h-[140px] flex items-start pt-4 px-4 font-bold text-sm text-on-surface-variant bg-surface-container-low rounded-lg">Fasilitas Utama</div>
            <div className="h-16 flex items-center px-4 font-bold text-sm text-on-surface-variant bg-surface rounded-lg">Rating Pengunjung</div>
          </div>

          {comparedDestinations.map(dest => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
            >
              <div className="h-48 relative">
                <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                </div>
              </div>

              <div className="p-4 space-y-4 flex-grow">
                {/* Budget */}
                <div className="h-16 flex flex-col justify-center items-center bg-surface-container-low rounded-lg text-center">
                  <span className="text-sm font-bold text-secondary flex items-center gap-1">
                    <Wallet className="w-4 h-4 fill-current" />
                    {dest.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}
                  </span>
                  {dest.id === '1' && <span className="text-[10px] font-bold text-secondary/70 uppercase">Penyisihan Terbaik</span>}
                </div>

                {/* Distance */}
                <div className="h-16 flex items-center justify-center bg-surface rounded-lg">
                  <span className="text-sm font-medium text-on-surface flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    {userLocation ? (
                      <span className="font-bold">{dest.calculatedDistance} km</span>
                    ) : (
                      <span className="text-xs text-on-surface-variant italic">Lokasi belum terdeteksi</span>
                    )}
                  </span>
                </div>

                {/* Facilities */}
                <div className="h-[140px] p-4 bg-surface-container-low rounded-lg flex flex-col gap-2 overflow-y-auto">
                  {dest.facilities.map(fac => (
                    <span key={fac} className="inline-flex items-center gap-2 text-xs font-semibold bg-surface-variant text-on-surface-variant px-3 py-1.5 rounded-full w-fit">
                      <Hotel className="w-3 h-3" /> {fac}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="h-16 flex items-center justify-center bg-surface rounded-lg">
                  <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {dest.rating} / 5
                  </span>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to={`/detail/${dest.id}`} className="w-full bg-surface-container text-primary font-bold text-sm py-3 rounded-lg hover:bg-primary hover:text-white transition-all border border-outline-variant flex justify-center items-center gap-2">
                  Lihat Detail
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
