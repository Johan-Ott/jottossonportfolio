import { z } from "zod/v4";

export const siteSchema = z.object({
  meta: z.object({
    title: z.string(),
    description: z.string(),
    url: z.url(),
  }),
  hero: z.object({
    headline: z.string(),
    subline: z.string(),
  }),
  about: z.object({
    paragraphs: z.array(z.string()),
    personal: z.string(),
    interests: z.array(z.string()),
  }),
});

export const projectSchema = z.object({
  title: z.string(),
  role: z.string(),
  description: z.string(),
  year: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  details: z.string().optional(),
});

export const experienceSchema = z.object({
  period: z.string(),
  company: z.string(),
  location: z.string(),
  role: z.string(),
  description: z.string(),
  tools: z.array(z.string()),
  details: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const skillCategorySchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
});

export const contactSchema = z.object({
  headline: z.string(),
  links: z.array(
    z.object({
      icon: z.string(),
      label: z.string(),
      value: z.string(),
      href: z.string(),
    })
  ),
  footer: z.string(),
});

export type Site = z.infer<typeof siteSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export const cvSchema = z.object({
  name: z.string(),
  title: z.string(),
  additional: z.array(
    z.object({
      heading: z.string(),
      description: z.string(),
    })
  ),
});

export const caseStudySectionSchema = z.object({
  heading: z.string(),
  body: z.string().optional(),
  items: z.array(z.string()).optional(),
});

export const caseStudySchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  sections: z.array(caseStudySectionSchema),
  stack: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export type Contact = z.infer<typeof contactSchema>;
export type CV = z.infer<typeof cvSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
