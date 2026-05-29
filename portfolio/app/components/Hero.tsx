'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 1.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Background shifts opposite to mouse, foreground shifts with mouse
  const bgMouseX = useTransform(smoothMouseX, [-1, 1], ["-2%", "2%"]);
  const bgMouseY = useTransform(smoothMouseY, [-1, 1], ["-2%", "2%"]);

  const midMouseX = useTransform(smoothMouseX, [-1, 1], ["-1%", "1%"]);
  const midMouseY = useTransform(smoothMouseY, [-1, 1], ["-1%", "1%"]);

  const frontMouseX = useTransform(smoothMouseX, [-1, 1], ["2%", "-2%"]);
  const frontMouseY = useTransform(smoothMouseY, [-1, 1], ["2%", "-2%"]);

  // Scroll Parallax offsets
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Handle Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
    const y = (e.clientY / innerHeight) * 2 - 1; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative h-[120vh] w-full overflow-hidden bg-black"
    >
      {/* Light Leak (Cinematic Effect) */}
      <motion.div 
        animate={{ 
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full z-10 pointer-events-none mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] -right-[10%] w-[40%] h-[60%] bg-cyan-400/10 blur-[150px] rounded-full z-10 pointer-events-none mix-blend-screen"
      />

      {/* Layer 1: Background (Farthest) */}
      <motion.div style={{ y: bgY, x: bgMouseX, translateY: bgMouseY }} className="absolute inset-0 z-0">
        <Image src="/hero/bg_user.png" alt="Sahil" fill className="object-cover opacity-70 scale-[1.15]" />
      </motion.div>

      {/* Layer 2: Midground / Fog */}
      <motion.div style={{ y: midY, x: midMouseX, translateY: midMouseY }} className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-60">
        <Image src="https://images.unsplash.com/photo-1542451313056-b7c8e6266459?q=80&w=1920&auto=format&fit=crop" alt="" fill className="object-cover scale-[1.1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
      </motion.div>

      {/* Content Layer (Floating) */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-20 flex h-screen flex-col items-center justify-center text-center px-6 drop-shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        >
          <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            SAHIL
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="mt-6 text-xs md:text-sm font-medium tracking-[1em] text-cyan-400 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          >
            Creative 3D Artist & Developer
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Layer 3: Foreground (Nearest Bokeh/Dust) */}
      <motion.div style={{ y: frontY, x: frontMouseX, translateY: frontMouseY }} className="absolute inset-0 z-30 pointer-events-none mix-blend-screen opacity-50">
        <Image src="https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?q=80&w=1920&auto=format&fit=crop" alt="" fill className="object-cover scale-[1.12]" />
      </motion.div>

      {/* Cinematic Overlays (Pure CSS Grain) */}
      <div className="absolute inset-0 z-40 pointer-events-none opacity-20" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', mixBlendMode: 'overlay' }} />
      
      {/* Heavy Vignette */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-5">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">Scroll</span>
        <motion.div
          animate={{ height: [0, 60, 0], y: [0, 0, 60], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
        />
      </div>
    </section>
  );
}