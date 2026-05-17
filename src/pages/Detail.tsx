import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Star, MapPin, Wallet, Route, Thermometer, Wifi, Waves, Hotel, Utensils, CircleParking, Clock, Heart, ArrowRight, ExternalLink, Grid3X3, ShoppingCart, Users } from 'lucide-react';
import { DESTINATIONS } from '../constants';

import { calculateDistance } from '../utils';
import { useLocation } from '../contexts/LocationContext';
import { useFavorites } from '../contexts/FavoritesContext';

export const Detail = () => {
  const { id } = useParams();
  const { userLocation } = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const reviewsRef = React.useRef<HTMLElement>(null);
  const dest = DESTINATIONS.find(d => d.id === id) || DESTINATIONS[0];

  const destIsFavorite = isFavorite(dest.id);

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const distance = userLocation 
    ? calculateDistance(userLocation.lat, userLocation.lng, dest.coordinates.lat, dest.coordinates.lng)
    : 0;

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      {/* Hero Gallery */}
      <section className="w-full relative md:px-12 md:mt-12 md:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[512px] md:h-[600px] md:rounded-xl overflow-hidden shadow-xl">
          <div className="col-span-1 md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden">
            <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 to-transparent"></div>
            
            <Link to="/results" className="absolute top-6 left-6 md:hidden bg-surface/80 p-2 rounded-full backdrop-blur-sm text-primary flex items-center justify-center shadow-sm">
              <ArrowLeft className="w-6 h-6" />
            </Link>

            <div className="absolute bottom-10 left-10 text-on-primary">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Premium</span>
                <span className="bg-surface/20 backdrop-blur-sm text-on-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" /> {dest.rating}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">{dest.name}</h1>
              <p className="text-lg font-medium flex items-center gap-1 opacity-90">
                <MapPin className="w-5 h-5" /> {dest.location}
              </p>
            </div>
          </div>

          <div className="hidden md:block col-span-1 row-span-1 overflow-hidden relative group cursor-pointer">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmZ2j4r0KfOX5wN1d1CD6QYPqTrsTuN1TBLLmkgeMYDlrGZD_cr6dtcSnWBJRUMGUm5fXS4gP6abmiv7KRATQ5Pz9Pbkt8c8kBlVuN9CPpp1yNMZqRkzjJ-1uET7d0SDf8lH1H_GpYl3OnKk7RWN6fa-ppYRXKJk8Ud-PEeRPhNzakd_-3Je4EvDKU1BvlhWGbXUAcNVdjhpobNpIGO8aKyJzghSiIakCOIxjZq3sGlY3viqeWrbCoAc07byI7Z1EjI5Nn5TrAsLk" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Detail 1" />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 overflow-hidden relative group cursor-pointer">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2lRiG5JaAFMfHT9Mk4vK_kutlrnvsqsEt92iKTX81U1YppUNuUFasjZHZmVrnnhuU8RhMX242974ZeOZpcWDFQUtBl9n1LaGYPUnUWqLqOIcjsgDaTPTjWJc-SJJNPbl0J72ZRD7fyWgXVovmdTvC1E3mY36q9t8iVsKK-WNqxkgeCHHE7NG3O2ipjIxSBvueRwZBJbuyAc2pXV65CWHaCSVXCdsINeHPSbruuHSaJ6Bp0OE9-YtomSBAL7cvyjMGB43ApunCiuI" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Detail 2" />
          </div>
          <div className="hidden md:block col-span-2 row-span-1 overflow-hidden relative group cursor-pointer">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdp6u8Flsm6VpELKAVVOsjrFq_Ca3x0aOJLCAqzKPz0kuTNLlrJRWY9hRnhEOBwotrAQj8iBsqa_fTfvpMqVd2TMPfFik-5jHtcblGStuoYehWqkzn9Gecra_DFfoSOM0zWaPSbecVueQG7UT4_epV5uplcrJ72s3fMDWYs6bOHpN-TGiftxae6YYVyV8lLhwr-0HrC-lV6vM9WdHhIjFlPaN8yLuCYSLjwlYIPga_6cM_-pZphUlhGosAicb7f_qFREEmexppfFk" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Detail 3" />
            <div className="absolute bottom-6 right-6">
              <button className="bg-surface text-primary px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-lg transition-all">
                <Grid3X3 className="w-5 h-5" /> Lihat Semua Foto
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 md:mt-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Quick Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Wallet, label: 'Estimasi Biaya', value: `Rp ${(dest.price / 1000000).toFixed(1)} Juta`, sub: '/ paket' },
              { icon: Route, label: 'Jarak', value: distance > 0 ? `${distance} km` : ' डिटेक्ट...', sub: 'Dari lokasi Anda' },
              { icon: Thermometer, label: 'Cuaca', value: '28°C', sub: 'Cerah Berawan' },
              { icon: Star, label: 'Skor Kecocokan', value: `${dest.matchScore}%`, sub: 'Sangat Tinggi' }
            ].map((stat, i) => (
              <div key={i} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center text-center">
                <stat.icon className="w-10 h-10 text-secondary mb-3" />
                <span className="text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-widest">{stat.label}</span>
                <span className="text-2xl font-bold text-primary">{stat.value}</span>
                <span className="text-[10px] text-on-surface-variant mt-1 font-medium">{stat.sub}</span>
              </div>
            ))}
          </section>

          {/* Overview */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-6">Tentang Destinasi</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              {dest.description} Terletak di lokasi strategis, tempat ini menawarkan tempat perlindungan yang tenang, menjauhkan Anda dari hiruk-pikuk kehidupan modern. Menggabungkan arsitektur tradisional dengan fasilitas modern kelas atas, tempat ini dirancang untuk memberikan pengalaman relaksasi yang mendalam.
            </p>
          </section>

          {/* Culture & Local Insight */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Wawasan Budaya & Lokal</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/30 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-lg shadow-secondary/20">
                      <Route className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-on-background uppercase tracking-tight mb-2">Budaya & Tradisi</h3>
                      <p className="text-on-surface-variant leading-relaxed font-medium">{dest.culture}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                      <Users className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-on-background uppercase tracking-tight mb-2">Bahasa Lokal</h3>
                      <p className="text-on-surface-variant leading-relaxed font-medium">{dest.language}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                      <Utensils className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-on-background uppercase tracking-tight mb-3">Kuliner Wajib Coba</h3>
                      <div className="flex flex-wrap gap-2">
                        {dest.food.map((f, idx) => (
                          <span key={idx} className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-secondary border border-secondary/10 shadow-sm uppercase tracking-widest">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section ref={reviewsRef} id="reviews">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-bold text-primary">Pengalaman Wisatawan</h2>
              <button 
                onClick={scrollToReviews}
                className="text-sm font-bold text-secondary hover:underline flex items-center gap-1"
              >
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-secondary font-bold text-xl">AW</div>
                    <div>
                      <h4 className="font-bold text-on-background">Anita Wijaya</h4>
                      <p className="text-xs text-on-surface-variant font-medium">Mengunjungi {dest.name} pada Okt 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-high px-3 py-1 rounded-md">
                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                    <span className="text-sm font-bold">5.0</span>
                  </div>
                </div>
                <div className="text-md text-on-surface-variant leading-relaxed space-y-4 font-medium italic">
                  <p>"Benar-benar terpukau dengan atmosfer di {dest.name}. Bukan cuma pemandangannya yang juara, tapi interaksi sama warga lokalnya itu yang bikin berkesan banget. Belajar dikit-dikit {dest.language.split(' ')[0]} bikin suasana jadi makin akrab."</p>
                  <p>"Kulinernya juga juara! Sempet nyobain {dest.food[0]} yang katanya paling otentik di sini, rasanya bener-bener beda sama yang di kota. Kulturnya masih kental banget, wajib banget ke sini kalau mau healing yang berkualitas!"</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 flex flex-col gap-8">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-xl border border-outline-variant/20 shadow-2xl">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-outline-variant/20">
                <div>
                  <span className="text-3xl font-bold text-primary">Rp {dest.price.toLocaleString('id-ID')}</span>
                  <span className="text-xs font-semibold text-on-surface-variant block mt-1 tracking-wide">/ paket / orang</span>
                </div>
                <button 
                  onClick={() => toggleFavorite(dest.id)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                    destIsFavorite 
                      ? 'border-secondary bg-secondary text-white' 
                      : 'border-outline-variant text-on-surface-variant hover:text-secondary hover:border-secondary'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${destIsFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/50 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Estimasi Anggaran</h3>
                    <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Berdasarkan Analisis Aplikasi</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Penginapan & Tiket</span>
                    <span className="font-bold text-on-surface">Rp {(dest.price * 0.65).toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[65%]"></div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Transportasi Lokal</span>
                    <span className="font-bold text-on-surface">Rp {(dest.price * 0.15).toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[15%] opacity-60"></div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Makan & Aktivitas</span>
                    <span className="font-bold text-on-surface">Rp {(dest.price * 0.20).toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[20%] opacity-40"></div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/30 text-[11px] text-on-surface-variant italic leading-relaxed">
                  *Estimasi di atas dihitung secara otomatis oleh sistem kami berdasarkan rata-rata biaya harian di {dest.name} untuk kenyamanan maksimal Anda.
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Pesan Melalui Mitra
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: 'Traveloka', color: 'bg-[#0194f3]', url: 'https://www.traveloka.com' },
                    { name: 'Tiket.com', color: 'bg-[#0055ba]', url: 'https://www.tiket.com' },
                    { name: 'Agoda', color: 'bg-[#873fb6]', url: 'https://www.agoda.com' }
                  ].map(platform => (
                    <a 
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-[10px] font-black text-white`}>
                          {platform.name[0]}
                        </div>
                        <span className="text-sm font-bold text-on-surface">{platform.name}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
