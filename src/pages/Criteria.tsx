import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Wallet, MapPin, Hotel, Star, Calculator, Wifi, Waves, CircleParking, Utensils, Dumbbell } from 'lucide-react';

import { useLocation } from '../contexts/LocationContext';

export const Criteria = () => {
  const navigate = useNavigate();
  const { userLocation, isLoading, error, requestLocation } = useLocation();
  const [weights, setWeights] = useState({
    budget: 40,
    distance: 30,
    rating: 30
  });

  const total = weights.budget + weights.distance + weights.rating;

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const handleCalculate = () => {
    if (total === 100) {
      const params = new URLSearchParams({
        b: weights.budget.toString(),
        d: weights.distance.toString(),
        r: weights.rating.toString()
      });
      navigate(`/results?${params.toString()}`);
    } else {
      alert('Total bobot harus 100%');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-4 md:py-8">
      <div className="max-w-3xl mx-auto mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2 tracking-tight">Tentukan Prioritas Perjalanan Anda</h1>
        <p className="text-sm md:text-base text-on-surface-variant mb-4 font-medium">Sesuaikan bobot kriteria di bawah ini untuk mendapatkan rekomendasi destinasi yang paling sesuai dengan preferensi Anda. Total bobot harus 100%.</p>
        
        {/* Location Detection UI */}
        <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant inline-flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="w-4 h-4" />
            <span className="font-bold text-sm">Lokasi Anda</span>
          </div>
          {userLocation ? (
            <p className="text-xs font-semibold text-secondary">Lokasi Terdeteksi: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
          ) : (
            <p className="text-xs text-on-surface-variant">Izinkan akses lokasi untuk menghitung jarak ke destinasi</p>
          )}
          <button 
            onClick={requestLocation}
            disabled={isLoading}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${isLoading ? 'bg-surface-variant text-on-surface-variant' : 'bg-secondary text-on-secondary hover:opacity-90'}`}
          >
            {isLoading ? 'Mendeteksi...' : 'Deteksi Lokasi Saya'}
          </button>
          {error && <p className="text-xs text-error">Gagal: {error}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-lowest rounded-xl p-6 border border-surface-variant shadow-sm"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-surface-variant">
              <h2 className="text-xl font-bold text-primary">Pembobotan Kriteria</h2>
              <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${total === 100 ? 'bg-secondary-container text-on-secondary-container' : 'bg-rose-100 text-rose-700'}`}>
                Total: {total}%
              </div>
            </div>
 
            <div className="space-y-8">
              {/* Budget */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-surface-container p-2 rounded-lg text-secondary">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface block uppercase tracking-wider">Budget</label>
                      <p className="text-[10px] text-on-surface-variant font-medium">Pentingnya efisiensi biaya</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant">
                    <input 
                      type="number" 
                      value={weights.budget} 
                      onChange={(e) => handleWeightChange('budget', parseInt(e.target.value) || 0)}
                      className="w-10 bg-transparent text-right border-none focus:ring-0 text-xs font-bold p-0"
                    />
                    <span className="text-xs font-bold text-on-surface-variant">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  value={weights.budget} 
                  onChange={(e) => handleWeightChange('budget', parseInt(e.target.value))}
                  className="w-full accent-secondary h-1 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>
 
              {/* Jarak */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-surface-container p-2 rounded-lg text-secondary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface block uppercase tracking-wider">Jarak</label>
                      <p className="text-[10px] text-on-surface-variant font-medium">Kedekatan lokasi dari tempat Anda</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant">
                    <input 
                      type="number" 
                      value={weights.distance} 
                      onChange={(e) => handleWeightChange('distance', parseInt(e.target.value) || 0)}
                      className="w-10 bg-transparent text-right border-none focus:ring-0 text-xs font-bold p-0"
                    />
                    <span className="text-xs font-bold text-on-surface-variant">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  value={weights.distance} 
                  onChange={(e) => handleWeightChange('distance', parseInt(e.target.value))}
                  className="w-full accent-secondary h-1 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>
 
              {/* Rating */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-surface-container p-2 rounded-lg text-secondary">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface block uppercase tracking-wider">Rating</label>
                      <p className="text-[10px] text-on-surface-variant font-medium">Ulasan dan popularitas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant">
                    <input 
                      type="number" 
                      value={weights.rating} 
                      onChange={(e) => handleWeightChange('rating', parseInt(e.target.value) || 0)}
                      className="w-10 bg-transparent text-right border-none focus:ring-0 text-xs font-bold p-0"
                    />
                    <span className="text-xs font-bold text-on-surface-variant">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  value={weights.rating} 
                  onChange={(e) => handleWeightChange('rating', parseInt(e.target.value))}
                  className="w-full accent-secondary h-1 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Calculations & Submit */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container-lowest rounded-xl p-6 border border-surface-variant shadow-sm h-full flex flex-col justify-center items-center text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
              <Calculator className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-primary mb-2 tracking-tight">Siap untuk Memilih?</h2>
            <p className="text-xs md:text-sm text-on-surface-variant mb-6 max-w-xs font-medium">
              Kami akan menghitung skor kecocokan setiap destinasi berdasarkan pembobotan yang Anda tentukan di panel sebelah kiri.
            </p>
 
            <button 
              onClick={handleCalculate}
              className="w-full bg-primary text-on-primary py-3.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/20 active:scale-95 flex justify-center items-center gap-3"
            >
              Hitung Peringkat
              <Calculator className="w-5 h-5" />
            </button>
            <p className="text-[9px] uppercase tracking-widest font-black text-on-surface-variant mt-4 opacity-40">
              Powered by Setala DSS Algorithm
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
