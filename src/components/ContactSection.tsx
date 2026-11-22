"use client";

import { useState } from "react";

import { contact } from "../data/portfolio";
import Reveal from "./Reveal";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="section-shell">
        <Reveal className="contact__head">
          <p className="section-heading__kicker">
            <span>§ 04</span>
            Open channel
          </p>
          <h2 id="contact-title" className="contact__title">
            Contact <em>me.</em>
          </h2>
          <p className="contact__copy">
            I&apos;m open to discussing new opportunities, collaborations, or
            conversations about technology, embedded systems, and electrical
            engineering.
          </p>
        </Reveal>

        <Reveal className="contact__panel" delay={100}>
          <div className="contact__email">
            <span className="eyebrow">TX · Email</span>
            <a href={`mailto:${contact.email}`} className="contact__address">
              {contact.email}
              <span aria-hidden="true">↗</span>
            </a>
            <button type="button" className="button button--ghost button--small" onClick={copyEmail}>
              {copied ? "Copied to clipboard ✓" : "Copy address"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </span>
          </div>

          <div className="contact__links">
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              <span className="eyebrow">Source</span>
              <strong>GitHub</strong>
              <span className="contact__handle">@phongna07</span>
              <span className="contact__arrow" aria-hidden="true">↗</span>
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="eyebrow">Network</span>
              <strong>LinkedIn</strong>
              <span className="contact__handle">in/phongna07</span>
              <span className="contact__arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
