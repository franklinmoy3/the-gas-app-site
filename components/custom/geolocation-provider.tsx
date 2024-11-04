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
  zipCodeLoading: boolean;
  errorMessage: string | null;
  handleZipCodeChange: (zipCode: number) => void;
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
  const [zipCodeLoading, setZipCodeLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userAllowedGeolocation, setUserAllowedGeolocation] =
    useState<boolean>(false);

  const handleZipCodeChange = (zipCode: number) => {
    setZipCodeLoading(true);
    // I don't really trust Nominatim since some of its answers were incorrect.
    // We might need to build our own ZIP->coordinates database to be more accurate.
    fetch(
      `https://nominatim.openstreetmap.org/search?country=us&postalcode=${zipCode}&format=jsonv2`,
      { cache: 'force-cache' },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setZipCode(zipCode);
          setErrorMessage(null);
          setPosition({
            latitude: data[0].lat,
            longitude: data[0].lon,
          });
        } else {
          setErrorMessage('Invalid ZIP code');
        }
      })
      .finally(() => {
        setZipCodeLoading(false);
      });
  };

  const geolocationSuccessCallback = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`,
      { cache: 'force-cache' },
    )
      .then((res) => res.json())
      .then((data) => {
        setZipCode(data.address.postcode);
        setUserAllowedGeolocation(true);
        setPosition({
          latitude,
          longitude,
        });
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
        zipCodeLoading,
        errorMessage,
        userAllowedGeolocation,
        handleZipCodeChange,
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
