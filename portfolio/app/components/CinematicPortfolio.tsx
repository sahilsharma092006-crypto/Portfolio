'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useProjects, Project } from '../useProjects';

// Note: keep this component dependency-free (no clsx/tailwind-merge) so Next.js builds
// even if those packages aren't installed.


export default function CinematicPortfolio() {
  const { projects, loading } = useProjects();
  const containerRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-sm uppercase tracking-[0.3em] font-light"
        >
          Loading Cinematic Universe...
        </motion.div>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="bg-black">
      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}
    </main>
  );
}

function ProjectSection({ project, index }: { project: Project; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Mouse Tracking for Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  // Scroll Tracking for Depth Effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center perspective-[1500px]"
    >
      {/* Layer 1: Background Parallax (Deepest) */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        {project.images.hero && (
          <img 
            src={project.images.hero} 
            alt="" 
            className="h-full w-full object-cover grayscale opacity-30 scale-110"
          />
        )}
      </motion.div>

      {/* Layer 2: Main 3D Card (Middle Ground) */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: imageScale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="relative z-20 w-[90%] max-w-5xl aspect-video rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 z-0">
          {project.images.thumb && (
            <img 
              src={project.images.thumb} 
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Layer 3: Floating Text (Foreground - High Z-index) */}
        <motion.div 
          style={{ y: contentY, translateZ: "100px" }}
          className="relative z-30 h-full flex flex-col justify-end p-8 md:p-16"
        >
          <div className="max-w-2xl">
            <motion.span className="inline-block text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              {project.category} — {project.year}
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {project.name}
            </h2>
            <p className="text-white/60 text-lg md:text-xl line-clamp-3 mb-8 font-light leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[10px] uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
