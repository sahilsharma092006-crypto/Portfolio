"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "./ProjectModal";

export default function ProjectsGrid({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  const reduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.55 },
    }),
  };

  return (
    <section id="projects" className="mt-20">
      <div className="mb-8">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.4em] text-white/70 backdrop-blur">
          PROJECTS / SELECTED
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => onSelect(p)}
            custom={i}
            initial={reduce ? "show" : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, margin: "-20% 0px" }}
            variants={cardVariants}
            className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-0 text-left backdrop-blur"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(ellipse_at_top,rgba(56,189,248,0.22),transparent_55%)]" />

            <div className="relative p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{p.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {p.year}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {p.category}
                </span>
                {p.tags?.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-white/50 transition-colors group-hover:text-white/70">
                <span>Open details</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>

            <div className="relative">
              {p.images?.thumb ? (
                p.images.thumb.endsWith(".mp4") ? (
                  <video
                    src={p.images.thumb}
                    className="h-32 w-full object-cover opacity-25 transition-opacity duration-300 group-hover:opacity-35"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={p.images.thumb}
                    alt={`${p.name} thumbnail`}
                    className="h-32 w-full object-cover opacity-25 transition-opacity duration-300 group-hover:opacity-35"
                    loading="lazy"
                  />
                )
              ) : (

                <div className="h-32 w-full bg-gradient-to-r from-blue-500/20 to-emerald-500/10 opacity-40" ></div>

              )}
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

