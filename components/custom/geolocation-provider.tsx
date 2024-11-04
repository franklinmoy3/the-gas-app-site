'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { Coordinates } from '@/lib/greatCircleDistance';

const defaultPosition: Coordinates = {
  // We'll use San Francisco as the default location
  latitude: 37.7749,
  longitude: -122.4194,
};

type GeolocationContextType = {
  userAllowedGeolocation: boolean;
  position: Coordinates;
  zipCode: number;
  setZipCode: (zipCode: number) => void;
};

const GeolocationContext = createContext<GeolocationContextType | undefined>(
  undefined,
);

export function GeolocationProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<Coordinates>({
    latitude: Infinity,
    longitude: Infinity,
  });
  const [zipCode, setZipCode] = useState<number>(94103);
  const [userAllowedGeolocation, setUserAllowedGeolocation] =
    useState<boolean>(false);

  const geolocationSuccessCallback = (position: GeolocationPosition) => {
    setUserAllowedGeolocation(true);
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const geolocationErrorCallback = (error: GeolocationPositionError) => {
    console.warn(error);
    // Maybe consider paying for an IP geolocation service to set a fallback position.
    setPosition(defaultPosition);
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
    <GeolocationContext.Provider
      value={{
        position,
        zipCode,
        userAllowedGeolocation,
        setZipCode,
      }}
    >
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
