"use client";

import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Marquee } from "@/components/shared/marquee";
import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          align="center"
          kicker="Loved by Lahore"
          title={
            <>
              Warm kitchen,
              <br />
              warmer reviews.
            </>
          }
          lede="A line from the people who keep re-ordering."
        />
      </Container>

      <div className="mt-16">
        <Marquee speed={50}>
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              quote={t.quote}
              author={t.author}
              role={t.role}
              city={t.city}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

interface CardProps {
  quote: string;
  author: string;
  role: string;
  city: string;
}

function TestimonialCard({ quote, author, role, city }: CardProps) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col gap-5 rounded-3xl bg-cream-muted/70 p-6 ring-1 ring-inset ring-ink/5 shadow-soft md:w-[420px]">
      <Quote className="h-5 w-5 text-saffron" />
      <blockquote className="text-base text-ink/85 text-pretty md:text-lg">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-ink/10 pt-4 text-sm">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-serif text-saffron">
          {author.charAt(0)}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-medium text-ink">{author}</span>
          <span className="text-xs text-ink/55">
            {role} · {city}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
