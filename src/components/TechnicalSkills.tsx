import { technicalSkillGroups } from "../data/portfolio";
import Reveal from "./Reveal";

export default function TechnicalSkills() {
  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-title">
      <div className="section-shell">
        <Reveal className="section-heading">
          <p className="section-label">Technical range / Tools and systems</p>
          <h2 id="skills-title">My technical skills.</h2>
          <p>
            A balanced toolkit spanning embedded hardware, programming, and the
            software used to turn system data into useful interfaces.
          </p>
        </Reveal>

        <div className="skills-grid">
          {technicalSkillGroups.map((group, index) => (
            <Reveal delay={index * 50} key={group.id}>
              <article className="skill-panel" aria-labelledby={`${group.id}-title`}>
                <div className="skill-panel__heading">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3 id={`${group.id}-title`}>{group.title}</h3>
                </div>
                <ul aria-label={`${group.title} skills`}>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
