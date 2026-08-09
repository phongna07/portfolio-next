# Nguyen Anh Phong — Electrical Engineering Portfolio

A compact, about-first portfolio centered on embedded systems, digital hardware,
FPGA, chips, and Linux systems. The homepage moves from Phong's background into
selected projects, grouped technical skills, and direct contact channels.

## Design direction

The interface uses a dark engineering-lab visual system with a subtle grid,
signal colors, technical labels, and compact editorial project rows. Motion is
limited to a small one-shot fade and slide when content enters the viewport.
Reduced-motion preferences are fully respected.

The site has no canvas effects, parallax, custom cursor, smooth-scroll library,
or continuous animation loops.

## Stack

- Next.js 14 App Router and TypeScript
- React 18
- Tailwind CSS and a custom global design system
- Static portfolio data and static generation
- Next.js image optimization

## Local development

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Validation

```bash
bun run lint
bun run build
```

## Content model

Project copy, statuses, links, grouped technical skills, and contact details live
in `src/data/portfolio.ts`. Completed projects and future project slots are
deliberately labeled separately. The page itself follows a fixed About, Projects,
Skills, and Contact sequence beneath the sticky navigation.
