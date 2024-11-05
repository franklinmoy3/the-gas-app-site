import { GeolocationInput } from '@/components/custom/geolocation-input';
import { SortOptions } from '@/components/custom/sort-options';
import { cn } from '@/lib/utils';

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('w-64 border-r bg-background p-6', className)}>
      <div className="mt-6 flex flex-col space-y-4">
        <h2 className="text-lg font-semibold">Location</h2>
        <GeolocationInput />
      </div>
      <div className="mt-6 flex flex-col space-y-4">
        <h2 className="text-lg font-semibold">Sort Options</h2>
        <SortOptions />
      </div>
    </aside>
  );
}
