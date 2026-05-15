import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';

export const Footer = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const modalContent: Record<string, { title: string, content: React.ReactNode }> = {
    about: {
      title: 'Tentang Setala',
      content: (
        <div className="space-y-4">
          <p>Setala adalah sistem pendukung keputusan perjalanan (Travel DSS) yang dirancang untuk membantu Anda menemukan destinasi wisata terbaik di Indonesia berdasarkan prioritas pribadi Anda.</p>
          <p>Kami menggabungkan data lokasi, anggaran, dan fasilitas untuk memberikan rekomendasi yang akurat dan relevan bagi setiap individu.</p>
        </div>
      )
    },
    privacy: {
      title: 'Kebijakan Privasi',
      content: (
        <div className="space-y-4">
          <p>Kami sangat menghargai privasi Anda. Data lokasi Anda hanya digunakan secara real-time untuk menghitung jarak ke destinasi dan tidak disimpan secara permanen di server kami.</p>
          <p>Informasi preferensi Anda hanya digunakan untuk sesi kalkulasi saat ini demi memberikan pengalaman pengguna yang lebih baik.</p>
        </div>
      )
    },
    help: {
      title: 'Bantuan',
      content: (
        <div className="space-y-4">
          <p><strong>Bagaimana cara menggunakan Setala?</strong></p>
          <p>1. Klik "Mulai" untuk masuk ke halaman kriteria.<br/>2. Tentukan bobot untuk masing-masing kriteria (Total harus 100%).<br/>3. Klik "Hitung Peringkat" untuk melihat hasilnya.</p>
        </div>
      )
    },
    contact: {
      title: 'Kontak Kami',
      content: (
        <div className="space-y-4">
          <p>Punya pertanyaan atau masukan? Hubungi tim kami melalui:</p>
          <p>Email: support@voyagewise.id<br/>Telepon: +62 21 1234 5678<br/>Alamat: Jakarta, Indonesia</p>
        </div>
      )
    }
  };

  return (
    <footer className="bg-surface-container w-full py-12 mt-12">
      <div className="px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <span className="text-2xl font-display font-bold text-primary flex items-center gap-2 tracking-tight">
            <Logo className="w-8 h-8 text-primary" />
            Setala
          </span>
          <p className="text-sm text-on-surface-variant">© 2024 Setala Travel DSS. Seluruh hak cipta dilindungi.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <button 
            onClick={() => setActiveModal('about')}
            className="text-sm font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-all"
          >
            Tentang Kami
          </button>
          <button 
            onClick={() => setActiveModal('privacy')}
            className="text-sm font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-all"
          >
            Kebijakan Privasi
          </button>
          <button 
            onClick={() => setActiveModal('help')}
            className="text-sm font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-all"
          >
            Bantuan
          </button>
          <button 
            onClick={() => setActiveModal('contact')}
            className="text-sm font-semibold text-on-surface-variant hover:text-secondary hover:underline transition-all"
          >
            Kontak
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden p-8"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-bold text-primary mb-6">{modalContent[activeModal].title}</h2>
              <div className="text-on-surface-variant leading-relaxed">
                {modalContent[activeModal].content}
              </div>
              
              <button 
                onClick={() => setActiveModal(null)}
                className="mt-8 w-full bg-primary text-on-primary py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
