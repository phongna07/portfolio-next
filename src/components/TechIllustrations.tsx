import type { ReactNode } from "react";

import type { SkillIllustration } from "../data/portfolio";

type TraceProps = {
  d: string;
  className?: string;
};

function Trace({ d, className = "" }: TraceProps) {
  return <path className={`tech-trace ${className}`.trim()} d={d} pathLength="1" />;
}

function Node({ cx, cy, className = "" }: { cx: number; cy: number; className?: string }) {
  return <circle className={`tech-node ${className}`.trim()} cx={cx} cy={cy} r="3" />;
}

export function HeroCircuitVisual({ children }: { children: ReactNode }) {
  return (
    <div className="hero-circuit">
      <svg
        aria-hidden="true"
        className="hero-circuit__map"
        focusable="false"
        viewBox="0 0 420 420"
      >
        <Trace d="M17 109h54l24 24h36" />
        <Trace d="M8 282h66l22-22h35" />
        <Trace d="M289 76h45l23 23h47" />
        <Trace d="M290 337h51l20-20h50" />
        <Trace d="M47 56v31l20 20" className="tech-trace--copper" />
        <Trace d="M370 142v38l22 22v47" className="tech-trace--copper" />
        <Node cx={17} cy={109} className="tech-node--signal" />
        <Node cx={8} cy={282} />
        <Node cx={404} cy={99} className="tech-node--signal" />
        <Node cx={411} cy={317} />
        <Node cx={47} cy={56} className="tech-node--copper" />
        <Node cx={392} cy={249} className="tech-node--copper" />
      </svg>

      <svg
        aria-hidden="true"
        className="hero-circuit__rings"
        focusable="false"
        viewBox="0 0 420 420"
      >
        <g className="hero-circuit__rotor">
          <circle className="tech-ring" cx="210" cy="210" r="188" />
          <path className="tech-ring tech-ring--signal" d="M210 22a188 188 0 0 1 132 54" />
          <path className="tech-ring tech-ring--cyan" d="M78 344a188 188 0 0 1-46-73" />
          <path className="tech-tick" d="M210 13v18M407 210h-18M210 407v-18M13 210h18" />
        </g>
        <circle className="tech-ring tech-ring--inner" cx="210" cy="210" r="167" />
        <g className="hero-circuit__pins">
          <path d="M210 31v24M210 365v24M31 210h24M365 210h24" />
          <path d="M83 83l17 17M320 320l17 17M337 83l-17 17M100 320l-17 17" />
        </g>
        <g className="hero-circuit__current">
          <circle cx="210" cy="43" r="4" />
          <circle cx="377" cy="210" r="3" />
          <circle cx="92" cy="328" r="3" />
        </g>
      </svg>

      <div className="hero-circuit__portrait-slot">{children}</div>

      <span aria-hidden="true" className="hero-circuit__readout hero-circuit__readout--top">
        VCC 3.3V
      </span>
      <span
        aria-hidden="true"
        className="hero-circuit__readout hero-circuit__readout--bottom"
      >
        SYNC 0110
      </span>
    </div>
  );
}

export function SkillSchematic({ variant }: { variant: SkillIllustration }) {
  return (
    <svg
      aria-hidden="true"
      className={`skill-schematic skill-schematic--${variant}`}
      focusable="false"
      viewBox="0 0 128 56"
    >
      {variant === "embedded-hardware" && (
        <>
          <rect className="skill-schematic__block" x="42" y="10" width="44" height="36" rx="2" />
          <path className="skill-schematic__pins" d="M30 16h12M30 25h12M30 34h12M30 43h12M86 16h12M86 25h12M86 34h12M86 43h12" />
          <Trace d="M2 16h28M98 43h28" className="tech-trace--active" />
          <Node cx={2} cy={16} className="tech-node--signal" />
          <Node cx={126} cy={43} />
        </>
      )}

      {variant === "languages" && (
        <>
          <path className="skill-schematic__terminal" d="M20 9h88v38H20zM20 19h88" />
          <path className="skill-schematic__code" d="M36 29l-8 6 8 6M55 27l-6 16M68 29l8 6-8 6" />
          <Trace d="M82 35h18" className="tech-trace--active" />
          <Node cx={100} cy={35} className="tech-node--signal" />
        </>
      )}

      {variant === "web-tooling" && (
        <>
          <path className="skill-schematic__network" d="M19 28h28M81 28h28M64 12v9M64 35v9M47 28l17-16 17 16-17 16z" />
          <Node cx={19} cy={28} className="tech-node--signal" />
          <Node cx={109} cy={28} />
          <Node cx={64} cy={12} className="tech-node--copper" />
          <Node cx={64} cy={44} />
          <Trace d="M19 28h28l17-16 17 16h28" className="tech-trace--active" />
        </>
      )}
    </svg>
  );
}
