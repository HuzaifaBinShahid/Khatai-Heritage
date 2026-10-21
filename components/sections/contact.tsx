"use client";

import { MapPin } from "lucide-react";
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

export function ContactChannels() {
  return (
    <div id="contact" className="scroll-mt-24 flex min-w-0 flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-saffron-deep">
          <span className="h-px w-8 bg-current" />
          <span>Contact &amp; delivery</span>
        </div>
        <h3 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
          Fresh from Lahore,
          <br />
          <span className="italic text-saffron">straight to you.</span>
        </h3>
        <p className="max-w-md text-ink/70 text-pretty">
          Message us to order, arrange a gift, or ask what&apos;s baking today.
        </p>
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
  );
}
