"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PHOTOS = [
  { src: "/images/profile.jpg", label: "PROFILE", span: "col-span-6 md:col-span-2" },
  { src: "/images/hero-shot.jpg", label: "VISION", span: "col-span-6 md:col-span-2" },
  { src: "/images/perspective.jpg", label: "DEPTH", span: "col-span-6 md:col-span-2" },
  { src: "/images/aerial.jpg", label: "STRUCTURE", span: "col-span-6 md:col-span-3" },
  { src: "/images/closeup.jpg", label: "DETAIL", span: "col-span-6 md:col-span-3" },
];

export default function EditorialGrid() {
  return (
    <section className="bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-6 gap-4 auto-rows-[400px]">
        {PHOTOS.map((item, i) => (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`relative group overflow-hidden rounded-sm ${item.span}`}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="object-cover transition-all duration-400 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale(1.04) group-hover:brightness(1.1)"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-6 left-6 overflow-hidden">
              <motion.span 
                className="block text-white font-bold tracking-[0.15em] text-shadow transition-transform duration-400 group-hover:-translate-y-2"
                style={{ 
                  fontSize: 'clamp(14px, 2vw, 22px)',
                  fontFamily: 'Impact, "Arial Black", sans-serif'
                }}
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                {item.label}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
      <style jsx global>{`
        .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        @media (prefers-reduced-motion: reduce) {
          section * {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}