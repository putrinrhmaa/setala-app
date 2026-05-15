import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Wallet, MapPin, Star, Hotel, CheckCircle2, ChevronRight, Info, ArrowRightLeft } from 'lucide-react';
import { DESTINATIONS } from '../constants';

export const Comparison = () => {
  const selectedDestinations = DESTINATIONS.slice(0, 3); // Showing first 3 for UI demo

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Bandingkan Destinasi</h1>
        <p className="text-lg text-on-surface-variant">Evaluasi pilihan perjalanan Anda berdampingan untuk menemukan destinasi yang paling sesuai dengan preferensi Anda.</p>
      </div>

      <div className="overflow-x-auto pb-10">
        <div className="min-w-[900px] grid grid-cols-4 gap-8 items-start">
          {/* Sticky Column: Attributes */}
          <div className="space-y-4 mt-[230px]">
            <div className="h-16 flex items-center px-4 font-bold text-sm text-on-surface-variant bg-surface-container-low rounded-lg">Budget Estimasi</div>
            <div className="h-16 flex items-center px-4 font-bold text-sm text-on-surface-variant bg-surface rounded-lg">Jarak dari Pusat</div>
            <div className="h-[140px] flex items-start pt-4 px-4 font-bold text-sm text-on-surface-variant bg-surface-container-low rounded-lg">Fasilitas Utama</div>
            <div className="h-16 flex items-center px-4 font-bold text-sm text-on-surface-variant bg-surface rounded-lg">Rating Pengunjung</div>
          </div>

          {selectedDestinations.map(dest => (
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
                    <MapPin className="w-4 h-4 text-outline" />
                    {dest.distance} km
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
