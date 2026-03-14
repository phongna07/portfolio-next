"use client";

import { FC, Fragment, useEffect, useRef } from "react";

import { BiChevronsDown } from "react-icons/bi";
import Canvas from "./Canvas";
import Parallax from "./Parallax";
import { characters } from "../data/animation-characters";
import { useLenis } from "lenis/react";

const Intro: FC = () => {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const lenisRef = useRef<ReturnType<typeof useLenis> | null>(null);

  // After mount, set stroke-dasharray for each path based on actual path length
  useEffect(() => {
    pathRefs.current.forEach((path) => {
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      }
    });
    // Force reflow so the browser registers the initial dash values
    // before the animation class is added
    void document.body.offsetHeight;
    pathRefs.current.forEach((path) => {
      if (path) {
        path.classList.add("anim-path-draw");
      }
    });
  }, []);

  const lenis = useLenis();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("who");
    if (target && lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen flex justify-center items-center flex-col gap-5">
      <Canvas />

      <svg
        className="h-[10vw] max-h-[100px] min-h-[60px] max-w-[100vw] z-[1]"
        viewBox="0 0 276 97"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {characters.map((character, index) => (
          <Fragment key={character}>
            {/* Stroke draw path */}
            <path
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              className=""
              style={
                {
                  "--anim-delay": `${index * 0.1}s`,
                  strokeDasharray: 1000,
                  strokeDashoffset: 1000,
                } as React.CSSProperties
              }
              d={character}
              fill="none"
              stroke="#FFF"
              strokeWidth="3"
            />
            {/* Fill path */}
            <path
              className="anim-fill-in"
              style={
                {
                  "--anim-delay": `${0.7 + index * 0.1}s`,
                } as React.CSSProperties
              }
              fill="none"
              d={character}
            />
          </Fragment>
        ))}
      </svg>

      <Parallax speed={1}>
        <p
          className="text-3xl text-center z-[1] overflow-hidden anim-fade-in"
          style={{ "--anim-delay": "1.4s" } as React.CSSProperties}
        >
          {`Just another tech enthusiast`}
        </p>
      </Parallax>

      <Parallax
        speed={2}
        className="absolute left-[calc(50%-23px)] bottom-[10vh]"
      >
        <a
          className="cursor-pointer block anim-fade-in"
          style={{ "--anim-delay": "1.4s" } as React.CSSProperties}
          href="#who"
          onClick={handleScrollTo}
        >
          <BiChevronsDown className="animate-bounce" size={56} />
        </a>
      </Parallax>
    </div>
  );
};

export default Intro;
