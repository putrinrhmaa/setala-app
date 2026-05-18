import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Star, Wallet, ChevronRight, Trash2 } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { DESTINATIONS } from '../constants';
import { useLocation } from '../contexts/LocationContext';
import { calculateDistance } from '../utils';

export const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { userLocation } = useLocation();

  const favoriteDestinations = DESTINATIONS.filter(dest => favorites.includes(dest.id));

  return (
    <div className="min-h-screen bg-surface-container-lowest pb-20">
      {/* Header */}
      <div className="bg-primary text-on-primary py-4 md:py-6 px-6 sticky top-0 z-50 shadow-md rounded-b-3xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg md:text-xl font-black uppercase tracking-widest">Favorit Saya</h1>
          <div className="w-10 h-10 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current text-secondary" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {favoriteDestinations.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-on-surface-variant/30" />
            </div>
            <h2 className="text-xl font-bold text-on-surface mb-2">Belum Ada Favorit</h2>
            <p className="text-sm text-on-surface-variant max-w-[240px]">Destinasi yang Anda sukai akan muncul di sini untuk memudahkan perencanaan.</p>
            <Link 
              to="/"
              className="mt-8 bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all"
            >
              Cari Destinasi
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              {favoriteDestinations.length} Destinasi Disimpan
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favoriteDestinations.map((dest, index) => {
                const distance = userLocation 
                  ? calculateDistance(userLocation.lat, userLocation.lng, dest.coordinates.lat, dest.coordinates.lng)
                  : 0;

                return (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-surface-container-low rounded-[32px] overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={dest.imageUrl} 
                        alt={dest.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                      
                      <button 
                        onClick={() => toggleFavorite(dest.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-secondary transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="absolute bottom-4 left-6 right-6">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-3 h-3 text-secondary" />
                          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{dest.location}</span>
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">{dest.name}</h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-1.5 bg-surface-container rounded-full px-3 py-1.5">
                          <Star className="w-3.5 h-3.5 text-secondary fill-current" />
                          <span className="text-xs font-bold text-on-surface">{dest.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-primary" />
                          <span className="text-sm font-black text-primary">Rp {dest.price.toLocaleString('id-ID')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-6 p-3 bg-surface-container-highest/30 rounded-2xl">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-0.5">
                            <span>Jarak dari Anda</span>
                            <span className="text-secondary">{distance.toFixed(1)} KM</span>
                          </div>
                          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (distance/5000)*100)}%` }}
                              className="h-full bg-secondary"
                            />
                          </div>
                        </div>
                      </div>

                      <Link 
                        to={`/detail/${dest.id}`}
                        className="w-full bg-primary text-on-primary py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
                      >
                        Lihat Detail <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
