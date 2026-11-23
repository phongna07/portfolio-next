"use client";

import { useState } from "react";

import { technicalSkillGroups, type SkillIllustration } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Pin = { number: number; skill: string; group: SkillIllustration; groupTitle: string };

const pins: Pin[] = technicalSkillGroups.flatMap((group) =>
  group.skills.map((skill) => ({ skill, group: group.id, groupTitle: group.title })),
).map((pin, index) => ({ ...pin, number: index + 1 }));

const half = Math.ceil(pins.length / 2);
const leftPins = pins.slice(0, half);
// DIP numbering runs counter-clockwise: the right side counts upward from the bottom.
const rightPins = pins.slice(half).reverse();

const channel: Record<SkillIllustration, string> = {
  "embedded-hardware": "ch1",
  languages: "ch2",
  "software-tooling": "ch3",
};

export default function TechnicalSkills() {
  const [active, setActive] = useState<SkillIllustration | null>(null);

  const renderPin = (pin: Pin, side: "left" | "right") => (
    <li
      key={pin.number}
      className={`pin pin--${channel[pin.group]}${active && active !== pin.group ? " is-dim" : ""}${
        active === pin.group ? " is-on" : ""
      }`}
      onPointerEnter={() => setActive(pin.group)}
      onPointerLeave={() => setActive(null)}
    >
      {side === "left" && <span className="pin__label">{pin.skill}</span>}
      {side === "left" && <span className="pin__trace" aria-hidden="true" />}
      <span className="pin__leg" aria-hidden="true">
        {pin.number}
      </span>
      {side === "right" && <span className="pin__trace" aria-hidden="true" />}
      {side === "right" && <span className="pin__label">{pin.skill}</span>}
      <span className="sr-only">, {pin.groupTitle}</span>
    </li>
  );

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="section-shell">
        <SectionHeading
          index="03"
          kicker="Pin configuration"
          id="skills-title"
          title={
            <>
              My technical <em>skills.</em>
            </>
          }
          aside="A balanced toolkit spanning embedded hardware and PCB design, programming, robotics simulation, and the software that turns system data into useful interfaces."
        />

        <div className="skills__grid">
          <Reveal className="pinout-wrap">
            <div className="pinout" data-active={active ?? undefined}>
              <ul className="pinout__side pinout__side--left" aria-label={`Pins 1 to ${half}`}>
                {leftPins.map((pin) => renderPin(pin, "left"))}
              </ul>

              <div className="pinout__body" aria-hidden="true">
                <span className="pinout__notch" />
                <span className="pinout__dot" />
                <span className="pinout__part">NAP-07</span>
                <span className="pinout__desc">HW/SW Interface</span>
                <span className="pinout__pkg">DIP-{pins.length} · Hanoi VN</span>
              </div>

              <ul className="pinout__side pinout__side--right" aria-label={`Pins ${half + 1} to ${pins.length}`}>
                {rightPins.map((pin) => renderPin(pin, "right"))}
              </ul>
            </div>
            <p className="pinout__caption">Figure 3-1. NAP-07 pin configuration (top view)</p>
          </Reveal>

          <Reveal className="pin-groups" delay={80}>
            <h3 className="eyebrow">3.1 Pin functions</h3>
            <ul>
              {technicalSkillGroups.map((group) => {
                const groupPins = pins.filter((pin) => pin.group === group.id);
                const first = groupPins[0].number;
                const last = groupPins[groupPins.length - 1].number;
                return (
                  <li key={group.id}>
                    <button
                      type="button"
                      className={`pin-group pin-group--${channel[group.id]}${
                        active === group.id ? " is-on" : ""
                      }`}
                      aria-pressed={active === group.id}
                      onPointerEnter={() => setActive(group.id)}
                      onPointerLeave={() => setActive(null)}
                      onFocus={() => setActive(group.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(active === group.id ? null : group.id)}
                    >
                      <span className="pin-group__swatch" aria-hidden="true" />
                      <span className="pin-group__title">{group.title}</span>
                      <span className="pin-group__range">
                        Pins {first}–{last}
                      </span>
                      <span className="pin-group__skills">{group.skills.join(" · ")}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
