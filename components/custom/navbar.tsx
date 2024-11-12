'use client';

import { GeolocationInput } from '@/components/custom/geolocation-input';
import { SortOptions } from '@/components/custom/sort-options';
import { ThemeSelector } from '@/components/custom/theme-selector';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { PriceHistoryCalendar } from '@/components/custom/price-history-calendar';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background p-4">
      <div className="container mx-auto flex items-center justify-between">
        <label className="text-2xl font-bold">The Gas App</label>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" aria-describedby={undefined}>
            <SheetTitle />
            <GeolocationInput />
            <SortOptions />
            <PriceHistoryCalendar />
            <div className="mt-6 flex flex-row items-center gap-2">
              <p className="text-sm">Theme: </p>
              <ThemeSelector buttonVariant={'outline'} dropdownAlign="start" />
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden md:block">
          <ThemeSelector buttonVariant={'outline'} />
        </div>
      </div>
    </nav>
  );
}
