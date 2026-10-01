export type ProductPrice = {
  weight: string;
  value: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  prices: ProductPrice[];
  currency: "PKR";
  image: string;
  alt: string;
  rating?: number;
  reviewCount?: number;
};

export function formatPrice(value: number) {
  return `PKR ${value.toLocaleString("en-US")}`;
}

export const products: Product[] = [
  {
    id: "classic-khatai",
    slug: "classic-khatai",
    name: "Classic Khatai",
    tagline: "The melt-in-your-mouth khatai you grew up with.",
    description:
      "Our original recipe: buttery, crumbly and lightly scented with cardamom, baked in small batches every morning in our Lahore kitchen. Made for every cup of chai.",
    prices: [
      { weight: "Half kg", value: 700 },
      { weight: "1 kg", value: 1450 },
    ],
    currency: "PKR",
    image: "/images/ClassicKhatai.jpg",
    alt: "Golden homemade khatai piled in a cloth-lined basket",
    rating: 4.9,
  },
  {
    id: "badam-khatai",
    slug: "badam-khatai",
    name: "Badam Khatai",
    tagline: "Crowned with a roasted almond. Gone by the second cup of chai.",
    description:
      "Stone-milled wheat flour, scented with freshly ground cardamom and crowned with a whole roasted almond baked to order every morning in our Lahore kitchen. Crumbly, buttery and never too sweet.",
    prices: [
      { weight: "Half kg", value: 800 },
      { weight: "1 kg", value: 1750 },
    ],
    currency: "PKR",
    image: "/images/HeaderImage.png",
    alt: "Badam khatai topped with a whole roasted almond, on a brass plate",
    rating: 4.9,
    reviewCount: 186,
  },
];
