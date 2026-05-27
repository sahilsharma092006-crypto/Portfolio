'use client';

import React from 'react';

import Hero from './components/Hero';
import CinematicPortfolio from './components/CinematicPortfolio';

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <CinematicPortfolio />
    </main>
  );
}
