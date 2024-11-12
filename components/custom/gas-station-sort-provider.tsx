import { createContext, useContext, useState, ReactNode } from 'react';

type GasStationSortContextType = {
  sortBy: string;
  searchRadiusMiles: number;
  setSortBy: (value: string) => void;
  setSearchRadiusMiles: (value: number) => void;
};

const GasStationSortContext = createContext<
  GasStationSortContextType | undefined
>(undefined);

export function GasStationSortProvider({ children }: { children: ReactNode }) {
  const [sortBy, setSortBy] = useState('distance');
  const [searchRadiusMiles, setSearchRadiusMiles] = useState<number>(10);

  return (
    <GasStationSortContext.Provider
      value={{ sortBy, searchRadiusMiles, setSortBy, setSearchRadiusMiles }}
    >
      {children}
    </GasStationSortContext.Provider>
  );
}

export function useGasStationSortContext() {
  const context = useContext(GasStationSortContext);
  if (context === undefined) {
    throw new Error(
      'useGasStationSortContext must be used within a GasStationSortProvider',
    );
  }
  return context;
}
