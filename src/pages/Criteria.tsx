import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Wallet, MapPin, Hotel, Star, Calculator, Wifi, Waves, CircleParking, Utensils, Dumbbell } from 'lucide-react';

import { useLocation } from '../contexts/LocationContext';

export const Criteria = () => {
  const navigate = useNavigate();
  const { userLocation, isLoading, error, requestLocation } = useLocation();
  const [weights, setWeights] = useState({
    budget: 30,
    distance: 20,
    facilities: 30,
    rating: 20
  });

  const total = weights.budget + weights.distance + weights.facilities + weights.rating;

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const handleCalculate = () => {
    if (total === 100) {
      navigate('/results');
    } else {
      alert('Total bobot harus 100%');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-20">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Tentukan Prioritas Perjalanan Anda</h1>
        <p className="text-lg text-on-surface-variant mb-8">Sesuaikan bobot kriteria di bawah ini untuk mendapatkan rekomendasi destinasi yang paling sesuai dengan preferensi Anda. Total bobot harus 100%.</p>
        
        {/* Location Detection UI */}
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant inline-flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="w-5 h-5" />
            <span className="font-bold">Lokasi Anda</span>
          </div>
          {userLocation ? (
            <p className="text-sm font-semibold text-secondary">Lokasi Terdeteksi: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
          ) : (
            <p className="text-sm text-on-surface-variant">Izinkan akses lokasi untuk menghitung jarak ke destinasi</p>
          )}
          <button 
            onClick={requestLocation}
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${isLoading ? 'bg-surface-variant text-on-surface-variant' : 'bg-secondary text-on-secondary hover:opacity-90'}`}
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
            className="bg-surface-container-lowest rounded-xl p-8 border border-surface-variant shadow-sm"
          >
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-surface-variant">
              <h2 className="text-2xl font-bold text-primary">Pembobotan Kriteria</h2>
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${total === 100 ? 'bg-secondary-container text-on-secondary-container' : 'bg-rose-100 text-rose-700'}`}>
                Total: {total}%
              </div>
            </div>

            <div className="space-y-10">
              {/* Budget */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-container p-3 rounded-lg text-secondary">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-on-surface block">Budget</label>
                      <p className="text-xs text-on-surface-variant">Pentingnya efisiensi biaya</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-md border border-outline-variant">
                    <input 
                      type="number" 
                      value={weights.budget} 
                      onChange={(e) => handleWeightChange('budget', parseInt(e.target.value) || 0)}
                      className="w-12 bg-transparent text-right border-none focus:ring-0 text-sm font-bold p-0"
                    />
                    <span className="text-sm font-bold text-on-surface-variant">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  value={weights.budget} 
                  onChange={(e) => handleWeightChange('budget', parseInt(e.target.value))}
                  className="w-full accent-secondary h-1.5 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>

              {/* Jarak */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-container p-3 rounded-lg text-secondary">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-on-surface block">Jarak</label>
                      <p className="text-xs text-on-surface-variant">Kedekatan lokasi dari tempat Anda</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-md border border-outline-variant">
                    <input 
                      type="number" 
                      value={weights.distance} 
                      onChange={(e) => handleWeightChange('distance', parseInt(e.target.value) || 0)}
                      className="w-12 bg-transparent text-right border-none focus:ring-0 text-sm font-bold p-0"
                    />
                    <span className="text-sm font-bold text-on-surface-variant">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  value={weights.distance} 
                  onChange={(e) => handleWeightChange('distance', parseInt(e.target.value))}
                  className="w-full accent-secondary h-1.5 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>

              {/* Fasilitas */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-container p-3 rounded-lg text-secondary">
                      <Hotel className="w-6 h-6" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-on-surface block">Fasilitas</label>
                      <p className="text-xs text-on-surface-variant">Kelengkapan amenitas dan layanan</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-md border border-outline-variant">
                    <input 
                      type="number" 
                      value={weights.facilities} 
                      onChange={(e) => handleWeightChange('facilities', parseInt(e.target.value) || 0)}
                      className="w-12 bg-transparent text-right border-none focus:ring-0 text-sm font-bold p-0"
                    />
                    <span className="text-sm font-bold text-on-surface-variant">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  value={weights.facilities} 
                  onChange={(e) => handleWeightChange('facilities', parseInt(e.target.value))}
                  className="w-full accent-secondary h-1.5 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>

              {/* Rating */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-container p-3 rounded-lg text-secondary">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-on-surface block">Rating</label>
                      <p className="text-xs text-on-surface-variant">Ulasan dan popularitas pengguna lain</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-md border border-outline-variant">
                    <input 
                      type="number" 
                      value={weights.rating} 
                      onChange={(e) => handleWeightChange('rating', parseInt(e.target.value) || 0)}
                      className="w-12 bg-transparent text-right border-none focus:ring-0 text-sm font-bold p-0"
                    />
                    <span className="text-sm font-bold text-on-surface-variant">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  value={weights.rating} 
                  onChange={(e) => handleWeightChange('rating', parseInt(e.target.value))}
                  className="w-full accent-secondary h-1.5 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Filters */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container-lowest rounded-xl p-8 border border-surface-variant shadow-sm"
          >
            <h2 className="text-2xl font-bold text-primary mb-8 pb-6 border-b border-surface-variant">Filter Fasilitas</h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { label: 'Wi-Fi', icon: Wifi },
                { label: 'Kolam Renang', icon: Waves },
                { label: 'Parkir', icon: CircleParking },
                { label: 'Sarapan', icon: Utensils },
                { label: 'Gym', icon: Dumbbell }
              ].map((item, idx) => (
                <label key={idx} className="cursor-pointer group">
                  <input type="checkbox" className="peer sr-only" defaultChecked={idx % 2 === 0} />
                  <div className="px-4 py-2.5 rounded-full border border-outline-variant text-sm font-bold text-on-surface-variant peer-checked:bg-secondary-container peer-checked:text-on-secondary-container peer-checked:border-secondary-container transition-all flex items-center gap-2 group-hover:border-secondary">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                </label>
              ))}
            </div>

            <div className="rounded-lg overflow-hidden h-40 mb-8 relative bg-surface-container">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiqe6dbt5tZrCiHI-ssAJ8foMEzwZd0Sabkrm3ln9JEHuOO5uJ46BQ6W8yjCj7FZ82o4l6eEwz2ughM1xy1AHS1cpq_clajfidJOclFK-x-Xg9nsYyqZtWcSwJdWFN0Ux_2-fucmaRh5j9DHDkQpityZzbZHb3eGV8-gsNVDwqk2zRq79QHng3uNP6g5Cif9juwKdys0OVpgnc8qtNGBzfEpUO7Ddq7HKb60HAwsAMBdJhyD8sck5Myx7llzuJXReJmhG5z7pHXCg" className="w-full h-full object-cover" alt="Map View" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4">
                <p className="text-on-primary text-xs font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> 
                  Area Pencarian: Bali, Indonesia
                </p>
              </div>
            </div>

            <button 
              onClick={handleCalculate}
              className="w-full bg-primary text-on-primary py-4 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all shadow-md flex justify-center items-center gap-3"
            >
              <Calculator className="w-5 h-5" />
              Hitung Peringkat
            </button>
            <p className="text-xs text-on-surface-variant text-center mt-4">Algoritma DSS akan memproses data berdasarkan bobot di atas.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
