import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ArrowRight, X, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from '../constants';
import { useLocation as useAppLocation } from '../contexts/LocationContext';

export const Header = () => {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { userLocation } = useAppLocation();

  const filteredDestinations = searchQuery
    ? DESTINATIONS.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all bg-surface border-b border-surface-variant/20`}>
      <div className="flex justify-between items-center w-full px-4 md:px-12 max-w-7xl mx-auto h-16">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-display font-bold text-primary flex items-center gap-2 tracking-tight group">
            <Logo className="w-8 h-8 text-primary transition-transform group-hover:scale-105" />
            <span>Setala</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-semibold transition-colors duration-200 ${routerLocation.pathname === '/' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-secondary'}`}>Beranda</Link>
          <Link to="/explore" className={`text-sm font-semibold transition-colors duration-200 ${routerLocation.pathname === '/explore' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-secondary'}`}>Eksplorasi</Link>
          <Link to="/results" className={`text-sm font-semibold transition-colors duration-200 ${routerLocation.pathname === '/results' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-secondary'}`}>Peringkat</Link>
          <Link to="/compare" className={`text-sm font-semibold transition-colors duration-200 ${routerLocation.pathname === '/compare' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-secondary'}`}>Bandingkan</Link>
          <Link to="/favorites" className={`text-sm font-semibold transition-colors duration-200 ${routerLocation.pathname === '/favorites' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-secondary'}`}>Favorit</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors text-on-surface-variant"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button className="md:hidden text-on-surface-variant ml-2">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-surface-variant flex items-center gap-4">
                <Search className="w-6 h-6 text-on-surface-variant" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Cari destinasi atau lokasi..." 
                  className="flex-grow bg-transparent border-none focus:ring-0 text-lg py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-surface-container rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-on-surface-variant" />
                </button>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto">
                {searchQuery && filteredDestinations.length > 0 ? (
                  <div className="p-2">
                    {filteredDestinations.map(dest => (
                      <button 
                        key={dest.id}
                        onClick={() => {
                          navigate(`/detail/${dest.id}`);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left p-4 hover:bg-surface-container-low rounded-xl transition-colors flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary">{dest.name}</h4>
                          <p className="text-xs text-on-surface-variant">{dest.location}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="p-12 text-center text-on-surface-variant">
                    Tidak ada hasil ditemukan untuk "{searchQuery}"
                  </div>
                ) : (
                  <div className="p-12 text-center text-on-surface-variant">
                    Ketik sesuatu untuk mencari destinasi impian Anda...
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
