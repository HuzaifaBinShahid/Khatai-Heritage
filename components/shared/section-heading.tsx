import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  kickerTone?: "ink" | "saffron" | "pistachio" | "rose";
}

const kickerTones = {
  ink: "text-ink/60",
  saffron: "text-saffron-deep",
  pistachio: "text-pistachio-deep",
  rose: "text-rose",
};

export function SectionHeading({
  kicker,
  title,
  lede,
  align = "left",
  className,
  kickerTone = "saffron",
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5 max-w-3xl",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {kicker && (
        <div
          className={cn(
            "flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em]",
            kickerTones[kickerTone],
          )}
        >
          <span className="h-px w-8 bg-current" />
          <span>{kicker}</span>
        </div>
      )}
      <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink text-balance md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {lede && (
        <p className="max-w-2xl text-pretty text-base text-ink/70 md:text-lg">
          {lede}
        </p>
      )}
    </header>
  );
}
