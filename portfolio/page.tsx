'use client';

import { useParams } from 'next/navigation';
import { useProjects } from './app/useProjects';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, loading } = useProjects();
  
  const project = projects.find(p => p.id === id);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-black font-mono">Loading Story...</div>;
  if (!project) return <div className="flex min-h-screen items-center justify-center bg-black font-mono">Project Not Found</div>;

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={project.images.hero || project.images.thumb} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-blue-400 uppercase tracking-widest"
          >
            {project.category} — {project.year}
          </motion.p>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-2 text-5xl md:text-7xl font-bold font-poppins tracking-tighter"
          >
            {project.name}
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <section className="mx-auto max-w-4xl px-8 py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_250px]">
          <div className="space-y-6 text-lg leading-relaxed text-gray-300">
            <p>{project.description}</p>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Technologies</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
