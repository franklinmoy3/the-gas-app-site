'use client';

import { useGeolocationContext } from '@/components/custom/geolocation-provider';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, UpdateIcon } from '@radix-ui/react-icons';
import { GeolocationToggle } from '@/components/custom/geolocation-toggle';

export function GeolocationInput() {
  const {
    position,
    userAllowedGeolocation,
    zipCode,
    zipCodeLoading,
    invalidZipCode,
    errorMessage,
    providerDisabled,
    handleZipCodeChange,
    handleUseUserLocationChange,
  } = useGeolocationContext();
  const [value, setValue] = useState<string>(zipCode);
  const [badInput, setBadInput] = useState<boolean>(false);

  useEffect(() => {
    setValue(zipCode);
  }, [zipCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBadInput(false);
    if (!zipCodeLoading) {
      handleUseUserLocationChange(false);
      handleZipCodeChange(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '').slice(0, 5);
    setValue(newValue);
  };

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBadInput(true);
  };

  return (
    <div>
      <div className="text-sm">
        {!userAllowedGeolocation &&
          position.latitude !== Infinity &&
          !providerDisabled &&
          "We couldn't get your location.\nPlease enter your ZIP code:"}
        {position.latitude === Infinity && 'Loading...'}
      </div>
      <GeolocationToggle />
      {position.latitude !== Infinity && (
        <form onSubmit={handleSubmit} className="relative mt-1 max-w-sm">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            minLength={5}
            maxLength={5}
            required
            value={value}
            onChange={handleChange}
            onInvalid={handleInvalid}
            disabled={providerDisabled}
            className="rounded-none border-gray-300 pr-10 shadow-sm [appearance:textfield] focus:border-gray-400 focus:ring-gray-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter a ZIP code..."
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
              disabled={providerDisabled}
              className="absolute right-0 top-0 h-full rounded-none px-3 py-2 hover:bg-inherit"
            >
              <ArrowRightIcon className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Submit</span>
            </Button>
          )}
        </form>
      )}
      {errorMessage && !invalidZipCode && (
        <div className="mt-1 text-sm text-red-500">{errorMessage}</div>
      )}
      {(badInput || invalidZipCode) && (
        <div className="mt-1 text-sm text-red-500">Invalid ZIP code</div>
      )}
    </div>
  );
}
