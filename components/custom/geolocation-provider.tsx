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
  badZipCode: boolean;
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
  const [badZipCode, setBadZipCode] = useState<boolean>(false);
  const [userAllowedGeolocation, setUserAllowedGeolocation] =
    useState<boolean>(false);

  const handleZipCodeChange = (zipCode: number) => {
    setZipCodeLoading(true);
    fetch(
      `https://nominatim.openstreetmap.org/search?country=us&postalcode=${zipCode}&format=jsonv2`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setZipCode(zipCode);
          setBadZipCode(false);
          setPosition({
            latitude: data[0].lat,
            longitude: data[0].lon,
          });
        } else {
          setBadZipCode(true);
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
        badZipCode,
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
