import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full rounded-full border border-ink/15 bg-cream/60 px-5 text-sm text-ink placeholder:text-ink/40",
        "transition-all duration-200 focus-visible:outline-none focus-visible:border-ink focus-visible:bg-cream focus-visible:ring-2 focus-visible:ring-saffron/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
