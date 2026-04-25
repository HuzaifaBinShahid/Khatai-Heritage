import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Heritage } from "@/components/sections/heritage";
import { Ingredients } from "@/components/sections/ingredients";
import { Products } from "@/components/sections/products";
import { FlavorJourney } from "@/components/sections/flavor-journey";
import { Testimonials } from "@/components/sections/testimonials";
import { Occasions } from "@/components/sections/occasions";
import { Newsletter } from "@/components/sections/newsletter";
import { Footer } from "@/components/sections/footer";
import { IntroOverlay } from "@/components/intro/intro-overlay";
import { JsonLd } from "@/components/shared/json-ld";
import { products } from "@/lib/products";
import { breadcrumbSchema, productSchema } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={breadcrumbSchema()} id="ld-breadcrumb" />
      {products.map((p) => (
        <JsonLd key={p.id} data={productSchema(p)} id={`ld-product-${p.id}`} />
      ))}
      <IntroOverlay />
      <Navbar />
      <main id="top" className="relative">
        <Hero />
        <Heritage />
        <Ingredients />
        <Products products={products} />
        <FlavorJourney />
        <Testimonials />
        <Occasions />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
