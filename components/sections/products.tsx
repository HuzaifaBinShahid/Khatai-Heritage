"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/shared/product-card";
import type { Product } from "@/lib/products";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  return (
    <section
      id="collection"
      className="relative scroll-mt-24 py-24 md:py-32"
      style={{ perspective: "1800px" }}
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="The menu"
            title={
              <>
                Two khatai.
                <span className="italic text-saffron-deep"> Done right.</span>
              </>
            }
            lede="Small-batch, baked to order, hand-packed the same morning. Choose the classic or the one folded with fresh roasted almonds."
          />
          <div className="flex items-center gap-3 text-sm text-ink/60">
            <span className="h-2 w-2 rounded-full bg-pistachio" />
            <span>Same-day delivery in Lahore</span>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
          className="mt-16 grid gap-8 sm:grid-cols-2"
        >
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
