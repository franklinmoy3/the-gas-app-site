'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useGasStationSortContext } from '@/components/custom/gas-station-sort-provider';

const sortOptions = [
  { value: 'distance', label: 'Distance' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
];

export function SortOptions() {
  const { sortBy, setSortBy } = useGasStationSortContext();

  return (
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
  );
}
