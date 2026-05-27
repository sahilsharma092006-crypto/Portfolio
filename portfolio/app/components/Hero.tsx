"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();

  // Fake camera movement: background moves slower, front moves faster.
  const bgY = useTransform(scrollY, [0, 900], [0, 180]);
  const midY = useTransform(scrollY, [0, 900], [0, 300]);
  const frontY = useTransform(scrollY, [0, 900], [0, 420]);

  // Fake zoom (camera dolly-in)
  const zoom = useTransform(scrollY, [0, 900], [1, 1.12]);

  // Slight parallax X to feel like a camera move
  const x = useTransform(scrollY, [0, 900], [0, -18]);
  const fogY = useTransform(scrollY, [0, 900], [0, 120]);

  // Depth blur: far layers blur more.

  // (Optional) blur values if your Framer Motion types support transform -> filter.
  // Kept simple here for compatibility.
  // NOTE: keeping blur transforms optional (no-op in this version for TS compatibility)
  // const bgBlur = useTransform(scrollY, [0, 900], [3, 0]);
  // const midBlur = useTransform(scrollY, [0, 900], [2, 0]);
  // const frontBlur = useTransform(scrollY, [0, 900], [0.5, 0]);

  return (
    <section
      className="relative h-[140vh] overflow-hidden bg-black"
      aria-label="Cinematic hero"
    >
      {/* Sticky viewport for the "movie frame" */}
      <div className="sticky top-0 h-screen w-full">
        {/* Perspective + transform container */}
        <motion.div
          className="absolute inset-0 [perspective:1000px] [transform-style:preserve-3d]"
          style={{ scale: zoom, x }}
        >
          {/* Gradient base */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.20),transparent_55%),radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_45%)]" />

          {/* Background layer (far) */}
          <motion.img
            src="/hero/bg.png"
            alt="Background"
            className="absolute left-0 top-0 h-full w-full object-cover"
            style={{
              y: bgY,
              filter: `blur(3px) saturate(1.05)`,
              opacity: 0.98,
              transform: "translateZ(-120px) rotateX(8deg) scale(1.06)",
            }}
          />

          {/* Mid layer */}
          <motion.img
            src="/hero/mid.png"
            alt="Mid objects"
            className="absolute left-0 top-0 h-full w-full object-cover"
            style={{
              y: midY,
              filter: `blur(2px) saturate(1.05)`,
              /* Note: exported PNGs are already depth-separated; this blur adds cinematic focus */
              transform: "translateZ(-40px) rotateX(6deg) scale(1.04)",
            }}
          />

          {/* Foreground layer (near) */}
          <motion.img
            src="/hero/front.png"
            alt="Foreground"
            className="absolute left-0 top-0 h-full w-full object-cover"
            style={{
              y: frontY,
              filter: `blur(0.5px) saturate(1.1)`,
              transform: "translateZ(70px) rotateX(4deg) scale(1.02)",
            }}
          />

          {/* Fog / FX overlay */}
          <motion.img
            src="/hero/fog.png"
            alt="Fog"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
            style={{
              y: fogY,
              filter: "blur(6px) contrast(1.05)",
              transform: "translateZ(10px) scale(1.08)",
            }}
          />


          {/* Light leaks */}
          <div className="pointer-events-none absolute inset-0 opacity-50 [background:linear-gradient(90deg,rgba(59,130,246,0.25),transparent_45%),linear-gradient(180deg,rgba(16,185,129,0.12),transparent_60%),radial-gradient(circle_at_25%_30%,rgba(56,189,248,0.25),transparent_45%)]" />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.75)_100%)]" />

          {/* Grain */}
          <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay">
            <div
              className="h-full w-full [background-image:url('/hero/grain.png')] [background-size:200px_200px]"
            />
          </div>
        </motion.div>

        {/* Cinematic UI */}
        <div className="relative z-50 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="absolute left-1/2 top-10 -translate-x-1/2 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.4em] text-white/70 backdrop-blur">
            PORTFOLIO / CINEMATIC DEPTH

          </div>

          <h1 className="mt-10 text-7xl font-black tracking-tight text-white sm:text-[88px]">
            SAHIL SHARMA
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
            Software & Web Developer — BCA student building full-stack apps, automation tools,
            and data-driven web experiences.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-blue-500/20 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.25)] ring-1 ring-blue-400/30 backdrop-blur transition hover:bg-blue-500/28"
            >
              View projects

            </a>
            <a
              href="#contact"
              className="rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur transition hover:bg-white/8"
            >
              Contact

            </a>
          </div>

          {/* Scroll hint */}
          <div className="pointer-events-none mt-16 text-white/60">
            <div className="mx-auto h-10 w-10 rounded-full border border-white/15 bg-white/5" />
            <div className="mt-3 text-xs tracking-widest">SCROLL</div>
          </div>
        </div>
      </div>
    </section>
  );
}

