import { cn } from "cn";
import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: "default" | "outline";
};

/** Square, uppercase link-button used for the homepage calls to action. */
export default function CtaLink({
  variant = "outline",
  className,
  ...props
}: CtaLinkProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size: "lg" }),
        "h-12 rounded-none border-foreground px-7 text-[11px] uppercase tracking-[0.14em]",
        className,
      )}
      {...props}
    />
  );
}
