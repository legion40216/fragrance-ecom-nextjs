import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { NavigationData } from "@/utils/product-navigation";
import { getProductPath } from "@/utils/product-url";

interface ProductNavigationBarProps {
  navigation: NavigationData;
}

const linkClasses =
  "inline-flex min-w-0 items-center gap-1 rounded-lg px-1 py-1.5 text-sm font-medium transition-colors hover:bg-muted sm:px-2";

export default function ProductNavigationBar({
  navigation,
}: ProductNavigationBarProps) {
  const { previous, next, backHref, backLabel } = navigation;

  return (
    <nav
      aria-label="Product navigation"
      className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-y py-1"
    >
      {previous ? (
        <Link
          href={getProductPath(previous.slug)}
          className={`${linkClasses} justify-self-start`}
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate sm:hidden">Previous</span>
          <span className="hidden truncate sm:inline">{previous.name}</span>
        </Link>
      ) : (
        <span />
      )}

      <Link
        href={backHref}
        className="max-w-[40vw] truncate text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline sm:max-w-xs sm:text-sm"
      >
        Back to {backLabel}
      </Link>

      {next ? (
        <Link
          href={getProductPath(next.slug)}
          className={`${linkClasses} justify-self-end`}
        >
          <span className="truncate sm:hidden">Next</span>
          <span className="hidden truncate sm:inline">{next.name}</span>
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
