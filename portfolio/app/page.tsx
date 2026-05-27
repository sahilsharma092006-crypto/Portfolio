'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { useProjects } from './useProjects';

// NOTE: Next.js/Turbopack sometimes reuses generated types; keep imports deterministic.


export default function Home() {
  const { projects, loading } = useProjects();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress into cinematic values
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 2]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.1, 0.3, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
  
  const glowY1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  
  const sectionOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

  // Mouse Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
    <main ref={containerRef} className="relative h-[400vh] bg-black">
      {/* Cinematic Background Layer */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
      >
        <h1 className="text-[15vw] font-bold select-none font-poppins tracking-tighter text-white">
          CINEMATIC
        </h1>
      </motion.div>

      {/* Floating Parallax Glows */}
      <motion.div 
        className="fixed top-[20%] left-[10%] w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"
        style={{ y: glowY1 }}
      />
      <motion.div 
        className="fixed bottom-[20%] right-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"
        style={{ y: glowY2 }}
      />

      {/* Content Layer */}
      <motion.section 
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-mono mb-4 tracking-tight">Sahil's Portfolio</h2>
        <p className="text-gray-400 font-inter text-sm uppercase tracking-[0.4em]">
          Scroll to explore the depth
        </p>
      </motion.section>

      <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => { x.set(0); y.set(0); }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur perspective-1000"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {project.images.thumb && (
                <img 
                  src={project.images.thumb} 
                  alt={project.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">{project.category}</p>
                <h3 className="text-2xl font-poppins font-bold">{project.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        {loading && <div className="text-center py-12 text-gray-500 font-mono">Loading Projects...</div>}
      </section>
    </main>
  );
}