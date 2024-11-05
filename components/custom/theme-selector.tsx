'use client';

import { useState, useEffect } from 'react';
import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ButtonProps } from '@/components/ui/button';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

export function ThemeSelector({
  buttonVariant = 'outline',
  dropdownAlign = 'end',
}: {
  buttonVariant?: ButtonProps['variant'];
  dropdownAlign?: DropdownMenuContentProps['align'];
}) {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderThemeIcon = () => {
    if (!isMounted) {
      return null; // prevent hydration error
    } else if (theme === 'light') {
      return <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />;
    } else if (theme === 'dark') {
      return (
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
      );
    } else {
      return (
        <LaptopIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} size="icon">
          {renderThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={dropdownAlign}>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
