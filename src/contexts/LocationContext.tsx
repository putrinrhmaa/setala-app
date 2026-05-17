import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
  userLocation: { lat: number; lng: number } | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = React.useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation tidak didukung oleh browser Anda');
      return;
    }

    setIsLoading(true);
    setError(null);
    console.log('Requesting geolocation...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation success:', position.coords.latitude, position.coords.longitude);
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Geolocation error:', err.code, err.message);
        let errorMsg = 'Gagal mendapatkan lokasi';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMsg = 'Akses lokasi ditolak. Harap izinkan akses lokasi di browser Anda.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMsg = 'Informasi lokasi tidak tersedia.';
            break;
          case err.TIMEOUT:
            errorMsg = 'Waktu permintaan lokasi habis.';
            break;
        }
        setError(errorMsg);
        setIsLoading(false);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, isLoading, error, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
