"use client";

import * as React from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "motion/react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix,
  className,
}: AnimatedCounterProps) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(from);
  const [display, setDisplay] = React.useState<number>(reduceMotion ? to : from);

  React.useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(to);
      return;
    }
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, value, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
