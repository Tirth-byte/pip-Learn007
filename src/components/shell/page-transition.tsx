"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_ORDER = ["home", "learn", "manual", "projects", "journal", "mentors"];

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [direction, setDirection] = useState(1); 
  
  const currentSection = pathname.startsWith("/manual") || pathname.startsWith("/learn") 
    ? "learn"
    : pathname.startsWith("/projects")
    ? "projects"
    : pathname.startsWith("/journal")
    ? "journal"
    : pathname.startsWith("/mentors")
    ? "mentors"
    : "home";
    
  useEffect(() => {
    const currentIndex = NAV_ORDER.indexOf(currentSection);
    const prevIndexStr = sessionStorage.getItem("piplearn_nav_idx_fast");
    
    if (currentIndex !== -1) {
      if (prevIndexStr !== null) {
        const prevIndex = parseInt(prevIndexStr, 10);
        requestAnimationFrame(() => {
          if (currentIndex > prevIndex) {
            setDirection(1);
          } else if (currentIndex < prevIndex) {
            setDirection(-1);
          } else {
            setDirection(0);
          }
        });
      }
      sessionStorage.setItem("piplearn_nav_idx_fast", currentIndex.toString());
    }
  }, [currentSection]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : direction < 0 ? -20 : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: { duration: 0 }
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className="w-full flex-1 flex flex-col min-h-0"
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
