"use client";

import { ArrowUp } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.15);
  });

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 border border-border hover:bg-accent backdrop-blur-sm transition-colors duration-150"
      aria-label="Back to top"
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 10,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.2 }}
    >
      <ArrowUp className="w-4 h-4 text-muted-foreground" />
    </motion.button>
  );
}
