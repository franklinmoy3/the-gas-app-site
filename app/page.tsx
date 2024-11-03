'use client';

import { Suspense } from 'react';
import { GasStationList } from '@/components/custom/gas-station-list';
import { Navbar } from '@/components/custom/navbar';
import { Sidebar } from '@/components/custom/sidebar';
import { Footer } from '@/components/custom/footer';
import { GasStationSortProvider } from '@/components/custom/gas-station-sort-provider';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <GasStationSortProvider>
        <Navbar />
        <div className="flex flex-1">
          <Sidebar className="hidden md:block" />
          <main className="flex-1 p-6">
            <Suspense fallback={<div>Loading...</div>}>
              <GasStationList />
            </Suspense>
          </main>
        </div>
      </GasStationSortProvider>
      <Footer />
    </div>
  );
}
