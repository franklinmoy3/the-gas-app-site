import { GeolocationInput } from '@/components/custom/geolocation-input';
import { SortOptions } from '@/components/custom/sort-options';
import { cn } from '@/lib/utils';

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('w-64 border-r bg-background p-6', className)}>
      <GeolocationInput />
      <SortOptions />
    </aside>
  );
}
