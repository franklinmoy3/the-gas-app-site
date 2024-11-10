import { Checkbox } from '@/components/ui/checkbox';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useGeolocationContext } from '@/components/custom/geolocation-provider';

export function GeolocationToggle() {
  const {
    useUserLocation,
    userAllowedGeolocation,
    handleUseUserLocationChange,
  } = useGeolocationContext();

  if (!userAllowedGeolocation) {
    return null;
  }

  return (
    <div className="mb-4 flex items-center">
      <Checkbox
        id="geolocation-toggle"
        aria-label="Use My Location"
        checked={useUserLocation}
        onCheckedChange={handleUseUserLocationChange}
        className="mr-2"
      />
      <label htmlFor="geolocation-toggle" className="flex items-center text-sm">
        Use My Location
        <PaperPlaneIcon className="ml-2 -rotate-45" />
      </label>
    </div>
  );
}
