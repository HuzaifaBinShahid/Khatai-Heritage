"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Gift, Heart, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

const occasions = [
  {
    icon: Sparkles,
    title: "Eid & Ramadan",
    body: "Our Saffron Gold and Royal Pistachio tins are ready-gifted for Eid, wrapped in hand-stamped cotton.",
  },
  {
    icon: Heart,
    title: "Weddings & mehndis",
    body: "Personalised favours from 50 boxes upwards. Your monogram, our recipe.",
  },
  {
    icon: Gift,
    title: "Corporate gifting",
    body: "Client-ready presentation boxes with ivory inner lining and a hand-written note.",
  },
];

export function Occasions() {
  return (
    <section id="occasions" className="relative scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-mesh-warm px-8 py-16 shadow-soft md:px-16 md:py-24">
          <div className="absolute inset-0 bg-grain opacity-30" />
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <SectionHeading
              kicker="For the table"
              kickerTone="rose"
              title={
                <>
                  Built for the
                  <br />
                  <span className="italic text-rose">occasions that matter.</span>
                </>
              }
              lede="Eid, weddings, Diwali, quiet afternoons with chai. We have packaging, a gift card, and same-week shipping for every one of them."
            />

            <div className="flex flex-col gap-4">
              {occasions.map((o, idx) => {
                const Icon = o.icon;
                return (
                  <motion.article
                    key={o.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    className="flex items-start gap-5 rounded-2xl bg-cream/80 p-5 ring-1 ring-inset ring-ink/5 backdrop-blur transition-colors hover:bg-cream"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-saffron">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-serif text-xl text-ink">{o.title}</h3>
                      <p className="text-sm text-ink/65 text-pretty">{o.body}</p>
                    </div>
                  </motion.article>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-2"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(212,175,55,0.0)",
                      "0 0 40px 4px rgba(212,175,55,0.35)",
                      "0 0 0 0 rgba(212,175,55,0.0)",
                    ],
                  }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block rounded-full"
                >
                  <Button asChild variant="gold" size="lg">
                    <Link href="#newsletter">Enquire about gifting</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
