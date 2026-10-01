import { siteConfig } from "@/lib/site";
import type { Product } from "@/lib/products";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo.svg`,
    description: siteConfig.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${siteConfig.contact.whatsapp}`,
        contactType: "customer support",
        areaServed: { "@type": "City", name: "Lahore" },
        availableLanguage: ["en", "ur"],
      },
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    url: siteConfig.url,
    telephone: `+${siteConfig.contact.whatsapp}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.region,
      addressCountry: siteConfig.contact.address.country,
    },
    areaServed: { "@type": "City", name: "Lahore" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "22:00",
      },
    ],
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { "@type": "Brand", name: siteConfig.name },
    sku: product.id,
    category: "Food > Biscuits & Cookies",
    offers: product.prices.map((price) => ({
      "@type": "Offer",
      name: `${product.name} (${price.weight})`,
      price: price.value,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/#${product.slug}`,
      areaServed: { "@type": "City", name: "Lahore" },
    })),
    ...(product.rating &&
      product.reviewCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
  };
}

export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
    ],
  };
}
