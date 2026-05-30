"use client";

import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "word" | "char";
  once?: boolean;
  delay?: number;
}

export const AnimatedText = ({ 
  text, 
  className = "", 
  type = "word",
  once = true,
  delay = 0 
}: AnimatedTextProps) => {
  // Split text based on type
  const items = type === "word" ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: type === "word" ? 0.1 : 0.02, 
        delayChildren: delay + (0.05 * i) 
      },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        ease: [0.22, 1, 0.36, 1], // Smooth Jitter-style cubic bezier
        duration: 0.9,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: 45,
      filter: "blur(12px)",
    },
  };

  return (
    <motion.div
      style={{ perspective: "1000px" }}
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {items.map((item, index) => (
        <span 
          key={index} 
          className={`inline-block overflow-hidden ${type === "word" ? "mr-[0.25em]" : ""} py-1`}
        >
          <motion.span variants={child} className="inline-block origin-bottom">
            {item === " " ? "\u00A0" : item}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};
