"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { CheckCircle2, Flame, Hand, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";

const promises = [
  {
    icon: Hand,
    title: "Made by hand",
    body: "No factory lines, no conveyors. Shaped and trayed by the same small team, every morning.",
  },
  {
    icon: Sparkles,
    title: "Hygienic kitchen",
    body: "Spotless workbenches, sanitised trays and gloved hands — a kitchen we are genuinely proud of.",
  },
  {
    icon: Flame,
    title: "Pure desi ghee",
    body: "Never palm oil, never hydrogenated shortening. The real stuff, for the real crumb.",
  },
  {
    icon: CheckCircle2,
    title: "Small batches",
    body: "We bake to order, not to stock. If it reached you, it came out of the oven this morning.",
  },
];

export function Heritage() {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const scale = useSpring(raw, { damping: 30, stiffness: 120, mass: 0.3 });

  return (
    <section
      ref={ref}
      id="promise"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream-muted shadow-soft">
            <motion.div
              style={reduceMotion ? undefined : { scale, willChange: "transform" }}
              className="absolute inset-0"
            >
              <Image
                src="/images/HomeMade.png"
                alt="A basket of freshly baked homemade badam wali khatai, carried straight from the Lahore kitchen"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" />
            </motion.div>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-cream/90 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink/55">
                <span className="h-px w-8 bg-saffron" />
                <span>Baked this morning in Lahore</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeading
              kicker="Our promise"
              title={
                <>
                  Homemade,
                  <br />
                  not factory-made.
                </>
              }
              lede="Every tin is baked to order in a small, hygienic kitchen in Lahore. Pure desi ghee, fresh ingredients, and batches small enough that every biscuit gets attention."
            />

            <ul className="grid gap-5 sm:grid-cols-2">
              {promises.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <motion.li
                    key={p.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    className="flex gap-4 rounded-2xl border border-ink/10 bg-cream p-5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-saffron">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-ink">{p.title}</h3>
                      <p className="mt-1 text-sm text-ink/65 text-pretty">{p.body}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
