'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useGasStationSortContext } from '@/components/custom/gas-station-sort-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

const sortOptions = [
  { value: 'distance', label: 'Distance' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
];

const radiusOptions = [
  { value: 10, label: '10 Miles' },
  { value: 25, label: '25 Miles' },
  { value: 50, label: '50 Miles' },
  { value: 100, label: '100 Miles' },
  { value: Infinity, label: 'Any Distance' },
];

export function SortOptions() {
  const { sortBy, searchRadiusMiles, setSortBy, setSearchRadiusMiles } =
    useGasStationSortContext();

  return (
    <div className="mt-6 flex flex-col space-y-4">
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold">Max Distance</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'}>
              {
                radiusOptions.find(
                  (option) => option.value === searchRadiusMiles,
                )?.label
              }
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {radiusOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={searchRadiusMiles == option.value}
                onClick={() => setSearchRadiusMiles(option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold">Sort Options</label>
        <RadioGroup value={sortBy} onValueChange={setSortBy}>
          {sortOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                aria-label={option.label}
                value={option.value}
                id={option.value}
              />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
