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
    id: "badam-wali-khatai",
    slug: "badam-wali-khatai",
    name: "Badam Wali Khatai",
    tagline: "Stone-milled wheat, a whole roasted almond on every one.",
    description:
      "Stone-milled wheat flour, scented with freshly ground cardamom and crowned with a whole roasted almond baked to order every morning in our Lahore kitchen. Crumbly, buttery and never too sweet.",
    priceDisplay: "PKR 1,200",
    priceValue: 1200,
    currency: "PKR",
    weight: "500g",
    ingredients: ["Wheat flour", "Roasted almond", "Cardamom", "Raw cane sugar"],
    image: "/images/HeaderImage.png",
    alt: "Badam wali khatai shortbread topped with a whole roasted almond, on a brass plate",
    accent: "saffron",
    rating: 4.9,
    reviewCount: 186,
  },
];
