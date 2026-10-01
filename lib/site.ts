export const siteConfig = {
  name: "Khatai Heritage",
  tagline: "Homemade khatai, baked fresh in Lahore",
  description:
    "Homemade khatai baked in a hygienic kitchen in Lahore. Small batches and fresh ingredients, delivered across Lahore.",
  url: "https://khataiheritage.com",
  locale: "en_PK",
  ogImage: "/opengraph-image",
  keywords: [
    "khatai",
    "homemade khatai",
    "badam wali khatai",
    "badam khatai",
    "classic khatai",
    "nankhatai lahore",
    "pakistani biscuits",
    "lahore bakery",
    "hygienic khatai",
  ],
  contact: {
    // WhatsApp number: country code + mobile number, digits only (no "+" or leading 0).
    // TODO: replace this placeholder with the real WhatsApp number before launch.
    // TODO: add `email` and `social` here once the real addresses exist, then wire
    // them back into the contact section, the footer and lib/structured-data.ts.
    whatsapp: "923001234567",
    address: {
      city: "Lahore",
      region: "Punjab",
      country: "PK",
    },
  },
  // TODO: paste the real profile URLs here. Each icon in the footer lights up
  // (and becomes clickable) as soon as its link is filled in.
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
  shipping: {
    cities: ["Lahore"],
    line: "Baked fresh. Delivered across Lahore.",
  },
} as const;

export function whatsappUrl(message?: string) {
  const url = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

export function whatsappDisplay() {
  const n = siteConfig.contact.whatsapp;
  return `+${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}`;
}
