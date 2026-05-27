'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax offsets for the "Fake 3D" layers described in README_BLACKBOXAI.md
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-black">
      {/* Layer 1: Background (Farthest) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Image src="/hero/bg.png" alt="" fill className="object-cover opacity-60 scale-110" />
      </motion.div>

      {/* Layer 2: Midground / Fog */}
      <motion.div style={{ y: midY }} className="absolute inset-0 z-10 pointer-events-none">
        <Image src="/hero/mid.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
      </motion.div>

      {/* Content Layer (Floating) */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-20 flex h-screen flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        >
          <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter text-white">
            SAHIL
          </h1>
          <p className="mt-4 text-xs md:text-sm font-light tracking-[0.8em] text-blue-400 uppercase">
            Creative 3D Artist & Developer
          </p>
        </motion.div>
      </motion.div>

      {/* Layer 3: Foreground (Nearest) */}
      <motion.div style={{ y: frontY }} className="absolute inset-0 z-30 pointer-events-none">
        <Image src="/hero/front.png" alt="" fill className="object-cover scale-105" />
      </motion.div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay opacity-30">
        <Image src="/hero/grain.png" alt="" fill className="object-cover animate-pulse" />
      </div>
      
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
        <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll to Explore</span>
        <motion.div
          animate={{ height: [0, 48, 0], y: [0, 0, 48] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px bg-blue-500"
        />
      </div>
    </section>
  );
}