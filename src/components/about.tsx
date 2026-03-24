"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ease, duration } from "@/lib/motion";
import type { Site } from "@/lib/schemas";

export function About({ about }: { about: Site["about"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-sm tracking-wider text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow }}
        >
          ABOUT
        </motion.h2>

        <motion.div style={{ opacity: contentOpacity }}>
          <div className="space-y-8">
            <div
              className="text-xl md:text-2xl leading-relaxed space-y-6"
              style={{ lineHeight: 1.65 }}
            >
              {about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: duration.slow,
                    delay: i * 0.15,
                    ease: ease.out,
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              className="pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: duration.slow, delay: 0.3 }}
            >
              <motion.p
                className="text-base md:text-lg text-muted-foreground mb-6"
                style={{ lineHeight: 1.65 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: duration.reveal, delay: 0.4 }}
              >
                {about.personal}
              </motion.p>
              <div className="flex flex-wrap gap-3">
                {about.interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: duration.fast,
                      delay: 0.5 + i * 0.06,
                      ease: ease.outSmooth,
                    }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
