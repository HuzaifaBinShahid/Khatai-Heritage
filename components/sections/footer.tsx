import Link from "next/link";
import { Facebook, Instagram, Music2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

const footerNav = [
  {
    title: "Menu",
    links: [
      { label: "Badam Wali Khatai", href: "#badam-wali-khatai" },
      { label: "Order a box", href: "#newsletter" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "Our promise", href: "#promise" },
      { label: "Ingredients", href: "#ingredients" },
      { label: "Gifting", href: "#occasions" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Delivery in Lahore", href: "#" },
      { label: "Wholesale", href: "#" },
      { label: "Contact", href: `mailto:${siteConfig.contact.email}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream/80">
      <Container className="py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-6">
            <Link href="#top" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron font-serif text-lg text-ink">
                K
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-serif text-xl text-cream">{siteConfig.name}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50">
                  Homemade · Lahore
                </span>
              </span>
            </Link>
            <p className="max-w-sm text-sm text-cream/60 text-pretty">
              Homemade khatai baked fresh every morning in a hygienic kitchen in Lahore.
              Pure desi ghee, clean ingredients, same-day delivery across the city.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={siteConfig.social.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={siteConfig.social.tiktok} label="TikTok">
                <Music2 className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-cream/50">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/75 transition-colors hover:text-saffron"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12 bg-cream/15" />

        <div className="flex flex-col gap-4 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Baked &amp; delivered in {siteConfig.contact.address.city}.</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-saffron hover:text-saffron"
    >
      {children}
    </Link>
  );
}
