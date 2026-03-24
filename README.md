# johanottosson.com

Personal portfolio. UI/UX designer and developer with 7+ years across AAA games, live service platforms, and interactive media.

## Stack

| | |
|---|---|
| **Framework** | Next.js 15, React 19, App Router |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Motion v12 |
| **Content** | YAML + Zod v4 validation |
| **Language** | TypeScript strict |
| **Package manager** | pnpm |

All pages are statically pre-rendered at build time. Zero client-side data fetching. Build fails if content doesn't pass schema validation.

## Project structure

```
content/            Editable YAML content
  site.yaml         Hero, about, metadata
  projects.yaml     Selected work
  experience.yaml   Career history + images
  skills.yaml       Skill categories
  contact.yaml      Links, footer
  cv.yaml           Resume metadata
  case-study.yaml   Design process writeup

src/
  app/              Routes (/, /cv, /case-study)
  components/       UI components
  lib/
    schemas.ts      Zod schemas
    content.ts      YAML loader
    motion.ts       Animation constants
```

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # Static production build
pnpm start        # Serve production build
```

## Design decisions

Content is separated from code. Edit any YAML file and the site rebuilds with validated data. No CMS, no database, no API calls at runtime.

Components share a single `ExpandableCard` base for both Work and Experience sections. Same interaction pattern, same animation behavior, minimal overrides.

Animation constants (`ease`, `duration`, `stagger`) are defined once in `src/lib/motion.ts` and referenced everywhere. No magic numbers in components.

Full case study at `/case-study`.

## Deploy

Static output. Drop on Vercel, Netlify, or any static host.

```bash
pnpm build
```

## License

All rights reserved.
