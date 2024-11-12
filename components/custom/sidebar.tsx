import { GeolocationInput } from '@/components/custom/geolocation-input';
import { SortOptions } from '@/components/custom/sort-options';
import { cn } from '@/lib/utils';
import { PriceHistoryCalendar } from '@/components/custom/price-history-calendar';

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('w-64 border-r bg-background p-6', className)}>
      <GeolocationInput />
      <SortOptions />
      <PriceHistoryCalendar />
    </aside>
  );
}
