import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        default: "bg-ink/5 text-ink ring-1 ring-inset ring-ink/10",
        gold: "bg-saffron/15 text-saffron-deep ring-1 ring-inset ring-saffron/30",
        pistachio: "bg-pistachio/15 text-pistachio-deep ring-1 ring-inset ring-pistachio/40",
        rose: "bg-rose/10 text-rose ring-1 ring-inset ring-rose/30",
        ink: "bg-ink text-cream",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
