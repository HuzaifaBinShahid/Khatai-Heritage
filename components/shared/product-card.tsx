"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { whatsappUrl } from "@/lib/site";
import { TiltCard } from "@/components/shared/tilt-card";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  return (
    <motion.article
      id={product.slug}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="group"
    >
      <TiltCard className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-cream-muted/60 p-3 ring-1 ring-inset ring-ink/5 shadow-soft">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(min-width: 768px) 420px, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
          {product.rating && (
            <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-saffron text-saffron" />
              {product.rating.toFixed(1)}
              {product.reviewCount && (
                <span className="text-ink/50">({product.reviewCount})</span>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-5 p-5 pt-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-2xl leading-tight text-ink">{product.name}</h3>
            <p className="text-sm italic text-ink/60 text-pretty">{product.tagline}</p>
          </div>
          <dl className="mt-auto grid auto-cols-fr grid-flow-col divide-x divide-ink/10 rounded-2xl bg-cream ring-1 ring-inset ring-ink/10">
            {product.prices.map((price) => (
              <div key={price.weight} className="flex flex-col items-center gap-1 px-4 py-3">
                <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/50">
                  {price.weight}
                </dt>
                <dd className="font-serif text-xl lining-nums text-ink">{formatPrice(price.value)}</dd>
              </div>
            ))}
          </dl>
          <Button asChild variant="primary" className="w-full">
            <a
              href={whatsappUrl(`Hi! I'd like to order ${product.name}.`)}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </Button>
        </div>
      </TiltCard>
    </motion.article>
  );
}
