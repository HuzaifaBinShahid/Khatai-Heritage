"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "submitting" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state !== "idle") return;
    setState("submitting");
    await new Promise((r) => setTimeout(r, 700));
    setState("done");
    setTimeout(() => {
      setEmail("");
      setState("idle");
    }, 3600);
  }

  return (
    <section id="newsletter" className="relative scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
          <SectionHeading
            align="center"
            kicker="Stay in the tin"
            kickerTone="saffron"
            title={
              <>
                First taste of every
                <br />
                <span className="italic">new batch.</span>
              </>
            }
            lede="Seasonal editions, festive tins and small-batch drops land in our letter first. No spam — one warm email a month."
          />

          <form
            onSubmit={handleSubmit}
            className="relative flex w-full max-w-xl flex-col gap-3 rounded-full border border-ink/15 bg-cream/80 p-2 backdrop-blur sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state !== "idle"}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={state !== "idle"}
              className="min-w-[160px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {state === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2"
                  >
                    Subscribe <Send className="h-4 w-4" />
                  </motion.span>
                )}
                {state === "submitting" && (
                  <motion.span
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sending…
                  </motion.span>
                )}
                {state === "done" && (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2"
                  >
                    Welcome <Check className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </form>

          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
            Homemade · Hygienic kitchen · Same-day delivery in Lahore
          </p>
        </div>
      </Container>
    </section>
  );
}
