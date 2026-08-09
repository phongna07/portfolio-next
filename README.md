# Nguyen Anh Phong — Electrical Engineering Portfolio

A compact, about-first portfolio centered on embedded systems, digital hardware,
FPGA, chips, and Linux systems. The homepage moves from Phong's background into
selected projects, grouped technical skills, and direct contact channels.

## Design direction

The interface uses a dark engineering-lab visual system with a subtle grid,
signal colors, technical labels, compact editorial project rows, and code-native
circuit illustrations. Bounded ambient motion carries current through selected
hero and project traces, while one-shot line drawing and restrained hover states
reinforce the signal-to-system theme. Reduced-motion preferences render the same
visual system as a fully static composition.

The site has no canvas effects, parallax, custom cursor, smooth-scroll library,
raster illustration dependency, or third-party animation runtime.

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
