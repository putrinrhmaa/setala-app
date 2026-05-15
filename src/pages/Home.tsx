import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Star, ArrowRight, Sparkles, X, MapPin, Sliders, CheckCircle } from 'lucide-react';
import { DESTINATIONS } from '../constants';

export const Home = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const featuredDest = DESTINATIONS[1]; // Raja Ampat

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="px-4 md:px-12 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-semibold w-fit border border-surface-variant">
              <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
              Smart Travel Decision Support
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Temukan Destinasi Wisata Terbaik Berdasarkan <span className="text-secondary">Prioritas Anda</span>.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl">
              Hilangkan kebingungan dalam memilih. Sistem cerdas kami menganalisis anggaran, preferensi jarak, dan gaya liburan Anda untuk memberikan rekomendasi destinasi yang presisi dan personal.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link to="/criteria" className="bg-primary text-on-primary text-sm font-semibold px-8 py-4 rounded-lg shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                Mulai Perhitungan
                <Calculator className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => setShowHowItWorks(true)}
                className="bg-surface text-primary border border-outline-variant text-sm font-semibold px-8 py-4 rounded-lg hover:bg-surface-container-low transition-colors w-full sm:w-auto"
              >
                Pelajari Cara Kerja
              </button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 h-[400px] lg:h-[600px] rounded-xl overflow-hidden relative shadow-sm"
          >
            <img 
              alt={featuredDest.name} 
              className="w-full h-full object-cover" 
              src={featuredDest.imageUrl} 
            />
            <div className="absolute bottom-6 left-6 right-6 bg-surface/80 backdrop-blur-md border border-surface/50 p-4 rounded-lg shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-on-surface-variant">Rekomendasi Teratas</p>
                  <p className="text-xl font-bold text-primary">{featuredDest.name}, {featuredDest.location.split(',').pop()?.trim()}</p>
                </div>
                <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  {featuredDest.matchScore}% Cocok
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-surface-container-low w-full py-20">
        <div className="px-4 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Destinasi Terpopuler</h2>
              <p className="text-on-surface-variant">Pilihan teratas berdasarkan analisis data gabungan dari seluruh pengguna kami.</p>
            </div>
            <Link to="/results" className="text-secondary font-semibold flex items-center gap-1 hover:underline">
              Lihat Semua Peringkat
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.slice(0, 6).map((dest, i) => (
              <motion.article 
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded border border-outline-variant flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-on-background">{dest.rating}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {dest.tags.map(tag => (
                      <span key={tag} className="bg-secondary-container/50 text-on-secondary-container border border-secondary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-1">{dest.name}</h3>
                  <p className="text-sm text-on-surface-variant mb-4 flex-grow">{dest.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-surface-variant">
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <Calculator className="w-4 h-4" />
                      <span className="text-xs font-semibold">{dest.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span>
                    </div>
                    <Link to={`/detail/${dest.id}`} className="text-primary hover:text-secondary transition-colors">
                      <ArrowRight className="w-5 h-5" />
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

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Sparkles className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Bagaimana Setala Bekerja?</h2>
                </div>

                <div className="space-y-10">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold text-xl">
                      1
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sliders className="w-5 h-5 text-secondary" />
                        <h3 className="font-bold text-lg text-primary">Tentukan Kriteria</h3>
                      </div>
                      <p className="text-on-surface-variant leading-relaxed">
                        Anda menentukan apa yang paling penting bagi perjalanan Anda—apakah itu budget yang hemat, jarak yang dekat, fasilitas mewah, atau rating yang tinggi.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold text-xl">
                      2
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-secondary" />
                        <h3 className="font-bold text-lg text-primary">Deteksi Lokasi & Data</h3>
                      </div>
                      <p className="text-on-surface-variant leading-relaxed">
                        Sistem mendeteksi lokasi Anda (dengan izin) untuk menghitung jarak secara akurat ke 10 destinasi terbaik di Indonesia yang telah kami kurasi.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold text-xl">
                      3
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-secondary" />
                        <h3 className="font-bold text-lg text-primary">Hasil Rekomendasi</h3>
                      </div>
                      <p className="text-on-surface-variant leading-relaxed">
                        Algoritma DSS (Decision Support System) kami melakukan kalkulasi matematis untuk memberikan skor kecocokan (%) yang dipersonalisasi khusus untuk Anda.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <Link 
                    to="/criteria" 
                    className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
                  >
                    Mulai Sekarang
                    <ArrowRight className="w-5 h-5" />
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
