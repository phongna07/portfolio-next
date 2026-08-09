import Image from "next/image";

import Reveal from "./Reveal";
import { HeroCircuitVisual } from "./TechIllustrations";

export default function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="section-shell">
        <Reveal className="about-layout">
          <div className="about-section__copy">
            <p className="section-label">About me / Hanoi, VN</p>
            <h1 id="about-title">Nguyen Anh Phong</h1>
            <div className="about-section__body">
              <p>
                My name is Nguyen Anh Phong, an Electrical Engineering student
                based in Hanoi, Vietnam. I began exploring programming in high
                school through web development and have since built projects
                ranging from websites and reusable React tooling to embedded
                systems.
              </p>
              <p>
                I&apos;m currently focused on the boundary between hardware and
                software, including embedded systems, FPGA, digital hardware,
                low-level systems, and practical system integration.
              </p>
            </div>
          </div>

          <HeroCircuitVisual>
            <figure className="about-section__portrait">
              <Image
                src="/avatar.jpg"
                alt="Portrait of Nguyen Anh Phong"
                width={1370}
                height={1370}
                priority
                sizes="(max-width: 900px) 79vw, 310px"
              />
            </figure>
          </HeroCircuitVisual>
        </Reveal>
      </div>
    </section>
  );
}
