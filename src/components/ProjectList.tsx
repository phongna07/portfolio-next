import Image from "next/image";

import { projects } from "../data/portfolio";
import Reveal from "./Reveal";

function ProjectVisual({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  if (project.image && project.imageAlt) {
    return (
      <div className="project-row__image">
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={2386}
          height={1580}
          sizes="(max-width: 760px) calc(100vw - 36px), 430px"
        />
      </div>
    );
  }

  return (
    <div className="project-placeholder" aria-hidden="true">
      <div className="project-placeholder__header">
        <span>SLOT_{String(index + 1).padStart(2, "0")}</span>
        <span>UNASSIGNED</span>
      </div>
      <div className="project-placeholder__field">
        <span className="project-placeholder__node" />
        <span className="project-placeholder__line" />
        <span className="project-placeholder__node" />
      </div>
      <span className="project-placeholder__label">FUTURE BUILD</span>
    </div>
  );
}

export default function ProjectList() {
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-shell">
        <Reveal className="projects-heading">
          <p className="section-label">Selected work / Current and upcoming</p>
          <h2 id="projects-title">Selected projects.</h2>
          <p>
            Completed work and open project slots across embedded systems and
            electrical engineering.
          </p>
        </Reveal>

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal delay={(index % 2) * 50} key={project.id}>
              <article
                className={`project-row project-row--${project.status}`}
                aria-labelledby={`${project.id}-title`}
              >
                <ProjectVisual project={project} index={index} />

                <div className="project-row__content">
                  <div className="project-row__meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className={`project-status project-status--${project.status}`}>
                      {project.status === "built" ? "Built" : "Project slot"}
                    </span>
                  </div>

                  <h3 id={`${project.id}-title`}>{project.title}</h3>
                  <p>{project.description}</p>

                  <ul className="tag-list" aria-label={`${project.title} topics`}>
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>

                  {project.links && (
                    <div className="project-links">
                      {project.links.map((link, linkIndex) => (
                        <a
                          className={linkIndex === 0 ? "button button--signal" : "button button--ghost"}
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
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
