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
        <div className="relative flex flex-1">
          <Sidebar className="fixed left-0 top-[57px] mt-2 hidden h-[calc(100vh-57px)] md:block" />
          <main className="flex-1 overflow-y-auto md:ml-64">
            <div className="p-6">
              <Suspense fallback={<div>Loading...</div>}>
                <GasStationList />
              </Suspense>
            </div>
          </main>
        </div>
      </GasStationSortProvider>
      <Footer className="md:ml-64" />
    </div>
  );
}
