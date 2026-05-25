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
    if (window.matchMedia("(max-width: 767px)").matches) return;

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
    <div className="relative aspect-square w-full max-w-[540px]">
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
          alt="A small batch of homemade badam wali khatai — desi-ghee shortbread topped with a whole roasted almond, baked fresh in Lahore."
          fill
          sizes="(min-width: 1024px) 540px, 80vw"
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
        className="absolute right-2 top-8 hidden h-16 w-16 items-center justify-center rounded-full bg-saffron/95 text-center font-serif text-[10px] uppercase leading-tight tracking-[0.18em] text-ink shadow-soft md:flex"
      >
        Fresh
        <br />
        daily
      </motion.div>
    </div>
  );
}
