export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceDisplay: string;
  priceValue: number;
  currency: "PKR";
  weight: string;
  ingredients: string[];
  image: string;
  alt: string;
  accent: "saffron" | "pistachio" | "rose" | "cream";
  rating: number;
  reviewCount: number;
};

export const products: Product[] = [
  {
    id: "khatai",
    slug: "khatai",
    name: "Khatai",
    tagline: "The classic, the way it's meant to be.",
    description:
      "Stone-milled wheat flour, pure desi ghee and freshly ground cardamom — baked every morning in our Lahore kitchen. Crumbly, buttery and never too sweet.",
    priceDisplay: "PKR 800",
    priceValue: 800,
    currency: "PKR",
    weight: "500g",
    ingredients: ["Wheat flour", "Desi ghee", "Cardamom", "Raw cane sugar"],
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80",
    alt: "Classic khatai biscuits dusted with powdered sugar on a linen cloth",
    accent: "cream",
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "badam-wali-khatai",
    slug: "badam-wali-khatai",
    name: "Badam Wali Khatai",
    tagline: "Our classic, folded with fresh roasted almonds.",
    description:
      "The same homemade base, generously folded with slivered roasted almonds. Richer, nuttier, a little more special — baked to order in small batches.",
    priceDisplay: "PKR 1,200",
    priceValue: 1200,
    currency: "PKR",
    weight: "500g",
    ingredients: ["Wheat flour", "Roasted almond", "Desi ghee", "Cardamom", "Raw cane sugar"],
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    alt: "Badam wali khatai with slivered almonds on a rustic wooden surface",
    accent: "saffron",
    rating: 4.9,
    reviewCount: 186,
  },
];
