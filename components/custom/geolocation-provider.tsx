'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { Coordinates } from '@/lib/greatCircleDistance';

type GeolocationContextType = {
  position: Coordinates | null | undefined;
  setPosition: (position: Coordinates | null) => void;
};

const GeolocationContext = createContext<GeolocationContextType | undefined>(
  undefined,
);

export function GeolocationProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<Coordinates | null | undefined>(
    undefined,
  );

  const geolocationSuccessCallback = (position: GeolocationPosition) => {
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const geolocationErrorCallback = (error: GeolocationPositionError) => {
    console.warn(error);
    setPosition(null);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        geolocationSuccessCallback,
        geolocationErrorCallback,
      );
    }
  }, []);

  return (
    <GeolocationContext.Provider value={{ position, setPosition }}>
      {children}
    </GeolocationContext.Provider>
  );
}

export function useGeolocationContext() {
  const context = useContext(GeolocationContext);
  if (context === undefined) {
    throw new Error(
      'useGeolocationContext must be used within a GeolocationProvider',
    );
  }
  return context;
}
