"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroBiscuit } from "@/components/sections/hero-biscuit";
import { useIntroDone } from "@/lib/use-intro-done";

const heroHeadline = ["Khatai,", "done right."];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const ready = useIntroDone();
  const ref = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawCopyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyY = useSpring(rawCopyY, { damping: 30, stiffness: 120, mass: 0.3 });

  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-36"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-warm-cream" />
      </div>

      <Container className="relative px-5 md:px-5 lg:px-5">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-4">
          <motion.div
            style={
              reduceMotion ? undefined : { y: copyY, opacity, willChange: "transform" }
            }
            className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-8 text-center lg:-translate-x-16"
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-bold uppercase tracking-[0.36em] text-saffron-deep md:text-base"
            >
              The Lahore classic
            </motion.p>

            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="w-full whitespace-nowrap pb-[0.12em] font-serif text-[clamp(1.5rem,8vw,3.5rem)] font-semibold italic leading-none tracking-[-0.045em] text-gold-deep lg:text-[clamp(2.75rem,4.5vw,4rem)]"
            >
              {heroHeadline.map((word, idx) => (
                <motion.span
                  key={`${word}-${idx}`}
                  variants={wordVariants}
                  className={idx < heroHeadline.length - 1 ? "mr-[0.2em] inline-block" : "inline-block"}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: ready ? 0.7 : 0 }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/65 md:text-base"
            >
              Crumbly. Buttery. Baked fresh.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: ready ? 0.9 : 0 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button asChild variant="primary" size="lg">
                <Link href="#collection">Order khatai</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            // Pure opacity fade, NO scale. Pushed to 1.0 s so the headline
            // and CTAs come in first the biscuit photo is the last element
            // to settle, never the first thing you see after the curtains open.
            transition={{ duration: 1.4, delay: ready ? 1.0 : 0, ease: "linear" }}
            className="relative hidden lg:flex lg:justify-end"
          >
            <HeroBiscuit />
          </motion.div>
        </div>
      </Container>

      {!reduceMotion && (
        <motion.a
          href="#promise"
          aria-label="Scroll to our promise"
          initial={{ opacity: 0, y: -4 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.8, delay: ready ? 1.4 : 0 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink/60 md:flex"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
