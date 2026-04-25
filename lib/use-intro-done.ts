"use client";

import * as React from "react";

/**
 * Returns true when the cinematic intro has finished (the IntroOverlay
 * dispatches `khatai:intro-done` on its way out). For users with
 * `prefers-reduced-motion: reduce` the intro is skipped, so we resolve to
 * `true` immediately on mount.
 *
 * Hero / nav / hero-biscuit gate their entrance animations on this hook so
 * the reveal is synchronised with the curtains parting.
 */
export function useIntroDone(): boolean {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener("khatai:intro-done", onDone);
    return () => window.removeEventListener("khatai:intro-done", onDone);
  }, []);

  return done;
}
