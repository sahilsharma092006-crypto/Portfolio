'use client';

import React from 'react';

import Hero from './components/Hero';
import CinematicPortfolio from './components/CinematicPortfolio';

export default function Home() {
  return (
    <main className="bg-black text-white scroll-smooth">
      <section id="home">
        <Hero />
      </section>
      
      <section id="projects">
        <CinematicPortfolio />
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="max-w-4xl px-8">
          <h2 className="text-4xl font-bold font-poppins mb-8">About the Craft</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Focused on bridging the gap between high-end cinematography and interactive web experiences.
          </p>
        </div>
      </section>
    </main>
  );
}
