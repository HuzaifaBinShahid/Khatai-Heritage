"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const HERO_IMAGE = "/images/HeaderImage.png";

export function HeroBiscuit() {
  const reduceMotion = useReducedMotion();

  // Subtle cursor parallax — the photo nudges a few pixels toward the cursor.
  // Pure translation, NO rotation — this is what makes it not look like the
  // hero biscuit is "rolling" the way the 3D version did.
  const tx = React.useRef(0);
  const ty = React.useRef(0);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      tx.current = nx * 12;
      ty.current = ny * 9;
    };
    const tick = () => {
      setPos((p) => ({
        x: p.x + (tx.current - p.x) * 0.06,
        y: p.y + (ty.current - p.y) * 0.06,
      }));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div className="relative aspect-square w-full max-w-[580px]">
      {/* Exact arrow vector copied from the Figma reference and recolored for the brand. */}
      <motion.div
        aria-hidden
        role="presentation"
        className="pointer-events-none absolute -left-24 top-12 z-20 hidden h-[196px] w-[212px] max-w-none lg:block"
        initial={reduceMotion ? undefined : { opacity: 0, x: -10 }}
        animate={reduceMotion ? undefined : { opacity: 0.85, x: 0 }}
        transition={{ duration: 0.9, delay: 1.35 }}
      >
        <Image src="/images/hero-arrow.svg" alt="" fill sizes="212px" unoptimized className="object-contain" />
      </motion.div>

      {/* White crumb and emphasis marks above the khatai. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[24%] top-3 z-30 hidden text-white drop-shadow-[0_2px_4px_rgba(159,62,45,0.45)] md:block"
      >
        <svg viewBox="0 0 70 54" className="h-12 w-16" fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M13 38 3 25M31 31 27 10M48 34 61 18" strokeWidth="4" />
        </svg>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[18%] top-8 z-30 hidden text-white drop-shadow-[0_2px_4px_rgba(159,62,45,0.45)] md:block"
      >
        <svg viewBox="0 0 70 54" className="h-11 w-14" fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M13 38 3 25M31 31 27 10M48 34 61 18" strokeWidth="4" />
        </svg>
      </div>
      <span aria-hidden className="absolute left-[17%] top-[18%] z-30 hidden h-2 w-2 rounded-full bg-white shadow-sm md:block" />
      <span aria-hidden className="absolute right-[12%] top-[24%] z-30 hidden h-1.5 w-1.5 rounded-full bg-white shadow-sm md:block" />
      <span aria-hidden className="absolute right-[8%] top-[31%] z-30 hidden h-1 w-1 rounded-full bg-white shadow-sm md:block" />
      {/* Saffron radial glow plate */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(212,175,55,0.32), transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* Soft cream plate */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-12 rounded-full bg-cream-muted/40 ring-1 ring-inset ring-saffron/15"
      />

      {/* Photo with subtle cursor-driven translation */}
      <motion.div
        animate={reduceMotion ? undefined : { x: pos.x, y: pos.y }}
        transition={{ type: "tween", duration: 0 }}
        className="absolute inset-6 overflow-hidden rounded-full shadow-[0_30px_60px_-20px_rgba(20,17,13,0.45)]"
      >
        <Image
          src={HERO_IMAGE}
          alt="A small batch of homemade badam wali khatai shortbread topped with a whole roasted almond, baked fresh in Lahore."
          fill
          sizes="540px"
          priority
          className="object-cover"
        />
        {/* Warm edge vignette to seat it on the page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 55%, rgba(20,17,13,0.45) 100%)",
          }}
        />
      </motion.div>

      {/* Floating "Fresh daily" pill */}
      <motion.div
        aria-hidden
        animate={
          reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, 4, 0] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-2 top-8 hidden h-16 w-16 items-center justify-center rounded-full bg-saffron/95 text-center font-serif text-[10px] uppercase leading-tight tracking-[0.18em] text-white shadow-soft md:flex"
      >
        Fresh
        <br />
        daily
      </motion.div>
    </div>
  );
}
