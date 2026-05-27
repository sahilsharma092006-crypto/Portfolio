"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export type Project = {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  images?: {
    thumb?: string;
    hero?: string;
  };
  tags?: string[];
};

export default function ProjectModal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
            aria-label="Close project modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} details`}
            className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-black/80 backdrop-blur"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.25),transparent_55%)]" />
              {project.images?.hero ? (
                project.images.hero.endsWith(".mp4") ? (
                  <video
                    src={project.images.hero}
                    className="h-64 w-full object-cover opacity-90"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <div className="relative h-64 w-full">
                    <Image
                      src={project.images.hero}
                      alt="Project preview"
                      fill
                      className="object-cover opacity-90"
                    />
                  </div>
                )
              ) : (
                <div className="h-64 w-full bg-gradient-to-br from-blue-500/20 to-emerald-500/10" />
              )}


              <div className="absolute left-6 top-6 flex items-center gap-2">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                  {project.year}
                </span>
              </div>

              <div className="absolute right-4 top-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="relative p-6">
              <h2 className="text-2xl font-bold text-white">{project.name}</h2>
              <p className="mt-3 text-white/70">{project.description}</p>

              {project.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 text-sm text-white/50">
                Tip: Replace placeholder images with your own screenshots or GIFs under
                <span className="text-white/60"> /public </span>.
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

