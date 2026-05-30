"use client";

import React, { useState, useEffect } from "react";

const ROLES = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Security Enthusiast",
  "Creative Coder",
];

export default function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = ROLES[roleIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? 40 : currentText === fullText ? 2000 : 80
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="ml-1 inline-block w-[2px] h-[1.2em] bg-blue-500 align-middle animate-blink" />
      <style jsx global>{`
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-blink {
            animation: none;
          }
        }
      `}</style>
    </span>
  );
}