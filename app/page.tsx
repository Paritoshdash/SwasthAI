"use client";

// Keep your existing imports
import { Hero } from '@/components/hero';
// import FeatureCards from '@/components/feature-cards';
// import Testimonials from '@/components/testimonials';
import MaternalChildCTA from '@/components/maternal-child-cta'; // <-- Import the new component

export default function Home() {
  return (
    <main>
      <Hero />
      <MaternalChildCTA /> {/* <-- Add it here, perhaps after the Hero section */}
      {/* <FeatureCards />
      <Testimonials /> */}
      {/* ... other sections */}
    </main>
  );
}
