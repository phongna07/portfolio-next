import Image from "next/image";

import { additionalProjects, projectImageSizes } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Spotlight from "./Spotlight";

export default function AdditionalProjects() {
  return (
    <section
      className="section additional"
      id="additional-projects"
      aria-labelledby="additional-projects-title"
    >
      <div className="section-shell">
        <SectionHeading
          index="02.1"
          kicker="Appendix"
          id="additional-projects-title"
          compact
          title={
            <>
              Additional <em>projects.</em>
            </>
          }
          aside="More builds from along the way: an IoT monitoring system, a tool for fellow students, and a Gazebo and ROS 2 take on multi-UAV tracking."
        />

        <ul className="mini-grid">
          {additionalProjects.map((project, index) => {
            const [w, h] = projectImageSizes[project.id] ?? [1600, 1000];
            const ref = `A.${index + 1}`;
            return (
              <li key={project.id}>
                <Reveal delay={index * 60} className="mini-reveal">
                  <Spotlight className="mini">
                    <article aria-labelledby={`${project.id}-title`} className="mini__inner">
                      <div className="mini__media">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          width={w}
                          height={h}
                          sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1020px) 300px, 400px"
                          style={
                            project.imagePosition
                              ? { objectPosition: project.imagePosition }
                              : undefined
                          }
                        />
                        <span className="project__scan" aria-hidden="true" />
                        <span className="mini__status" aria-hidden="true">
                          <span className="led" />
                          {project.imageStatus}
                        </span>
                      </div>

                      <div className="mini__body">
                        <div className="mini__topline">
                          <span className="mini__ref">{ref}</span>
                          <span>{project.domain}</span>
                        </div>
                        <h3 id={`${project.id}-title`}>{project.title}</h3>
                        <p>{project.description}</p>

                        <ul className="chip-list chip-list--small" aria-label={`${project.title} technologies`}>
                          {project.technologies.map((technology) => (
                            <li key={technology}>{technology}</li>
                          ))}
                        </ul>

                        <div className="mini__links">
                          {project.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                              <span aria-hidden="true">↗</span>
                              <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Spotlight>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
