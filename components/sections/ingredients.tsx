"use client";

import { motion } from "motion/react";
import { Droplet, Flame, Leaf, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ingredients, type Ingredient } from "@/lib/ingredients";
import { cn } from "@/lib/utils";

const iconMap = {
  flame: Flame,
  leaf: Leaf,
  sparkles: Sparkles,
  droplet: Droplet,
} as const;

const toneForIcon: Record<Ingredient["icon"], string> = {
  flame: "text-saffron-deep bg-saffron/15 ring-saffron/30",
  leaf: "text-pistachio-deep bg-pistachio/15 ring-pistachio/40",
  sparkles: "text-pistachio-deep bg-pistachio/15 ring-pistachio/40",
  droplet: "text-rose bg-rose/10 ring-rose/30",
};

export function Ingredients() {
  return (
    <section id="ingredients" className="relative scroll-mt-24 bg-ink text-cream py-24 md:py-32">
      <div className="absolute inset-0 bg-grain opacity-20" />
      <Container className="relative">
        <SectionHeading
          kicker="The pantry"
          kickerTone="ink"
          title={<span className="text-cream">Three ingredients. Nothing else.</span>}
          lede={
            <span className="text-cream/70">
              No palm oil, no preservatives, no shortcuts. Every tin contains exactly what the
              name of the biscuit promises sourced by hand from the places that grow it best.
            </span>
          }
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((ing, idx) => {
            const Icon = iconMap[ing.icon];
            return (
              <motion.article
                key={ing.id}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                  delay: idx * 0.08,
                }}
                className="group relative flex flex-col gap-5 rounded-3xl border border-cream/10 bg-cream/5 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-saffron/40"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset",
                    toneForIcon[ing.icon],
                  )}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <div className="flex flex-col gap-2">
                  <div className="text-xs uppercase tracking-[0.3em] text-cream/50">
                    {ing.origin}
                  </div>
                  <h3 className="font-serif text-2xl text-cream">{ing.name}</h3>
                  <p className="text-sm text-cream/65 text-pretty">{ing.note}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4 text-xs uppercase tracking-[0.25em] text-cream/40">
                  <span>0{idx + 1}</span>
                  <span className="h-px w-12 bg-cream/20 transition-all duration-500 group-hover:w-20 group-hover:bg-saffron" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
