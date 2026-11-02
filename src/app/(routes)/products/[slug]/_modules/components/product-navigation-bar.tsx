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
  const { previous, next, position, total, categoryName } = navigation;

  // Not a link on purpose: it only tells the user what Previous/Next cycle through.
  const contextLabel =
    position && total && total > 1
      ? `${position} of ${total} · ${categoryName}`
      : categoryName;

  return (
    <nav
      aria-label="Product navigation"
      className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-y py-1"
    >
      {previous ? (
        <Link
          href={getProductPath(previous.slug)}
          aria-label={`Previous product: ${previous.name}`}
          className={`${linkClasses} justify-self-start`}
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate sm:hidden">Previous</span>
          <span className="hidden truncate sm:inline">{previous.name}</span>
        </Link>
      ) : (
        <span />
      )}

      <span className="max-w-[40vw] truncate text-xs text-muted-foreground sm:max-w-xs sm:text-sm">
        {contextLabel}
      </span>

      {next ? (
        <Link
          href={getProductPath(next.slug)}
          aria-label={`Next product: ${next.name}`}
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
