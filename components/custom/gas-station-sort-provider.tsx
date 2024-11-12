import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type GasStationSortContextType = {
  sortBy: string;
  searchRadiusMiles: number;
  selectedDate: Date;
  availableDates: string[];
  setSortBy: (value: string) => void;
  setSearchRadiusMiles: (value: number) => void;
  setSelectedDate: (value: Date) => void;
};

const GasStationSortContext = createContext<
  GasStationSortContextType | undefined
>(undefined);

export function GasStationSortProvider({ children }: { children: ReactNode }) {
  const [sortBy, setSortBy] = useState('distance');
  const [searchRadiusMiles, setSearchRadiusMiles] = useState<number>(10);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      'https://api.github.com/repos/franklinmoy3/the-gas-app-db/git/refs/tags',
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        cache: 'default',
      },
    )
      .then((resp) => resp.json())
      .then((data) => {
        const dates = data.map((tag) => tag.ref.split('/')[2]);
        setAvailableDates(dates);
      });
  }, []);

  return (
    <GasStationSortContext.Provider
      value={{
        sortBy,
        searchRadiusMiles,
        selectedDate,
        availableDates,
        setSortBy,
        setSearchRadiusMiles,
        setSelectedDate,
      }}
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
