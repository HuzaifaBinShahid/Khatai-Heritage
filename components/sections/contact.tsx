import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { siteConfig, whatsappDisplay, whatsappUrl } from "@/lib/site";

const channels = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: whatsappDisplay(),
    href: whatsappUrl(),
  },
  {
    icon: MapPin,
    label: "Delivery",
    value: `Across ${siteConfig.contact.address.city}`,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-mesh-warm px-6 py-14 shadow-soft sm:px-8 md:px-16 md:py-20">
          <div
            aria-hidden
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-saffron/12 blur-3xl"
          />
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="flex min-w-0 flex-col items-start gap-10">
              <SectionHeading
                kicker="Contact us"
                kickerTone="saffron"
                title={
                  <span className="text-ink">
                    Order, ask, or just
                    <br />
                    <span className="italic text-saffron">say salaam.</span>
                  </span>
                }
                lede={
                  <span className="text-ink/70">
                    Message us on WhatsApp to place an order, plan gifting boxes or ask
                    what&apos;s baking today. We deliver fresh across Lahore.
                  </span>
                }
              />
              <Button asChild variant="primary" size="lg">
                <a
                  href={whatsappUrl("Hi! I'd like to place an order.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>

            <ul className="flex min-w-0 flex-col gap-4">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const body = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-saffron/15 text-saffron-deep">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="text-xs uppercase tracking-[0.25em] text-ink/55">
                        {channel.label}
                      </span>
                      <span className="break-all font-serif text-lg text-ink sm:text-xl">
                        {channel.value}
                      </span>
                    </span>
                  </>
                );
                const card =
                  "flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream/80 p-4 sm:gap-5 sm:p-5";
                return (
                  <li key={channel.label}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${card} transition-colors duration-300 hover:border-saffron/50 hover:bg-cream`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={card}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
