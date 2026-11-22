import Image from "next/image";

import { projects } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Spotlight from "./Spotlight";

const imageSizes: Record<string, [number, number]> = {
  "forest-monitor": [2386, 1580],
  "snake-xenzia-stm32": [909, 682],
  vnmint: [1267, 798],
  "vinuni-course-planner": [2425, 1562],
};

export default function ProjectList() {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="section-shell">
        <SectionHeading
          index="02"
          kicker="Selected work"
          id="projects-title"
          title={
            <>
              Selected <em>projects.</em>
            </>
          }
          aside="A focused selection of completed work across embedded systems, software, and electrical engineering."
        />

        <div className="project-list">
          {projects.map((project, index) => {
            const [w, h] = imageSizes[project.id] ?? [1600, 1000];
            const number = String(index + 1).padStart(2, "0");
            return (
              <Reveal key={project.id} delay={40}>
                <Spotlight className={`project${index % 2 ? " project--flip" : ""}`}>
                  <article aria-labelledby={`${project.id}-title`} className="project__inner">
                    <div className="project__media">
                      <div className="project__screen">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          width={w}
                          height={h}
                          sizes="(max-width: 900px) calc(100vw - 32px), 640px"
                        />
                        <span className="project__scan" aria-hidden="true" />
                      </div>
                      <span className="project__status" aria-hidden="true">
                        <span className="led led--live" />
                        {project.imageStatus}
                      </span>
                    </div>

                    <div className="project__content">
                      <span className="project__number" aria-hidden="true">
                        {number}
                      </span>
                      <div className="project__topline">
                        <span className="project__fig">Fig. {number}</span>
                        <span className="project__domain">{project.domain}</span>
                      </div>

                      <h3 id={`${project.id}-title`}>{project.title}</h3>
                      <p>{project.description}</p>

                      <ul className="chip-list" aria-label={`${project.title} technologies`}>
                        {project.technologies.map((technology) => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>

                      <div className="project__links">
                        {project.links.map((link, linkIndex) => (
                          <a
                            className={`button ${linkIndex === 0 ? "button--primary" : "button--ghost"}`}
                            href={link.href}
                            key={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                            <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </article>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
