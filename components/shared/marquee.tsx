"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const reduceMotion = useReducedMotion();

  const trackStyle: React.CSSProperties = reduceMotion
    ? {}
    : {
        animation: `marquee-scroll ${speed}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
      };

  return (
    <div
      className={cn(
        "marquee-mask group relative flex overflow-hidden",
        pauseOnHover && "marquee-hover-pause",
        className,
      )}
    >
      <div
        className="flex shrink-0 gap-8 pr-8 will-change-transform *:shrink-0"
        style={trackStyle}
      >
        <div className="flex shrink-0 gap-8">{children}</div>
        <div aria-hidden className="flex shrink-0 gap-8">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee-hover-pause:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
