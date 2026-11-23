# Nguyen Anh Phong — Electrical Engineering Portfolio

A compact, about-first portfolio centered on embedded systems, digital hardware,
FPGA, chips, and Linux systems. The homepage moves from Phong's background into
selected projects, grouped technical skills, and direct contact channels.

## Design direction

The site reads like an engineer's component datasheet. It uses warm instrument
black, paper-white type (Inter Tight, Instrument Serif italics, and JetBrains
Mono labels), and oscilloscope channel colours: CH1 yellow, CH2 cyan, and CH3
magenta, with a copper accent.

- **Hero:** a live canvas oscilloscope. CH1 is an analog waveform that follows
  the cursor (hardware), and CH2 is a UART signal with protocol-decode bubbles
  that spells out the owner's name (software).
- **Overview:** laid out as datasheet sections: general description, features,
  specifications, and signal path.
- **Projects:** shown as "Figures" in large cards with a cursor spotlight; a
  preview can be a muted looping clip that plays only on screen.
- **Additional projects:** an "Appendix" of compact cards, each with its own
  channel-coloured trace on hover.
- **Skills:** drawn as the pin configuration of a DIP-20 "NAP-07" chip, with
  pin groups that highlight together.
- **Contact:** a large display heading, an email address you can copy, and live
  Hanoi time.

Motion pauses when it is off-screen. With reduced-motion preferences, every
animation stops and the scope renders a static frame.

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
