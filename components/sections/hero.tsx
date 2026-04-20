"use client";

import * as React from "react";
import Image from "next/image";
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

const heroHeadline = ["Homemade", "khatai,", "baked", "fresh", "in", "Lahore."];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
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
  const ref = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawBgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const bgY = useSpring(rawBgY, { damping: 30, stiffness: 120, mass: 0.3 });

  const rawCopyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyY = useSpring(rawCopyY, { damping: 30, stiffness: 120, mass: 0.3 });

  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-36"
    >
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { y: bgY, willChange: "transform" }}
        className="absolute inset-x-0 -top-16 -bottom-16 -z-10"
      >
        <Image
          src="https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/75 to-cream" />
        <div className="absolute inset-0 bg-mesh-warm opacity-70 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-grain opacity-[0.35]" />
      </motion.div>

      <Container className="relative">
        <motion.div
          style={reduceMotion ? undefined : { y: copyY, opacity, willChange: "transform" }}
          className="flex flex-col items-start gap-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
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
            animate="show"
            className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-ink text-balance"
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-xl text-lg text-ink/70 md:text-xl text-pretty"
          >
            Small-batch khatai made by hand in a spotless kitchen — pure desi ghee, fresh
            cardamom, honest ingredients. Baked this morning and delivered across Lahore
            the same day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
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
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-wrap items-center gap-8 pt-8 text-sm text-ink/60"
          >
            <Stat value="100%" label="Homemade" />
            <span className="hidden h-6 w-px bg-ink/15 sm:inline-block" />
            <Stat value="Daily" label="Fresh batches" />
            <span className="hidden h-6 w-px bg-ink/15 sm:inline-block" />
            <Stat value="Same-day" label="Lahore delivery" />
          </motion.div>
        </motion.div>
      </Container>

      {!reduceMotion && (
        <motion.a
          href="#promise"
          aria-label="Scroll to our promise"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
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
