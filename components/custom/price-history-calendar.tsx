'use client';

import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const today = new Date();

export function PriceHistoryCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(today);
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
