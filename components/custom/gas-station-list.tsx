'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGasStationSortContext } from '@/components/custom/gas-station-sort-provider';
import { LoadingSpinner } from '@/components/custom/loading-spinner';
import {
  Coordinates,
  computeGreatCircleDistance,
} from '@/lib/greatCircleDistance';
import { useGeolocationContext } from '@/components/custom/geolocation-provider';

interface PriceInfo {
  timestamp: number;
  price: number;
}

interface GasStation {
  franchiseName: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  currencySymbol: string;
  regularPrice: PriceInfo | null;
  midGradePrice: PriceInfo | null;
  premiumPrice: PriceInfo | null;
  dieselPrice: PriceInfo | null;
}

function sortStations(
  position: Coordinates | null | undefined,
  stations: GasStation[],
  sortBy: string,
) {
  return stations.sort((a, b) => {
    if (sortBy === 'price' || sortBy === 'price-desc') {
      const aPrice = a.regularPrice ? a.regularPrice.price : Infinity;
      const bPrice = b.regularPrice ? b.regularPrice.price : Infinity;
      return sortBy === 'price' ? aPrice - bPrice : bPrice - aPrice;
    } else if (sortBy === 'distance' && position) {
      const distanceA = computeGreatCircleDistance(position, {
        latitude: a.latitude,
        longitude: a.longitude,
      });
      const distanceB = computeGreatCircleDistance(position, {
        latitude: b.latitude,
        longitude: b.longitude,
      });
      return distanceA - distanceB;
    }
    return 0;
  });
}

export function GasStationList() {
  const [stations, setStations] = useState<GasStation[]>([]);
  const [sortedStations, setSortedStations] = useState<GasStation[]>([]);
  const [visibleStations, setVisibleStations] = useState<GasStation[]>([]);
  const visibleStationsCount = useRef(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { sortBy } = useGasStationSortContext();
  const { position } = useGeolocationContext();

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/franklinmoy3/the-gas-app-db/latest/prices.json',
    )
      .then((response) => response.json())
      .then((data) => {
        setStations(sortStations(position, data, sortBy));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching gas stations:', error);
        setError('Something went wrong. Please try again later.');
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const stationsSorted = sortStations(position, [...stations], sortBy);
    setSortedStations(stationsSorted);
  }, [position, stations, sortBy]);

  useEffect(() => {
    setVisibleStations(sortedStations.slice(0, visibleStationsCount.current));
  }, [sortedStations]);

  const loadMore = () => {
    setVisibleStations((prev) => [
      ...prev,
      ...sortedStations.slice(prev.length, prev.length + 6),
    ]);
    visibleStationsCount.current += 6;
  };

  const formatPrice = (currencySymbol: string, priceInfo: PriceInfo | null) => {
    if (!priceInfo) {
      return 'N/A';
    } else {
      return `${currencySymbol}${priceInfo.price}`;
    }
  };

  const formatDate = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = { timeZoneName: 'short' };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  const formatFranchise = (franchiseId: string) => {
    switch (franchiseId) {
      case 'SAMS_CLUB':
        return "Sam's Club";
      case 'COSTCO':
        return 'Costco';
      default:
        return franchiseId;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleStations.map((station, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{station.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {formatFranchise(station.franchiseName)}
              </p>
              <p className="text-sm text-muted-foreground">
                {station.streetAddress}
              </p>
              <p className="text-sm text-muted-foreground">{`${station.city}, ${station.state} ${station.postalCode}`}</p>
              <div className="mt-4">
                <p>
                  Regular:{' '}
                  {formatPrice(station.currencySymbol, station.regularPrice)}
                </p>
                <p>
                  Midgrade:{' '}
                  {formatPrice(station.currencySymbol, station.midGradePrice)}
                </p>
                <p>
                  Premium:{' '}
                  {formatPrice(station.currencySymbol, station.premiumPrice)}
                </p>
                <p>
                  Diesel:{' '}
                  {formatPrice(station.currencySymbol, station.dieselPrice)}
                </p>
              </div>
              {station.regularPrice && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Last updated: {formatDate(station.regularPrice.timestamp)}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {visibleStations.length < stations.length && (
        <div className="mt-6 text-center">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
}
