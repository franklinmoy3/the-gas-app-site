'use client';

import { useGeolocationContext } from '@/components/custom/geolocation-provider';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, UpdateIcon } from '@radix-ui/react-icons';

export function GeolocationInput() {
  const {
    position,
    userAllowedGeolocation,
    zipCode,
    zipCodeLoading,
    badZipCode,
    handleZipCodeChange,
  } = useGeolocationContext();
  const [value, setValue] = useState<string>(zipCode.toString());

  useEffect(() => {
    setValue(zipCode.toString());
  }, [zipCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCodeLoading) {
      handleZipCodeChange(parseInt(value, 10));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '').slice(0, 5);
    setValue(newValue);
  };

  return (
    <div>
      <div className="text-sm">
        {!userAllowedGeolocation &&
          position.latitude !== Infinity &&
          "We couldn't get your location.\nPlease enter your ZIP code:"}
        {position.latitude === Infinity && 'Loading...'}
      </div>
      {position.latitude !== Infinity && (
        <form onSubmit={handleSubmit} className="relative mt-1 max-w-sm">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            value={value}
            onChange={handleChange}
            className="rounded-none border-gray-300 pr-10 shadow-sm [appearance:textfield] focus:border-gray-400 focus:ring-gray-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter your ZIP code..."
          />
          {zipCodeLoading && (
            <div className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-inherit">
              <UpdateIcon className="h-4 w-4 animate-spin" />
            </div>
          )}
          {!zipCodeLoading && (
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-0 top-0 h-full rounded-none px-3 py-2 hover:bg-inherit"
            >
              <ArrowRightIcon className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Submit</span>
            </Button>
          )}
        </form>
      )}
      {badZipCode && (
        <div className="mt-1 text-sm text-red-500">Invalid ZIP code</div>
      )}
    </div>
  );
}
