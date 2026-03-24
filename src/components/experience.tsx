"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ease, duration, stagger } from "@/lib/motion";
import { ExpandableCard } from "./expandable-card";
import type { Experience } from "@/lib/schemas";

function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-accent">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`${alt} — screenshot ${current + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((c) => (c - 1 + images.length) % images.length);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-foreground" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((c) => (c + 1) % images.length);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function ExperiencePreview({ exp }: { exp: Experience }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
        <h3 className="text-xl md:text-2xl">{exp.company}</h3>
        <span className="text-sm text-muted-foreground shrink-0">{exp.period}</span>
      </div>

      <p className="text-muted-foreground mb-1">{exp.role}</p>
      <p className="text-sm text-muted-foreground mb-3">{exp.location}</p>

      <p className="text-muted-foreground mb-4" style={{ lineHeight: 1.65 }}>
        {exp.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {exp.tools.map((tool) => (
          <span
            key={tool}
            className="text-xs px-2.5 py-1 rounded bg-secondary/50 text-muted-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
    </>
  );
}

function ExperienceDetails({ exp }: { exp: Experience }) {
  return (
    <>
      {exp.images && exp.images.length > 0 && (
        <ImageGallery images={exp.images} alt={exp.company} />
      )}
      {exp.details && <p style={{ lineHeight: 1.75 }}>{exp.details}</p>}
    </>
  );
}

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-24 px-6 lg:px-8 bg-accent/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-sm tracking-wider text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal }}
        >
          EXPERIENCE
        </motion.h2>

        <div>
          {experiences.map((exp, i) => {
            const hasDetail = !!(exp.details || (exp.images && exp.images.length > 0));
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: duration.reveal,
                  delay: i * stagger.tight,
                  ease: ease.out,
                }}
              >
                <ExpandableCard
                  preview={<ExperiencePreview exp={exp} />}
                  details={hasDetail ? <ExperienceDetails exp={exp} /> : undefined}
                  ghostImage={exp.images?.[0]}
                  accentBg
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
