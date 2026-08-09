"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setIsReady(true);
      setIsVisible(true);
      return;
    }

    setIsReady(true);

    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
      const timeoutId = window.setTimeout(() => setIsVisible(true), 30);
      return () => window.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const classNames = [
    "reveal",
    isReady && "reveal--ready",
    isVisible && "reveal--visible",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classNames}
      style={{ "--reveal-delay": `${Math.min(delay, 180)}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
