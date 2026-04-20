"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { TiltCard } from "@/components/shared/tilt-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const accentToBadge = {
  saffron: "gold",
  pistachio: "pistachio",
  rose: "rose",
  cream: "default",
} as const;

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const badgeVariant = accentToBadge[product.accent];
  return (
    <motion.article
      id={product.slug}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="group"
    >
      <TiltCard className="relative overflow-hidden rounded-3xl bg-cream-muted/60 p-3 ring-1 ring-inset ring-ink/5 shadow-soft">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <Badge variant={badgeVariant}>{product.weight}</Badge>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-saffron text-saffron" />
            {product.rating.toFixed(1)}
            <span className="text-ink/50">({product.reviewCount})</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5 pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-2xl leading-tight text-ink">{product.name}</h3>
            <span className="shrink-0 text-sm font-medium tracking-wide text-ink/80">
              {product.priceDisplay}
            </span>
          </div>
          <p className="text-sm italic text-ink/60 text-pretty">{product.tagline}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {product.ingredients.slice(0, 3).map((ing) => (
              <span
                key={ing}
                className={cn(
                  "inline-flex items-center rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-ink/70 ring-1 ring-inset ring-ink/10",
                )}
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}
