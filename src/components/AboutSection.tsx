import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const focusAreas = [
  "Embedded systems",
  "FPGA",
  "Digital hardware & PCB design",
  "Robotics & UAV simulation",
  "Low-level systems",
  "Practical system integration",
];

const signalPath = [
  { stage: "IN", label: "High school", detail: "Started exploring programming" },
  { stage: "01", label: "Web development", detail: "Websites and reusable React tooling" },
  { stage: "02", label: "Embedded & hardware", detail: "Firmware, microcontrollers, PCB design" },
  { stage: "OUT", label: "Hardware ↔ software", detail: "Where I'm focused now" },
];

const specs = [
  ["Discipline", "Electrical Engineering"],
  ["Location", "Hanoi, Vietnam · GMT+7"],
  ["Origin", "Web development, high school"],
  ["Focus", "The hardware / software boundary"],
];

export default function AboutSection() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="section-shell">
        <SectionHeading
          index="01"
          kicker="Overview"
          id="about-title"
          title={
            <>
              From web pages <em>to</em> silicon.
            </>
          }
        />

        <div className="about__grid">
          <Reveal className="about__description">
            <h3 className="eyebrow">1.1 General description</h3>
            <p className="about__lead">
              My name is Nguyen Anh Phong, an Electrical Engineering student
              based in Hanoi, Vietnam.
            </p>
            <p>
              I began exploring programming in high school through web
              development and have since built projects ranging from websites
              and reusable React tooling to embedded firmware, PCB design, and
              multi-UAV simulation.
            </p>
            <p>
              I&apos;m currently focused on the boundary between hardware and
              software, including embedded systems, FPGA, digital hardware,
              low-level systems, and practical system integration.
            </p>
          </Reveal>

          <Reveal className="about__side" delay={80}>
            <div className="spec-block">
              <h3 className="eyebrow">1.2 Features</h3>
              <ul className="feature-list">
                {focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            <div className="spec-block">
              <h3 className="eyebrow">1.3 Specifications</h3>
              <table className="spec-table">
                <tbody>
                  {specs.map(([key, value]) => (
                    <tr key={key}>
                      <th scope="row">{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <Reveal className="signal-path" delay={60}>
          <h3 className="eyebrow">1.4 Signal path</h3>
          <ol>
            {signalPath.map((step) => (
              <li key={step.label}>
                <span className="signal-path__node" aria-hidden="true">
                  {step.stage}
                </span>
                <strong>{step.label}</strong>
                <span>{step.detail}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
