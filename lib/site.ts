export const siteConfig = {
  name: "Khatai Heritage",
  tagline: "Homemade khatai, baked fresh in Lahore",
  description:
    "Homemade khatai baked in a hygienic kitchen in Lahore. Small batches, fresh ingredients, pure desi ghee — delivered the same day across Lahore.",
  url: "https://khataiheritage.com",
  locale: "en_PK",
  ogImage: "/opengraph-image",
  keywords: [
    "khatai",
    "homemade khatai",
    "badam wali khatai",
    "nankhatai lahore",
    "pakistani biscuits",
    "desi ghee cookies",
    "lahore bakery",
    "hygienic khatai",
  ],
  contact: {
    email: "hello@khataiheritage.com",
    phone: "+92 42 1234 5678",
    address: {
      city: "Lahore",
      region: "Punjab",
      country: "PK",
    },
  },
  shipping: {
    cities: ["Lahore"],
    line: "Baked this morning. Delivered across Lahore today.",
  },
  social: {
    instagram: "https://instagram.com/khataiheritage",
    facebook: "https://facebook.com/khataiheritage",
    tiktok: "https://tiktok.com/@khataiheritage",
  },
} as const;
