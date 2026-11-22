import { projects, technicalSkillGroups } from "../data/portfolio";

export default function SignalBus() {
  const items = [
    ...technicalSkillGroups.flatMap((group) => group.skills),
    ...projects.map((project) => project.title),
  ];

  const track = (hidden: boolean) => (
    <ul className="bus__track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className="bus" role="region" aria-label="Technologies and projects">
      <span className="bus__label" aria-hidden="true">
        DATA[15:0]
      </span>
      <div className="bus__viewport">
        <div className="bus__rail">
          {track(false)}
          {track(true)}
        </div>
      </div>
    </div>
  );
}
