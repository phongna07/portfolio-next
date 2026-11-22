"use client";

import { useEffect, useState } from "react";

import HanoiClock from "./HanoiClock";

const sections = [
  { id: "about", label: "Overview" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Pinout" },
  { id: "contact", label: "Contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header
        className={`site-header${scrolled ? " site-header--scrolled" : ""}${
          menuOpen ? " site-header--open" : ""
        }`}
      >
        <div className="site-header__inner">
          <a className="brand" href="#top" aria-label="Nguyen Anh Phong, back to top">
            <span className="brand__chip" aria-hidden="true">
              <span>NAP</span>
            </span>
            <span className="brand__name">Phong Nguyen</span>
          </a>

          <nav className="site-nav" aria-label="Primary navigation">
            {sections.map(({ id, label }, index) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "is-active" : undefined}
                aria-current={active === id ? "true" : undefined}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {label}
              </a>
            ))}
          </nav>

          <div className="site-header__meta">
            <span className="site-header__clock" aria-label="Local time in Hanoi">
              <span className="led" aria-hidden="true" />
              HAN <HanoiClock />
            </span>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="menu-toggle__bars" />
            </button>
          </div>
        </div>

        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {sections.map(({ id, label }, index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              <span aria-hidden="true">0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
