"use client";

import { motion, Variants, useReducedMotion, UseInViewOptions } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "word" | "char";
  once?: boolean;
  delay?: number;
  viewport?: UseInViewOptions;
}

export const AnimatedText = ({ 
  text, 
  className = "", 
  type = "word",
  once = true,
  delay = 0,
  viewport
}: AnimatedTextProps) => {
  const shouldReduceMotion = useReducedMotion();

  // Split text based on type
  const items = type === "word" ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: type === "word" ? 0.12 : 0.025, 
        delayChildren: delay || (type === "char" ? 0.6 : 0),
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
        ease: [0.16, 1, 0.3, 1],
        duration: 0.9,
      },
    },
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : (type === "word" ? "100%" : 20),
      rotateX: shouldReduceMotion ? 0 : 45,
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
      viewport={viewport || { once }}
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
