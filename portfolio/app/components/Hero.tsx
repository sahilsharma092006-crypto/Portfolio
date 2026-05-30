'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatedText } from './ui/AnimatedText';
import TypewriterText from './TypewriterText';

// NOTE: existing dark/cinematic styling kept; animations implemented with Framer Motion + pure CSS.
export default function Hero() {
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax offsets for the "Fake 3D" layers described in README_BLACKBOXAI.md
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef as unknown as React.RefObject<HTMLElement>}
      className="relative h-[120vh] w-full overflow-hidden bg-black"
    >
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
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
        >
          {/* 5) Glitch Hover Effect on Name (Pure CSS) */}
          <style jsx global>{`
            .heroName {
              position: relative;
              display: inline-block;
            }
            .heroName:hover::before,
            .heroName:hover::after {
              content: attr(data-text);
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              pointer-events: none;
            }
            .heroName:hover::before {
              text-shadow: -2px 0 #ff0040;
              animation: glitch-anim-1 0.4s steps(1) infinite;
            }
            .heroName:hover::after {
              text-shadow: 2px 0 #00ffcc;
              animation: glitch-anim-2 0.4s steps(1) infinite;
            }

            @keyframes glitch-anim-1 {
              0% { clip-path: inset(20% 0 50% 0); transform: translateX(-4px); }
              25% { clip-path: inset(10% 0 80% 0); transform: translateX(4px); }
              50% { clip-path: inset(60% 0 10% 0); transform: translateX(-4px); }
              75% { clip-path: inset(30% 0 40% 0); transform: translateX(4px); }
              100% { clip-path: inset(20% 0 50% 0); transform: translateX(-4px); }
            }
            @keyframes glitch-anim-2 {
              0% { clip-path: inset(40% 0 20% 0); transform: translateX(4px); }
              25% { clip-path: inset(70% 0 10% 0); transform: translateX(-4px); }
              50% { clip-path: inset(10% 0 60% 0); transform: translateX(4px); }
              75% { clip-path: inset(50% 0 30% 0); transform: translateX(-4px); }
              100% { clip-path: inset(40% 0 20% 0); transform: translateX(4px); }
            }

            @media (prefers-reduced-motion: reduce) {
              .heroName:hover::before,
              .heroName:hover::after {
                animation: none;
              }
            }
          `}</style>

          {/* 1) Sliding Word Reveal (hero heading) */}
          {/* Hero name is a single word (SAHIL). Implemented as per-character masked slide-up slices. */}
          <h1
            className="heroName text-7xl md:text-[12rem] font-bold tracking-tighter text-white relative cursor-default select-none"
            data-text="SAHIL"
          >
            <AnimatedText text="SAHIL" type="word" />
          </h1>

          {/* 2) Character Cascade (subtitle/role fixed line) */}
          <div className="mt-4 flex flex-col items-center">
            <p className="text-xs md:text-sm font-light tracking-[0.8em] text-blue-400 uppercase">
              <AnimatedText text="Creative 3D Artist &" type="char" delay={0.6} />
            </p>

            {/* 3) Typewriter role switcher + cursor */}
            <p className="text-lg md:text-2xl font-mono text-white/80 mt-2">
              <TypewriterText />
            </p>

          </div>
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
          animate={reduce ? undefined : { height: [0, 48, 0], y: [0, 0, 48] }}
          transition={reduce ? undefined : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="w-px bg-blue-500"
        />
      </div>
    </section>
  );
}
