'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { SortOptions } from '@/components/custom/sort-options';
import { ThemeSelector } from '@/components/custom/theme-selector';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-background p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">The Gas App</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle />
            <div className="mt-6 flex flex-col space-y-4">
              <h2 className="text-lg font-semibold">Sort Options</h2>
              <SortOptions />
            </div>
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
