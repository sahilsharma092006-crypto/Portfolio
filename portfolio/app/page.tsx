'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useProjects } from './useProjects';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectModal, { Project } from './components/ProjectModal';
import { AnimatedText } from './components/ui/AnimatedText';
import Contact from '../Contact';
import CinematicPortfolio from './components/CinematicPortfolio';
import LaptopShowcase from './components/LaptopShowcase';
import EditorialGrid from './components/EditorialGrid';

export default function Home() {
  const { projects, loading } = useProjects();
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectList = useMemo(() => projects ?? [], [projects]);

  const onSelect = (p: Project) => {
    setSelectedProject(p);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    window.setTimeout(() => setSelectedProject(null), 150);
  };

  return (
    <main className="bg-black text-white scroll-smooth">
      {/* HOME - Fake 3D Cinematic Hero */}
      <section id="home">
        <Hero />
      </section>

      {/* CINEMATIC PROJECTS (Full Screen 3D scroll) */}
      <section id="cinematic-projects" className="scroll-mt-24">
        <CinematicPortfolio />
      </section>

      {/* 3D SHOWCASE */}
      <LaptopShowcase />

      {/* EDITORIAL REVEAL */}
      <EditorialGrid />

      {/* ALL PROJECTS GRID */}
      <section id="projects" className="relative py-24 bg-zinc-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <AnimatedText 
              text="Complete Portfolio" 
              className="text-4xl font-bold font-poppins mb-4 justify-center" 
              type="word" 
            />
            <p className="text-gray-400">A grid view of all recent work and experiments.</p>
          </div>
          {loading ? (
            <div className="py-16 text-center text-gray-500 font-mono">Loading Projects...</div>
          ) : (
            <ProjectsGrid projects={projectList} onSelect={onSelect} />
          )}
        </div>
      </section>

      {/* MODAL FOR GRID */}
      <AnimatePresence>
        <ProjectModal open={open} onClose={onClose} project={selectedProject} />
      </AnimatePresence>

      {/* ABOUT & SKILLS */}
      <section id="about" className="relative z-10 bg-black min-h-screen flex items-center scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-4xl mb-24">
            <AnimatedText 
              text="My Journey & Strengths" 
              className="text-4xl md:text-6xl font-bold font-poppins mb-8 leading-tight" 
              type="word" 
            />
            <p className="text-gray-400 text-xl leading-relaxed mb-6">
              I am a Bachelor of Computer Applications student at Christ University, Pune. I am a Quick Learner, Hardworking, Punctual, Team Player, and Logical Thinker.
            </p>
            <p className="text-gray-400 text-xl leading-relaxed">
              When I'm not coding, I enjoy Basketball, Volleyball, and Dance. I'm fluent in English, Hindi, and Marathi.
            </p>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.4em] text-white/70 backdrop-blur">
              EDUCATION
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
              <h3 className="text-xl font-bold text-cyan-400">2025 — Present</h3>
              <p className="mt-2 text-lg text-white font-semibold">Bachelor of Computer Applications</p>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">Christ University, Lavasa · Pune</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
              <h3 className="text-xl font-bold text-blue-400">2025</h3>
              <p className="mt-2 text-lg text-white font-semibold">12th — Higher Secondary</p>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">HSC Board · Maharashtra (55.33%)</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
              <h3 className="text-xl font-bold text-purple-400">2023</h3>
              <p className="mt-2 text-lg text-white font-semibold">10th — Secondary</p>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">SSC Board · Maharashtra (63%)</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.4em] text-white/70 backdrop-blur">
              SKILLS / TOOLKIT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
              <h3 className="text-xl font-bold text-cyan-400">Frontend Web</h3>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">HTML, CSS, JavaScript, React, Next.js, TailwindCSS, Framer Motion</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
              <h3 className="text-xl font-bold text-blue-400">Backend & DB</h3>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">MySQL, Structured Data Storage</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
              <h3 className="text-xl font-bold text-purple-400">Programming Languages</h3>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">C++, Object Oriented Programming (OOP)</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative bg-zinc-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.4em] text-white/70 backdrop-blur">
              GET IN TOUCH
            </div>
            <AnimatedText 
              text="Let's create something together." 
              className="text-4xl md:text-5xl font-bold mt-8 justify-center" 
              type="word" 
            />
          </div>
          <Contact />
        </div>
      </section>
    </main>
  );
}
