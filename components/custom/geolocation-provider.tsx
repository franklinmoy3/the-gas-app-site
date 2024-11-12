'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Coordinates } from '@/lib/greatCircleDistance';
import { fetcher } from '@/lib/utils';
import useSWR from 'swr';

const defaultPosition: Coordinates = {
  // We'll use Chicago as the default location
  latitude: 41.8781,
  longitude: -87.6298,
};

type GeolocationContextType = {
  userAllowedGeolocation: boolean;
  useUserLocation: boolean;
  position: Coordinates;
  zipCode: string;
  zipCodeLoading: boolean;
  invalidZipCode: boolean;
  errorMessage: string | null;
  providerDisabled: boolean;
  handleUseUserLocationChange: (useUserLocation: boolean) => void;
  handleZipCodeChange: (zipCode: string) => void;
};

const GeolocationContext = createContext<GeolocationContextType | undefined>(
  undefined,
);

export function GeolocationProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<Coordinates>({
    latitude: Infinity,
    longitude: Infinity,
  });
  const [zipCode, setZipCode] = useState<string>('60606');
  const [useUserLocation, setUseUserLocation] = useState<boolean>(false);
  const userPosition = useRef<Coordinates>({
    latitude: Infinity,
    longitude: Infinity,
  });
  const userZipCode = useRef<string | null>(null);
  // Use the below state if we end up going back to API calls for each ZIP code coordinate req
  // const [zipCodeLoading, setZipCodeLoading] = useState<boolean>(false);
  const [invalidZipCode, setInvalidZipCode] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [providerDisabled, setProviderDisabled] = useState<boolean>(false);
  const [userAllowedGeolocation, setUserAllowedGeolocation] =
    useState<boolean>(false);

  // Nominatim reported incorrect coordinates for some ZIP codes, such as 12345.
  // So we use our fork of Geonames Gazeerter geocoding data.
  const { data, error, isLoading } = useSWR(
    `https://raw.githubusercontent.com/franklinmoy3/US-Zip-Code-Geocoding/main/data/US-condensed-mapped.json`,
    fetcher,
  );

  useEffect(() => {
    if (error) {
      setProviderDisabled(true);
      setErrorMessage(
        'Failed to connect to the geolocation service. Please refresh the page.',
      );
    }
  }, [error]);

  const handleZipCodeChange = (zipCode: string) => {
    if (zipCode in data) {
      setZipCode(zipCode);
      setErrorMessage(null);
      setInvalidZipCode(false);
      setPosition({
        latitude: data[zipCode].latitude,
        longitude: data[zipCode].longitude,
      });
    } else {
      setErrorMessage('Invalid ZIP code');
      setInvalidZipCode(true);
    }
  };

  const handleUseUserLocationChange = (useUserLocation: boolean) => {
    if (userZipCode.current) {
      handleZipCodeChange(userZipCode.current);
      setPosition(userPosition.current);
      setUseUserLocation(useUserLocation);
    }
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
        setUserAllowedGeolocation(true);
        setUseUserLocation(true);
        userZipCode.current = data.address.postcode;
        setZipCode(data.address.postcode);
        userPosition.current = { latitude, longitude };
        setPosition({ latitude, longitude });
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
        userAllowedGeolocation,
        useUserLocation,
        position,
        zipCode,
        zipCodeLoading: isLoading,
        invalidZipCode,
        errorMessage,
        providerDisabled,
        handleUseUserLocationChange,
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
