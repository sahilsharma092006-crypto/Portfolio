"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "./ui/AnimatedText";

export default function DepthBlurSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Cinematic Parallax Band */}
      <div className="relative h-[400px] w-full mb-12 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('/images/perspective.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-6">
          <AnimatedText 
            text="CRAFTED WITH CODE. DRIVEN BY VISION." 
            className="text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-4xl"
            type="word"
          />
        </div>
      </div>

      <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur max-w-7xl mx-auto">
      <div className="absolute inset-0 rounded-3xl [background:radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_45%)]" />
      <div className="relative">
        <div className="mb-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="will-change-transform"
          >
            <AnimatedText text={title} className="text-2xl font-bold text-white" type="word" />
          </motion.div>
        </div>
        <div className="mt-4 text-white/70">{children}</div>
      </div>
    </section>
  );
}
