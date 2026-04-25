"use client";

import { AnimatePresence, motion } from "motion/react";
import { INTRO_TIMING } from "@/lib/three-scene";

interface CurtainsProps {
  parted: boolean;
}

// Soft "torn paper" path — gentle ±1.2% wobble around 50%, 9 waypoints.
// Both halves use the same path (one mirrored) so they interlock when flush.
// Subtle, not mountainous.
const TEAR_LEFT =
  "polygon(0% 0%, 50% 0%, 49.2% 12%, 50.6% 25%, 48.8% 38%, 50.4% 50%, 49% 62%, 50.8% 75%, 49.2% 88%, 50% 100%, 0% 100%)";

const TEAR_RIGHT =
  "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 49.2% 88%, 50.8% 75%, 49% 62%, 50.4% 50%, 48.8% 38%, 50.6% 25%, 49.2% 12%)";

const CURTAIN_EASE = [0.65, 0, 0.35, 1] as const;

export function Curtains({ parted }: CurtainsProps) {
  return (
    <>
      {/* Solid base — single seamless plate, hides the page completely until split */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 bg-ink"
        initial={{ opacity: 1 }}
        animate={{ opacity: parted ? 0 : 1 }}
        transition={{ duration: 0.06, ease: "linear" }}
      />

      {/* Saffron flash at the tear instant */}
      <AnimatePresence>
        {parted && (
          <motion.div
            key="tear-flash"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[45]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", times: [0, 0.25, 1] }}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255, 226, 160, 0.95) 0%, rgba(212, 175, 55, 0.45) 18%, rgba(20, 17, 13, 0) 38%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Left torn half */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 bg-ink"
        initial={{ x: 0, opacity: 0 }}
        animate={{
          x: parted ? "-100%" : 0,
          opacity: parted ? 1 : 0,
        }}
        transition={{
          x: { duration: INTRO_TIMING.curtainDuration, ease: CURTAIN_EASE },
          opacity: { duration: 0.06, ease: "linear" },
        }}
        style={{ clipPath: TEAR_LEFT, willChange: "transform, opacity" }}
      />

      {/* Right torn half */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 bg-ink"
        initial={{ x: 0, opacity: 0 }}
        animate={{
          x: parted ? "100%" : 0,
          opacity: parted ? 1 : 0,
        }}
        transition={{
          x: { duration: INTRO_TIMING.curtainDuration, ease: CURTAIN_EASE },
          opacity: { duration: 0.06, ease: "linear" },
        }}
        style={{ clipPath: TEAR_RIGHT, willChange: "transform, opacity" }}
      />
    </>
  );
}
