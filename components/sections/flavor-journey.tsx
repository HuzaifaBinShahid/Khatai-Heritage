"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

type Note = {
  id: string;
  title: string;
  teaser: string;
  body: string;
  tone: "saffron" | "pistachio" | "rose" | "charcoal";
};

const notes: Note[] = [
  {
    id: "aroma",
    title: "Aroma",
    teaser: "Warm ghee · green cardamom · toasted almond.",
    body: "Open the tin and the first breath is sweet desi ghee, followed by the green-citrus lift of fresh cardamom and the toasty warmth of roasted almond. This is the opening act.",
    tone: "saffron",
  },
  {
    id: "texture",
    title: "Texture",
    teaser: "Shortbread crumb that yields at a touch.",
    body: "A true khatai shatters under slight pressure, dissolving before it ever feels dense. Ours is crumb-forward, never powdery — the stone-milled wheat holds the bite, the ghee does the rest.",
    tone: "pistachio",
  },
  {
    id: "flavor",
    title: "Flavor",
    teaser: "Buttery, floral, never too sweet.",
    body: "We use raw cane sugar, not refined, which means the sweetness recedes and lets the ghee and spice speak. Roasted almond brings nutty depth; cardamom ties it all together.",
    tone: "rose",
  },
  {
    id: "finish",
    title: "Finish",
    teaser: "Long, warm, unmistakably South Asian.",
    body: "The finish lingers on the palate — toasty, cardamom-tipped and faintly nutty from the almond. Designed to be eaten slowly, preferably with company.",
    tone: "charcoal",
  },
];

const toneStyles: Record<Note["tone"], { bg: string; ring: string; text: string }> = {
  saffron: { bg: "bg-saffron/10", ring: "ring-saffron/30", text: "text-saffron-deep" },
  pistachio: { bg: "bg-pistachio/10", ring: "ring-pistachio/40", text: "text-pistachio-deep" },
  rose: { bg: "bg-rose/10", ring: "ring-rose/30", text: "text-rose" },
  charcoal: { bg: "bg-ink/5", ring: "ring-ink/20", text: "text-ink" },
};

export function FlavorJourney() {
  const [active, setActive] = React.useState<string>(notes[0].id);

  return (
    <section id="flavor" className="relative scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          kicker="Tasting notes"
          title={
            <>
              Built for the
              <span className="italic text-rose"> second</span> bite.
            </>
          }
          lede="A flavor journey across four movements — from first aroma to long finish. Hover any card to read the note."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <ul className="flex flex-col gap-4">
            {notes.map((note, idx) => {
              const tones = toneStyles[note.tone];
              const isActive = active === note.id;
              return (
                <motion.li
                  key={note.id}
                  onHoverStart={() => setActive(note.id)}
                  onFocus={() => setActive(note.id)}
                  layout
                  tabIndex={0}
                  className={cn(
                    "group cursor-pointer rounded-3xl border p-6 transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-saffron",
                    isActive
                      ? `${tones.bg} ${tones.ring} ring-1 ring-inset border-transparent`
                      : "border-ink/10 bg-cream hover:border-ink/20",
                  )}
                >
                  <motion.div layout="position" className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "font-serif text-sm",
                          isActive ? tones.text : "text-ink/40",
                        )}
                      >
                        0{idx + 1}
                      </span>
                      <h3 className="font-serif text-2xl text-ink md:text-3xl">{note.title}</h3>
                    </div>
                    <motion.span
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-full border text-sm",
                        isActive ? `${tones.text} border-current` : "border-ink/15 text-ink/40",
                      )}
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </motion.div>

                  <p className="mt-3 text-sm text-ink/60">{note.teaser}</p>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        key="body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 text-sm text-ink/75 text-pretty"
                      >
                        {note.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>

          <div className="relative hidden min-h-[420px] overflow-hidden rounded-[2.5rem] bg-mesh-warm p-10 shadow-soft lg:flex lg:flex-col lg:justify-between">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink/60">
              <span className="h-px w-10 bg-ink/40" />
              On the palate
            </div>

            <AnimatePresence mode="wait">
              {notes.map(
                (note) =>
                  active === note.id && (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-md"
                    >
                      <h4 className="font-serif text-5xl leading-tight text-ink">
                        {note.title}
                      </h4>
                      <p className="mt-5 text-lg text-ink/75 text-pretty">{note.body}</p>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>

            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-ink/50">
              <span>Pair with</span>
              <span className="text-ink/80">Karak chai</span>
              <span>·</span>
              <span className="text-ink/80">Doodh patti</span>
              <span>·</span>
              <span className="text-ink/80">Cold milk</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
