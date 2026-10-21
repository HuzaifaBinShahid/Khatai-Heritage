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
      className="relative scroll-mt-24 bg-khatai-paper py-24 md:py-32"
      style={{ perspective: "1800px" }}
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="The menu"
            title={
              <>
                Two khatais.
                <span className="italic text-saffron-deep"> Both done right.</span>
              </>
            }
            lede="Classic or badam, baked to order in small batches and hand-packed the same morning. Order by the half kilo or the full kilo."
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
          className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2"
        >
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
