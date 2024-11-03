import { createContext, useContext, useState, ReactNode } from 'react';

type GasStationSortContextType = {
  sortBy: string;
  setSortBy: (value: string) => void;
};

const GasStationSortContext = createContext<
  GasStationSortContextType | undefined
>(undefined);

export function GasStationSortProvider({ children }: { children: ReactNode }) {
  const [sortBy, setSortBy] = useState('distance');

  return (
    <GasStationSortContext.Provider value={{ sortBy, setSortBy }}>
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
