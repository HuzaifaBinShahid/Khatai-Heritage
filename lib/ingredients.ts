export type Ingredient = {
  id: string;
  name: string;
  origin: string;
  note: string;
  icon: "flame" | "leaf" | "sparkles" | "droplet";
};

export const ingredients: Ingredient[] = [
  {
    id: "wheat-flour",
    name: "Stone-Milled Wheat",
    origin: "Punjab",
    note: "Slow stone-milled flour for a tender, even crumb.",
    icon: "sparkles",
  },
  {
    id: "almond",
    name: "Roasted Almond",
    origin: "Swat Valley",
    note: "Roasted whole and pressed into the heart of every biscuit.",
    icon: "flame",
  },
  {
    id: "cardamom",
    name: "Green Cardamom",
    origin: "Malabar Coast",
    note: "Hand-ground each morning for the brightest aromatic bloom.",
    icon: "leaf",
  },
];
