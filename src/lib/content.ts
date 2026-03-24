import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";
import {
  siteSchema,
  projectSchema,
  experienceSchema,
  skillCategorySchema,
  contactSchema,
  cvSchema,
  caseStudySchema,
} from "./schemas";
import type {
  Site,
  Project,
  Experience,
  SkillCategory,
  Contact,
  CV,
  CaseStudy,
} from "./schemas";
import { z } from "zod/v4";

const contentDir = join(process.cwd(), "content");

function load<T>(file: string, schema: z.ZodType<T>): T {
  const raw = readFileSync(join(contentDir, file), "utf-8");
  const data = parse(raw);
  return schema.parse(data);
}

function loadArray<T>(file: string, schema: z.ZodType<T>): T[] {
  const raw = readFileSync(join(contentDir, file), "utf-8");
  const data = parse(raw);
  return z.array(schema).parse(data);
}

export function getSite(): Site {
  return load("site.yaml", siteSchema);
}

export function getProjects(): Project[] {
  return loadArray("projects.yaml", projectSchema);
}

export function getExperience(): Experience[] {
  return loadArray("experience.yaml", experienceSchema);
}

export function getSkills(): SkillCategory[] {
  return loadArray("skills.yaml", skillCategorySchema);
}

export function getContact(): Contact {
  return load("contact.yaml", contactSchema);
}

export function getCV(): CV {
  return load("cv.yaml", cvSchema);
}

export function getCaseStudy(): CaseStudy {
  return load("case-study.yaml", caseStudySchema);
}
