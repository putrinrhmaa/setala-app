import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Star, ArrowRight, Sparkles, X, MapPin, Sliders, CheckCircle, Heart } from 'lucide-react';
import { DESTINATIONS } from '../constants';
import { useFavorites } from '../contexts/FavoritesContext';

export const Home = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const featuredDest = DESTINATIONS[1]; // Raja Ampat

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="px-4 md:px-12 pt-4 pb-8 md:pt-6 md:pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant text-[9px] font-bold uppercase tracking-wider w-fit border border-surface-variant">
              <Sparkles className="w-2.5 h-2.5 text-secondary fill-secondary" />
              Smart Travel Decision Support
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-primary leading-[1.1] tracking-tight">
              Temukan Destinasi Wisata Terbaik Berdasarkan <span className="text-secondary">Prioritas Anda</span>.
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant max-w-md leading-relaxed">
              Hilangkan kebingungan dalam memilih. Sistem cerdas kami menganalisis anggaran, preferensi jarak, dan gaya liburan Anda untuk memberikan rekomendasi destinasi yang presisi dan personal.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link to="/criteria" className="bg-primary text-on-primary text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                Mulai Perhitungan
                <Calculator className="w-4 h-4" />
              </Link>
              <button 
                onClick={() => setShowHowItWorks(true)}
                className="bg-white text-primary border border-outline-variant text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors w-full sm:w-auto"
              >
                Pelajari Cara Kerja
              </button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 h-[300px] lg:h-[420px] rounded-[28px] overflow-hidden relative shadow-2xl border-4 border-white"
          >
            <img 
              alt={featuredDest.name} 
              className="w-full h-full object-cover" 
              src={featuredDest.imageUrl} 
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white/50 p-4 rounded-xl shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-secondary uppercase tracking-widest mb-0.5">Rekomendasi Teratas</p>
                  <p className="text-base font-bold text-primary">{featuredDest.name}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />
                    {featuredDest.location.split(',').pop()?.trim()}
                  </p>
                </div>
                <div className="bg-secondary text-on-secondary px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-black shadow-lg shadow-secondary/20">
                  <Star className="w-3 h-3 fill-current" />
                  {featuredDest.matchScore}% COCOK
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-surface-container-low w-full py-16">
        <div className="px-4 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-1 tracking-tight">Destinasi Terpopuler</h2>
              <p className="text-sm text-on-surface-variant font-medium">Pilihan teratas berdasarkan analisis data gabungan dari seluruh pengguna kami.</p>
            </div>
            <Link to="/explore" className="text-secondary text-sm font-bold flex items-center gap-1.5 hover:underline group">
              Eksplorasi Semua
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.slice(0, 6).map((dest, i) => (
              <motion.article 
                key={dest.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white border border-outline-variant/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-white/50 flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-[10px] font-black text-primary">{dest.rating}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(dest.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all z-10 backdrop-blur-md ${
                      isFavorite(dest.id)
                        ? 'bg-secondary text-white shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/40'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(dest.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {dest.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border border-outline-variant/30">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-secondary transition-colors line-clamp-1">{dest.name}</h3>
                  <p className="text-xs text-on-surface-variant mb-4 flex-grow line-clamp-2 leading-relaxed font-medium">{dest.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Calculator className="w-3.5 h-3.5" />
                      <span className="text-xs font-black">{dest.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span>
                    </div>
                    <Link to={`/detail/${dest.id}`} className="bg-primary/5 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Modal */}
      <AnimatePresence>
        {showHowItWorks && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHowItWorks(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowHowItWorks(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="text-xl font-bold text-primary tracking-tight">Bagaimana Setala Bekerja?</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-lg">
                      1
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sliders className="w-4 h-4 text-secondary" />
                        <h3 className="font-bold text-base text-primary">Tentukan Kriteria</h3>
                      </div>
                      <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                        Anda menentukan apa yang paling penting bagi perjalanan Anda—apakah itu budget yang hemat, jarak yang dekat, fasilitas mewah, atau rating yang tinggi.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-lg">
                      2
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <h3 className="font-bold text-base text-primary">Deteksi Lokasi & Data</h3>
                      </div>
                      <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                        Sistem mendeteksi lokasi Anda (dengan izin) untuk menghitung jarak secara akurat ke destinasi terbaik di seluruh Indonesia yang telah kami kurasi.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-lg">
                      3
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <h3 className="font-bold text-base text-primary">Hasil Rekomendasi</h3>
                      </div>
                      <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                        Algoritma DSS (Decision Support System) kami melakukan kalkulasi matematis untuk memberikan skor kecocokan (%) yang dipersonalisasi khusus untuk Anda.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Link 
                    to="/criteria" 
                    className="bg-primary text-on-primary px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
                  >
                    Mulai Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
