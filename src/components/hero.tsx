"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ease, duration, stagger } from "@/lib/motion";
import type { Site } from "@/lib/schemas";

function Typewriter({ text, delay }: { text: string; delay: number }) {
  const [visible, setVisible] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started || visible >= text.length) return;
    const id = setTimeout(() => setVisible((v) => v + 1), 45);
    return () => clearTimeout(id);
  }, [started, visible, text.length]);

  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="transition-opacity duration-150"
          style={{ opacity: i < visible ? 1 : 0 }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero({ hero }: { hero: Site["hero"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -60]);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    const section = sectionRef.current;
    if (!glow || !section) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
        glow.style.opacity = inside ? "1" : "0";
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const words = hero.headline.replace(/\.$/, "").split(" ");
  const headlineEnd = 0.3 + words.length * stagger.normal + 0.2;

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden"
    >
      <div ref={glowRef} className="hero-glow opacity-0" />

      <motion.div className="max-w-4xl w-full relative z-10" style={{ opacity, y }}>
        <div className="space-y-6">
          <h1
            className="text-5xl md:text-7xl tracking-tight leading-[1.1]"
            aria-label={hero.headline}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: duration.reveal,
                  delay: 0.3 + i * stagger.normal,
                  ease: ease.out,
                }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{
                duration: duration.fast,
                delay: 0.3 + words.length * stagger.normal,
              }}
            >
              .
            </motion.span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            style={{ lineHeight: 1.65 }}
          >
            {ready && <Typewriter text={hero.subline} delay={headlineEnd} />}
          </p>
        </div>

        <motion.div
          className="absolute bottom-[-140px] left-0 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: headlineEnd + 1.5, duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase">
            scroll
          </span>
          <motion.div
            className="w-px h-16 bg-muted-foreground/40 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
