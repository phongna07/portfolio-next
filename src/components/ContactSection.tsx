import { contact } from "../data/portfolio";
import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-shell">
        <Reveal className="contact-layout">
          <div className="contact-section__copy">
            <p className="section-label">Contact me / Open channel</p>
            <h2 id="contact-title">Contact me.</h2>
            <p>
              I&apos;m open to discussing new opportunities, collaborations, or
              conversations about technology, embedded systems, and electrical
              engineering.
            </p>
          </div>

          <div className="contact-section__links" aria-label="Contact links">
            <a className="button button--signal" href={`mailto:${contact.email}`}>
              Email me
              <span aria-hidden="true">↗</span>
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
