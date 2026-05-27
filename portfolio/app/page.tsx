"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Hero from "./components/Hero";
import TopNav from "./components/TopNav";
import DepthBlurSection from "./components/DepthBlurSection";
import ProjectsGrid from "./components/ProjectsGrid";
import ProjectModal, { type Project } from "./components/ProjectModal";


export default function Home() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const projects = useMemo<Project[]>(
    () => [
      {
        id: "face-recognition-attendance",
        name: "Face Recognition Attendance",
        category: "Python",
        year: "2024",
        description:
          "Automated attendance using real-time face detection with a Tkinter GUI, session logging, and exportable reports (~90% less manual effort).",
        tags: ["Tkinter", "SQLite", "Face Detection"],
        images: {
          thumb: "/hero/v1.mp4",
          hero: "/hero/v1.mp4",
        },
      },
      {
        id: "studyshare-collaborative",
        name: "StudyShare — Collaborative Platform",
        category: "Web App",
        year: "2024",
        description:
          "Collaborative platform to upload and filter study materials. Built with AngularJS MVC across 4 modules + REST API (~40% faster integration).",
        tags: ["AngularJS", "REST API", "AJAX"],
        images: {
          thumb: "/hero/v2.mp4",
          hero: "/hero/v2.mp4",
        },
      },
      {
        id: "automation-systems",
        name: "Automation Systems & Tools",
        category: "Automation",
        year: "2025",
        description:
          "Data-driven utilities and automation scripts to reduce manual effort and improve workflows.",
        tags: ["Python", "Automation", "Data"],
        images: {
          thumb: "/hero/v1.mp4",
          hero: "/hero/v1.mp4",
        },
      },
      {
        id: "frontend-design",
        name: "Frontend UI Work",
        category: "Frontend",
        year: "2025",
        description:
          "Responsive UI implementations using React/AngularJS, clean layouts, and motion-enhanced interactions.",
        tags: ["React", "UI", "CSS"],
        images: {
          thumb: "/hero/v2.mp4",
          hero: "/hero/v2.mp4",
        },
      },
    ],
    []
  );

  const skills = useMemo(
    () => [
      "Languages: Python, C++, JavaScript, C",
      "Frontend: React, AngularJS, HTML5, CSS3",
      "Automation: GSAP",
      "Databases: SQLite, MySQL",
      "Tools: Git, Figma, VS Code",
      "Core: DSA, OOP, DBMS, OS, Networks",
    ],
    []
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <TopNav />
      <div id="home">
        <Hero />
      </div>

      <main className="mx-auto w-full max-w-6xl px-6 pb-28 pt-2">
        <ProjectsGrid
          projects={projects}
          onSelect={(p) => {
            setSelected(p);
            setOpen(true);
          }}
        />

        <section id="skills" className="mt-10" aria-labelledby="skills-heading">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
          >
            <DepthBlurSection title="Skills">
              <div className="grid gap-3 sm:grid-cols-2">
                {skills.map((s) => (
                  <div key={s} className="text-sm text-white/70">
                    {s}
                  </div>
                ))}
              </div>
            </DepthBlurSection>
          </motion.div>
        </section>

        <section id="contact" className="mt-10" aria-labelledby="contact-heading">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
          >
            <DepthBlurSection title="Contact">
              <div className="space-y-3 text-sm text-white/70">
                <div>
                  <span className="text-white/90 font-semibold">Email:</span>{" "}
                  <a
                    className="underline underline-offset-4"
                    href="mailto:sahilsharma092006@gmail.com"
                  >
                    sahilsharma092006@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-white/90 font-semibold">Phone:</span>{" "}
                  <a
                    className="underline underline-offset-4"
                    href="tel:+917741089635"
                  >
                    +91 7741089635
                  </a>
                </div>
                <div>
                  <span className="text-white/90 font-semibold">Location:</span> Pune, India
                </div>

                <div className="pt-2">
                  <div className="text-white/90 font-semibold">Social:</div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <a
                      className="text-white/70 hover:text-white/90 underline underline-offset-4"
                      href="https://www.linkedin.com/in/sahilsharma-1419773a9/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                    <a
                      className="text-white/70 hover:text-white/90 underline underline-offset-4"
                      href="https://github.com/sahilsharma"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                    <a
                      className="text-white/70 hover:text-white/90 underline underline-offset-4"
                      href="#"
                    >
                      Behance
                    </a>
                  </div>
                </div>
              </div>
            </DepthBlurSection>
          </motion.div>
        </section>
      </main>

      <ProjectModal
        open={open}
        project={selected}
        onClose={() => {
          setOpen(false);
          // keep selected until exit finishes
          setTimeout(() => setSelected(null), 150);
        }}
      />
    </div>
  );
}



