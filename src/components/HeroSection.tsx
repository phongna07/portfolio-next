import Image from "next/image";

import Oscilloscope from "./Oscilloscope";
import Reveal from "./Reveal";

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <div className="section-shell">
        <Reveal className="hero__meta">
          <span>
            <span className="led led--live" aria-hidden="true" /> Electrical Engineering student
          </span>
          <span className="hero__meta-mid">Hardware ↔ Software</span>
          <span>Hanoi, VN · 21.03°N 105.85°E</span>
        </Reveal>

        <div className="hero__grid">
          <div className="hero__copy">
            <h1 id="hero-title" className="hero__title">
              <span className="hero__line">
                <span className="hero__word" style={{ animationDelay: "60ms" }}>
                  Phong
                </span>
              </span>
              <span className="hero__line">
                <span className="hero__word" style={{ animationDelay: "160ms" }}>
                  Nguyen<span className="hero__dot">.</span>
                </span>
              </span>
            </h1>

            <Reveal className="hero__intro" delay={160}>
              <p>
                Electrical Engineering student building at the{" "}
                <em>boundary between hardware and software</em>: embedded
                systems, FPGA, digital hardware, and the interfaces that make
                them useful.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#projects">
                  View selected work
                  <span aria-hidden="true">↓</span>
                </a>
                <a className="button button--ghost" href="#contact">
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero__portrait" delay={120}>
            <figure className="portrait-card">
              <div className="portrait-card__frame">
                <Image
                  src="/avatar.jpg"
                  alt="Portrait of Nguyen Anh Phong"
                  width={1530}
                  height={2049}
                  priority
                  sizes="(max-width: 900px) 60vw, 320px"
                />
                <span className="portrait-card__crop portrait-card__crop--tl" aria-hidden="true" />
                <span className="portrait-card__crop portrait-card__crop--br" aria-hidden="true" />
              </div>
              <figcaption>
                <span>Fig. 00</span>
                <span>Nguyen Anh Phong</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="hero__scope" delay={220}>
          <Oscilloscope />
        </Reveal>
      </div>
    </section>
  );
}
