'use client';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useGasStationSortContext } from './gas-station-sort-provider';

export function PriceHistoryCalendar() {
  const { availableDates, selectedDate, setSelectedDate } =
    useGasStationSortContext();

  return (
    <div className="mt-6 flex flex-col space-y-2">
      <label className="text-lg font-semibold">Prices For Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className="max-w-sm pl-3 text-left font-normal"
          >
            {selectedDate.toLocaleDateString()}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            disabled={(date) =>
              !availableDates.includes(format(date, 'yyyy-MM-dd'))
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
