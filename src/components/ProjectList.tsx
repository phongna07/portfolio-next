import Image from "next/image";

import { projects } from "../data/portfolio";
import Reveal from "./Reveal";

export default function ProjectList() {
  return (
    <section
      className="projects-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-shell">
        <Reveal className="projects-heading">
          <p className="section-label">Selected work / Completed projects</p>
          <h2 id="projects-title">Selected projects.</h2>
          <p>
            A focused selection of completed work across embedded systems,
            software, and electrical engineering.
          </p>
        </Reveal>

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal delay={(index % 2) * 50} key={project.id}>
              <article
                className="project-row"
                aria-labelledby={`${project.id}-title`}
              >
                <div className="project-row__image">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={2386}
                    height={1580}
                    sizes="(max-width: 760px) calc(100vw - 36px), 430px"
                  />
                  <span className="project-row__image-scan" aria-hidden="true" />
                  <span className="project-row__image-status" aria-hidden="true">
                    {project.imageStatus}
                  </span>
                </div>

                <div className="project-row__content">
                  <div className="project-row__heading">
                    <span className="project-row__meta" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 id={`${project.id}-title`}>{project.title}</h3>
                  </div>

                  <p>{project.description}</p>

                  <ul className="tag-list" aria-label={`${project.title} topics`}>
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>

                  <div className="project-links">
                    {project.links.map((link, linkIndex) => (
                      <a
                        className={
                          linkIndex === 0
                            ? "button button--signal"
                            : "button button--ghost"
                        }
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
