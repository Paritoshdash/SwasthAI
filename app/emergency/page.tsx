// app/emergency/page.tsx
'use client'

import dynamic from 'next/dynamic';

// Dynamically import the locator component to avoid SSR issues with Leaflet
const EmergencyLocator = dynamic(
  () => import('@/components/emergency-locator'),
  { ssr: false }
);

export default function EmergencyPage() {
  return (
    <main>
        <div className="text-center p-4 bg-red-600 text-white">
            <h1 className="text-3xl font-bold">Emergency Hospital Finder</h1>
            <p>If this is a life-threatening emergency, please call your local emergency number immediately.</p>
        </div>
        <EmergencyLocator />
    </main>
  );
}