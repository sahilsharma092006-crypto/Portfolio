"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const PHOTOS = [
  "/images/profile.jpg",
  "/images/hero-shot.jpg",
  "/images/perspective.jpg",
  "/images/aerial.jpg",
  "/images/closeup.jpg",
];

export default function LaptopShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ dx: 0, dy: 0 });
  const frameId = useRef<number | null>(null);
  const targetRotate = useRef({ x: 0, y: 0 });

  // Animation Cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Lerp Mouse Tilt Logic
  useEffect(() => {
    const animate = () => {
      setRotate((prev) => ({
        x: prev.x + (targetRotate.current.x - prev.x) * 0.12,
        y: prev.y + (targetRotate.current.y - prev.y) * 0.12,
      }));
      frameId.current = requestAnimationFrame(animate);
    };
    frameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId.current!);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    targetRotate.current = { x: -dy * 15, y: dx * 20 };
    setMouse({ dx, dy });
  };

  const handleMouseLeave = () => {
    targetRotate.current = { x: 0, y: 0 };
    setMouse({ dx: 0, dy: 0 });
  };

  return (
    <section 
      className="relative py-32 flex items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* Ambient Glow */}
      <div 
        className="absolute w-[600px] h-[400px] rounded-full opacity-20 pointer-events-none transition-transform duration-300"
        style={{
          background: 'radial-gradient(ellipse, rgba(20,200,140,0.2), transparent)',
          filter: 'blur(60px)',
          transform: `translate(${mouse.dx * 40}px, ${mouse.dy * 40}px)`,
        }}
      />

      {/* Laptop Wrapper */}
      <div 
        className="relative z-10 w-full max-w-4xl px-8"
        style={{ 
          perspective: '900px',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Outer Lid */}
        <div className="relative bg-[#252525] rounded-t-[14px] p-[2px] shadow-[0_0_0_1.5px_#3a3a3a]">
          {/* Camera */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-white/5" />
          
          {/* Bezel */}
          <div className="bg-[#0a0a0a] rounded-[6px] overflow-hidden aspect-[16/10] relative">
            {/* Photos Slideshow */}
            {PHOTOS.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ 
                  opacity: currentIndex === i ? 1 : 0,
                  // Internal depth parallax at 40% tilt intensity
                  transform: `perspective(1000px) rotateX(${rotate.x * 0.4}deg) rotateY(${rotate.y * 0.4}deg) translate(${mouse.dx * -10}px, ${mouse.dy * -10}px) scale(1.15)`,
                }}
              >
                <Image src={src} alt="Showcase" fill className="object-cover" />
              </div>
            ))}

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-30" 
                 style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)' }} />
            
            {/* Glare Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                background: `radial-gradient(circle at ${(mouse.dx + 1) * 50}% ${(mouse.dy + 1) * 50}%, rgba(255,255,255,0.13) 0%, transparent 55%)`
              }}
            />
          </div>
        </div>

        {/* Hinge & Base */}
        <div className="relative">
          <div className="h-2 bg-[#1a1a1a] w-full" />
          <div className="h-4 bg-[#252525] w-[104%] -ml-[2%] rounded-b-[12px] shadow-xl flex justify-center">
            <div className="w-24 h-1 bg-[#1a1a1a] mt-1 rounded-full opacity-50" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          section * {
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}