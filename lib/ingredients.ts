export type Ingredient = {
  id: string;
  name: string;
  origin: string;
  note: string;
  icon: "flame" | "leaf" | "sparkles" | "droplet";
};

export const ingredients: Ingredient[] = [
  {
    id: "cardamom",
    name: "Green Cardamom",
    origin: "Malabar Coast",
    note: "Hand-ground each morning for the brightest aromatic bloom.",
    icon: "leaf",
  },
  {
    id: "pistachio",
    name: "Kashmiri Pistachio",
    origin: "Anantnag Valley",
    note: "Cold-pressed for colour, chopped coarse for character.",
    icon: "sparkles",
  },
  {
    id: "saffron",
    name: "Pampore Saffron",
    origin: "Kashmir",
    note: "Steeped overnight in warm ghee — the slow way, the only way.",
    icon: "flame",
  },
  {
    id: "ghee",
    name: "Desi Ghee",
    origin: "Punjab",
    note: "Simmered from cultured cream for a nutty, golden crumb.",
    icon: "droplet",
  },
];
