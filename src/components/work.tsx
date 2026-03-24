"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ease, duration, stagger } from "@/lib/motion";
import { ExpandableCard } from "./expandable-card";
import type { Project } from "@/lib/schemas";

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="text-left">
      <div className="flex items-baseline gap-4 mb-2">
        <h3 className="text-xl md:text-2xl">{project.title}</h3>
        <span className="text-sm text-muted-foreground hidden md:inline">
          {project.role}
        </span>
      </div>
      <p className="text-muted-foreground mb-3" style={{ lineHeight: 1.65 }}>
        {project.description}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
        <span className="text-sm text-muted-foreground ml-1">{project.year}</span>
      </div>
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      {project.image && (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-accent">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 672px) 100vw, 672px"
          />
        </div>
      )}
      <p className="text-sm text-muted-foreground md:hidden">{project.role}</p>
      {project.details && <p style={{ lineHeight: 1.75 }}>{project.details}</p>}
    </>
  );
}

export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-sm tracking-wider text-muted-foreground mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal, ease: ease.outSmooth }}
        >
          SELECTED WORK
        </motion.h2>

        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: duration.reveal,
                delay: i * stagger.normal,
                ease: ease.outSmooth,
              }}
            >
              <ExpandableCard
                preview={<ProjectPreview project={project} />}
                details={
                  (project.details || project.image)
                    ? <ProjectDetails project={project} />
                    : undefined
                }
                ghostImage={project.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
