"use client";

import { motion } from "motion/react";
import { ease, duration, stagger } from "@/lib/motion";
import type { SkillCategory } from "@/lib/schemas";

export function Skills({ categories }: { categories: SkillCategory[] }) {
  return (
    <section className="py-24 px-6 lg:px-8 bg-accent/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-sm tracking-wider text-muted-foreground mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal, ease: ease.out }}
        >
          SKILLS & TOOLS
        </motion.h2>

        <div className="space-y-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: duration.normal,
                delay: i * stagger.normal,
                ease: ease.outSmooth,
              }}
            >
              <h3 className="text-sm text-muted-foreground mb-3">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg bg-background border border-border text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
