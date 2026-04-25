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
import { ArrowDown, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroBiscuit } from "@/components/sections/hero-biscuit";
import { useIntroDone } from "@/lib/use-intro-done";

const heroHeadline = ["Homemade", "khatai,", "baked", "fresh", "in", "Lahore."];

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
        <div className="absolute inset-0 bg-mesh-warm opacity-90" />
        <div className="absolute inset-0 bg-grain opacity-[0.35]" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cream"
        />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <motion.div
            style={
              reduceMotion ? undefined : { y: copyY, opacity, willChange: "transform" }
            }
            className="flex flex-col items-start gap-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Homemade · Hygienic kitchen · Lahore</span>
              </Badge>
            </motion.div>

            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-ink text-balance"
            >
              {heroHeadline.map((word, idx) => (
                <span
                  key={`${word}-${idx}`}
                  className="mr-[0.25em] inline-block overflow-hidden align-bottom"
                >
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: ready ? 0.7 : 0 }}
              className="max-w-xl text-lg text-ink/70 md:text-xl text-pretty"
            >
              Small-batch khatai made by hand in a spotless kitchen — pure desi ghee,
              fresh cardamom, honest ingredients. Baked this morning and delivered
              across Lahore the same day.
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
              <Button asChild variant="outline" size="lg">
                <Link href="#promise">How we bake</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: ready ? 1.1 : 0 }}
              className="flex flex-wrap items-center gap-8 pt-8 text-sm text-ink/60"
            >
              <Stat value="100%" label="Homemade" />
              <span className="hidden h-6 w-px bg-ink/15 sm:inline-block" />
              <Stat value="Daily" label="Fresh batches" />
              <span className="hidden h-6 w-px bg-ink/15 sm:inline-block" />
              <Stat value="Same-day" label="Lahore delivery" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            // Pure opacity fade, NO scale. Pushed to 1.0 s so the headline
            // and CTAs come in first — the biscuit photo is the last element
            // to settle, never the first thing you see after the curtains open.
            transition={{ duration: 1.4, delay: ready ? 1.0 : 0, ease: "linear" }}
            className="relative flex justify-center lg:justify-end"
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-serif text-2xl text-ink md:text-3xl">{value}</span>
      <span className="text-xs uppercase tracking-[0.25em] text-ink/55">{label}</span>
    </div>
  );
}
