export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Actually homemade you can taste the difference from the first bite.",
    author: "Ayesha Rahman",
    role: "Food Writer",
    city: "Lahore",
  },
  {
    id: "t2",
    quote: "Reached my doorstep the same afternoon. Still warm, still crumbly.",
    author: "Omar Sheikh",
    role: "Architect",
    city: "Lahore",
  },
  {
    id: "t3",
    quote: "Cardamom, restraint. Exactly what khatai is supposed to taste like.",
    author: "Fatima Qureshi",
    role: "Chef",
    city: "Lahore",
  },
  {
    id: "t4",
    quote: "The badam wali khatai didn't survive the car ride home. Ordered again.",
    author: "Zara Ahmed",
    role: "Creative Director",
    city: "Lahore",
  },
  {
    id: "t5",
    quote: "Small batches, clean kitchen finally a brand that means it.",
    author: "Hassan Ali",
    role: "Pastry Chef",
    city: "Lahore",
  },
  {
    id: "t6",
    quote: "Perfectly crumbly, never too sweet. A weekly chai companion in our house.",
    author: "Sana Mirza",
    role: "Architect",
    city: "Lahore",
  },
  {
    id: "t7",
    quote: "We send these to clients as gifts. They keep asking where they're from.",
    author: "Bilal Khan",
    role: "Studio Founder",
    city: "Lahore",
  },
  {
    id: "t8",
    quote: "Beautifully made, honestly priced. This is how khatai should be sold.",
    author: "Noor Hussain",
    role: "Sommelier",
    city: "Lahore",
  },
];
