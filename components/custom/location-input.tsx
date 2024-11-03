'use client';

import { useGeolocationContext } from '@/components/custom/geolocation-provider';

export function LocationInput() {
  const { position } = useGeolocationContext();

  return (
    <div>
      <div className="text-sm">
        {position && `${position.latitude}, ${position.longitude}`}
        {position === null &&
          'Location permission refused.\nPlease enter your ZIP code:'}
        {position === undefined && 'Loading...'}
      </div>
    </div>
  );
}
