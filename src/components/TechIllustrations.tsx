import type { ReactNode } from "react";

import type { ProjectIllustration, SkillIllustration } from "../data/portfolio";

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

function FpgaSchematic() {
  return (
    <>
      <g className="schematic-blocks">
        <rect x="46" y="45" width="54" height="38" rx="2" />
        <rect x="133" y="45" width="54" height="38" rx="2" />
        <rect x="220" y="45" width="54" height="38" rx="2" />
        <path d="M57 56h11v16h21V56M144 72h12V56h20v16M231 56h11v16h21V56" />
      </g>
      <Trace d="M18 64h28M100 64h33M187 64h33M274 64h28" className="tech-trace--active" />
      <path className="schematic-wave" d="M28 122h35V99h26v23h38V99h26v23h38V99h26v23h70" pathLength="1" />
      <g className="schematic-pin-row">
        <path d="M55 34v11M69 34v11M83 34v11M142 34v11M156 34v11M170 34v11M229 34v11M243 34v11M257 34v11" />
      </g>
      <Node cx={18} cy={64} className="tech-node--signal" />
      <Node cx={302} cy={64} />
      <text x="18" y="149">CLK 100M</text>
      <text x="240" y="149">ROUTE_OK</text>
    </>
  );
}

function LinuxSchematic() {
  return (
    <>
      <g className="schematic-blocks schematic-blocks--system">
        <rect x="116" y="38" width="88" height="54" rx="2" />
        <rect x="22" y="46" width="57" height="38" rx="2" />
        <rect x="241" y="46" width="57" height="38" rx="2" />
        <rect x="36" y="115" width="64" height="28" rx="2" />
        <rect x="128" y="115" width="64" height="28" rx="2" />
        <rect x="220" y="115" width="64" height="28" rx="2" />
        <text x="143" y="61">KERNEL</text>
        <text x="144" y="78">CPU 0</text>
        <text x="38" y="69">MEM</text>
        <text x="254" y="69">I/O</text>
        <text x="54" y="133">SPI</text>
        <text x="146" y="133">UART</text>
        <text x="238" y="133">NET</text>
      </g>
      <Trace d="M79 65h37M204 65h37M160 92v23M68 115V99h184v16" className="tech-trace--active" />
      <path className="schematic-bus" d="M18 99h284" pathLength="1" />
      <Node cx={18} cy={99} className="tech-node--signal" />
      <Node cx={302} cy={99} />
      <text x="18" y="158">SYSTEM BUS</text>
      <text x="246" y="158">IRQ 07</text>
    </>
  );
}

function ChipSchematic() {
  return (
    <>
      <rect className="schematic-die" x="75" y="23" width="170" height="126" rx="3" />
      <g className="schematic-blocks schematic-blocks--die">
        <rect x="91" y="39" width="59" height="42" rx="2" />
        <rect x="170" y="39" width="59" height="42" rx="2" />
        <rect x="91" y="101" width="138" height="31" rx="2" />
        <text x="107" y="63">CORE 0</text>
        <text x="186" y="63">CORE 1</text>
        <text x="142" y="121">L2 CACHE</text>
      </g>
      <Trace d="M18 60h57M150 60h20M245 60h57M120 81v20M200 81v20" className="tech-trace--active" />
      <Trace d="M18 118h57M245 118h57" className="tech-trace--copper" />
      <g className="schematic-chip-pins">
        <path d="M95 14v9M115 14v9M135 14v9M185 14v9M205 14v9M225 14v9M95 149v9M115 149v9M135 149v9M185 149v9M205 149v9M225 149v9" />
      </g>
      <Node cx={18} cy={60} className="tech-node--signal" />
      <Node cx={302} cy={60} />
      <text x="18" y="158">DIE 7NM</text>
      <text x="251" y="158">2-CORE</text>
    </>
  );
}

function GenericSchematic() {
  return (
    <>
      <rect className="schematic-die" x="122" y="48" width="76" height="64" rx="2" />
      <Trace d="M18 80h104M198 80h104" className="tech-trace--active" />
      <Node cx={18} cy={80} className="tech-node--signal" />
      <Node cx={302} cy={80} />
      <text x="18" y="149">AWAITING BUILD</text>
    </>
  );
}

export function ProjectSchematic({ variant }: { variant?: ProjectIllustration }) {
  return (
    <svg
      aria-hidden="true"
      className={`project-schematic project-schematic--${variant ?? "generic"}`}
      focusable="false"
      viewBox="0 0 320 172"
    >
      <path className="schematic-grid" d="M0 24h320M0 160h320M12 0v172M308 0v172" />
      {variant === "fpga-logic" && <FpgaSchematic />}
      {variant === "embedded-linux" && <LinuxSchematic />}
      {variant === "chip-architecture" && <ChipSchematic />}
      {!variant && <GenericSchematic />}
      <path className="schematic-scan" d="M12 20h296" />
    </svg>
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
