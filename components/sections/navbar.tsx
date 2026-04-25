"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useIntroDone } from "@/lib/use-intro-done";

const navLinks = [
  { href: "#promise", label: "Our promise" },
  { href: "#ingredients", label: "Ingredients" },
  { href: "#collection", label: "Menu" },
  { href: "#flavor", label: "Tasting notes" },
  { href: "#occasions", label: "Gifting" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const introDone = useIntroDone();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120);
    setScrolled(latest > 24);
  });

  if (!introDone) return null;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container
        className={cn(
          "mt-4 flex items-center justify-between rounded-full border border-transparent px-5 py-3 backdrop-blur transition-all duration-500",
          scrolled
            ? "border-ink/10 bg-cream/85 shadow-[0_10px_30px_-20px_rgba(20,17,13,0.35)]"
            : "bg-transparent",
        )}
      >
        <Link href="#top" className="group flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-serif text-lg font-semibold text-saffron"
          >
            K
          </motion.span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-lg tracking-tight text-ink">Khatai Heritage</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink/50">
              Homemade · Lahore
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-ink/75 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-saffron transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="#newsletter">Order a box</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-cream/80 text-ink transition-colors md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
          >
            <Container className="mt-3 rounded-3xl border border-ink/10 bg-cream/95 p-6 shadow-soft backdrop-blur">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block text-lg font-medium text-ink/80 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button asChild variant="primary" className="mt-6 w-full">
                <Link href="#newsletter" onClick={() => setOpen(false)}>
                  Order a box
                </Link>
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
