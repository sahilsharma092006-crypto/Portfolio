"use client";

import React from "react";

export default function DepthBlurSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      <div className="absolute inset-0 rounded-3xl [background:radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_45%)]" />
      <div className="relative">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="mt-4 text-white/70">{children}</div>
      </div>
    </section>
  );
}

