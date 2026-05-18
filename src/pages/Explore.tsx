import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../constants';
import { useFavorites } from '../contexts/FavoritesContext';

export const Explore = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = DESTINATIONS.filter(d => {
    return d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           d.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Eksplorasi Destinasi</h1>
          <p className="text-on-surface-variant max-w-2xl text-sm md:text-base font-medium">
            Jelajahi seluruh koleksi destinasi wisata terbaik di seluruh nusantara tanpa filter peringkat. Temukan keindahan Indonesia dari Sabang sampai Merauke.
          </p>
        </section>

        {/* Search Bar */}
        <section className="flex justify-start">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <input 
              type="text" 
              placeholder="Cari destinasi, kota, atau provinsi..." 
              className="w-full bg-white border border-outline-variant/60 rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none font-bold shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Results Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest, idx) => (
              <motion.div 
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx % 10 * 0.05 }}
                className="bg-white border border-outline-variant/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={dest.imageUrl} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-white/50 flex items-center gap-1.5 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-[10px] font-black text-primary">{dest.rating}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => toggleFavorite(dest.id)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all z-10 backdrop-blur-md ${
                      isFavorite(dest.id)
                        ? 'bg-secondary text-white shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/40'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite(dest.id) ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Link 
                      to={`/detail/${dest.id}`}
                      className="w-full bg-white text-primary py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
                    >
                      Lihat Detail
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[10px] text-secondary font-bold uppercase tracking-widest mb-2">
                    <MapPin className="w-3 h-3" />
                    {dest.location}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{dest.name}</h3>
                  
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {dest.tags.map(tag => (
                      <span key={tag} className="bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border border-outline-variant/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto text-on-surface-variant">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Tidak ada hasil ditemukan</h3>
              <p className="text-on-surface-variant">Coba kurangi filter atau masukkan kata kunci yang berbeda.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-secondary font-bold hover:underline"
              >
                Reset Semua Pencarian
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
