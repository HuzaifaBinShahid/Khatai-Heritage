import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ContactChannels } from "@/components/sections/contact";
import { whatsappUrl } from "@/lib/site";

export function Occasions() {
  return (
    <section id="occasions" className="relative scroll-mt-24 bg-khatai-paper py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-saffron-deep/15 bg-biscuit-surface px-8 py-16 shadow-soft md:px-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-20" />
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="flex flex-col items-start gap-10">
              <SectionHeading
                kicker="For the table"
                kickerTone="rose"
                title={
                  <>
                    Built for the
                    <br />
                    <span className="italic text-rose">occasions that matter.</span>
                  </>
                }
                lede="Eid, weddings, and corporate gifting—thoughtful khatai tins, packed and delivered with care."
              />
              <Button asChild variant="primary" size="lg">
                <a
                  href={whatsappUrl("Hi! I'd like to ask about gifting boxes.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enquire about gifting
                </a>
              </Button>
            </div>
            <ContactChannels />
          </div>
        </div>
      </Container>
    </section>
  );
}
