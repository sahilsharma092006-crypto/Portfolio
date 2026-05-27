"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
};

export default function TopNav() {
  const items: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "#home" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" },
      { label: "Admin", href: "/admin" },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = items.map((i) =>
        i.href.startsWith("#")
          ? (document.querySelector(i.href) as HTMLElement | null)
          : null
      );

      let current = "#home";
      sections.forEach((section, idx) => {
        if (!section) return;
        if (section.offsetTop <= scrollPos) current = items[idx]?.href ?? current;
      });

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-[150]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-4">
        <nav
          className="relative rounded-2xl border border-white/10 bg-black/35 backdrop-blur overflow-hidden"
          aria-label="Primary"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <a
              href="#home"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
              aria-label="Go to top"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                ◈
              </span>
              <span className="text-sm font-semibold tracking-wide">SAHIL</span>
            </a>

            {/* Desktop links */}
            <div className="hidden items-center gap-6 md:flex">
              {items.map((it) => {
                const isActive = active === it.href;
                return (
                  <a
                    key={it.href}
                    href={it.href}
                    className="relative text-sm font-medium text-white/70 transition hover:text-white/95"
                    onClick={() => setOpen(false)}
                  >
                    {it.label}
                    <motion.span
                      className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-white"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0.2 }}
                      transition={{ type: "spring", stiffness: 260, damping: 25 }}
                      style={{ transformOrigin: "center" }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 ring-0 hover:bg-white/10 md:hidden"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <motion.span
                className="block h-5 w-5"
                initial={false}
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                ≡
              </motion.span>
            </button>
          </div>

          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col gap-2 px-4 pb-4">
                  {items.map((it) => (
                    <a
                      key={it.href}
                      href={it.href}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      {it.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}

