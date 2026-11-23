"use client";

import { useEffect, useRef } from "react";

type ProjectVideoProps = {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
  objectPosition?: string;
};

/**
 * A muted, looping preview clip that only plays while on screen and stays on
 * its poster frame for visitors who prefer reduced motion.
 */
export default function ProjectVideo({
  src,
  poster,
  label,
  width,
  height,
  objectPosition,
}: ProjectVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (onScreen && !motion.matches) {
        video.play().catch(() => {
          /* Autoplay can be refused; the poster stays visible. */
        });
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}
