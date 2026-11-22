import type { ReactNode } from "react";

import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  id: string;
  title: ReactNode;
  aside?: ReactNode;
};

export default function SectionHeading({ index, kicker, id, title, aside }: SectionHeadingProps) {
  return (
    <Reveal className="section-heading">
      <p className="section-heading__kicker">
        <span>§ {index}</span>
        {kicker}
      </p>
      <h2 id={id}>{title}</h2>
      {aside && <p className="section-heading__aside">{aside}</p>}
    </Reveal>
  );
}
