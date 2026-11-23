"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

type ProjectCarouselProps = {
  children: ReactNode;
  count: number;
  label: string;
  /** Prefix for the visible-range counter, e.g. "A." gives "A.1–A.3". */
  refPrefix?: string;
};

type Range = { first: number; last: number; progress: number; size: number };

/**
 * Horizontally scrolling track with snap points, previous/next buttons, a
 * visible-range counter and a progress rail.
 */
export default function ProjectCarousel({
  children,
  count,
  label,
  refPrefix = "",
}: ProjectCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [range, setRange] = useState<Range>({ first: 0, last: count - 1, progress: 0, size: 1 });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    // Item offsets are measured from the track (it is positioned), so they
    // share a coordinate space with scrollLeft.
    const viewStart = track.scrollLeft;
    const viewEnd = viewStart + track.clientWidth;

    let first = -1;
    let last = -1;
    items.forEach((item, index) => {
      const start = item.offsetLeft;
      const end = start + item.offsetWidth;
      // Treat a card as visible when most of it is on screen.
      const visible = Math.min(end, viewEnd) - Math.max(start, viewStart);
      if (visible >= item.offsetWidth * 0.6) {
        if (first === -1) first = index;
        last = index;
      }
    });

    const max = track.scrollWidth - track.clientWidth;
    setRange({
      first: Math.max(first, 0),
      last: last === -1 ? Math.max(first, 0) : last,
      progress: max > 1 ? track.scrollLeft / max : 0,
      size: track.scrollWidth > 0 ? Math.min(track.clientWidth / track.scrollWidth, 1) : 1,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    const resize = new ResizeObserver(onScroll);
    resize.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      resize.disconnect();
    };
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const item = track?.children[0] as HTMLElement | undefined;
    if (!track || !item) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * (item.offsetWidth + gap),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const atStart = range.progress <= 0.005;
  const atEnd = range.progress >= 0.995 || range.size >= 0.999;
  const scrollable = range.size < 0.999;

  return (
    <div className={`carousel${scrollable ? " carousel--scrollable" : ""}`}>
      <div className="carousel__bar">
        <p className="carousel__count" aria-live="polite">
          <span className="carousel__range">
            {refPrefix}
            {range.first + 1}
            {range.last > range.first && (
              <>
                –{refPrefix}
                {range.last + 1}
              </>
            )}
          </span>
          <span className="carousel__total">
            {" "}
            / {count} projects
          </span>
        </p>

        <div className="carousel__rail" aria-hidden="true">
          <span
            className="carousel__thumb"
            style={{
              width: `${range.size * 100}%`,
              left: `${range.progress * (1 - range.size) * 100}%`,
            }}
          />
        </div>

        <div className="carousel__buttons">
          <button
            type="button"
            className="carousel__button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous projects"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="carousel__button carousel__button--next"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next projects"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <ul ref={trackRef} className="carousel__track" aria-label={label} tabIndex={0}>
        {children}
      </ul>
    </div>
  );
}
