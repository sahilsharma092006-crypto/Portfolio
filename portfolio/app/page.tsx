'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useProjects } from './useProjects';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectModal, { Project } from './components/ProjectModal';
import Contact from '../Contact';

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
<<<<<<< HEAD
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
=======
    <main className="bg-black text-white">
      {/* HOME */}
      <div id="home">
        <Hero />
      </div>

      {/* PROJECTS */}
      <div className="relative">
        {loading ? (
          <div className="py-16 text-center text-gray-500 font-mono">Loading Projects...</div>
        ) : (
          <ProjectsGrid projects={projectList} onSelect={onSelect} />
        )}
      </div>

      <AnimatePresence>
        <ProjectModal open={open} onClose={onClose} project={selectedProject} />
      </AnimatePresence>

      {/* SKILLS */}
      <section id="skills" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.4em] text-white/70 backdrop-blur">
            SKILLS / TOOLKIT
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-bold">Frontend</h3>
            <p className="mt-2 text-sm text-white/70">React, Next.js, TailwindCSS, Framer Motion</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-bold">Backend</h3>
            <p className="mt-2 text-sm text-white/70">Firebase Auth, Firestore, REST APIs, Admin workflows</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-bold">Engineering</h3>
            <p className="mt-2 text-sm text-white/70">Automation, clean architecture, performance-minded UI</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.4em] text-white/70 backdrop-blur">
              CONTACT
            </div>
          </div>
          <Contact />
<<<<<<< HEAD
>>>>>>> 95a7616fab6c8b98d972030617beb18090d80590
=======
>>>>>>> 95a7616fab6c8b98d972030617beb18090d80590
        </div>
      </section>
    </main>
  );
}

