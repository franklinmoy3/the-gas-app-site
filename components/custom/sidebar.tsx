import { cn } from '@/lib/utils';
import { SortOptions } from '@/components/custom/sort-options';

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('w-64 border-r bg-background p-6', className)}>
      <h2 className="mb-4 text-lg font-semibold">Sort Options</h2>
      <SortOptions />
    </aside>
  );
}
