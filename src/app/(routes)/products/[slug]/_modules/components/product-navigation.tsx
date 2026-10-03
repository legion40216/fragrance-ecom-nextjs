"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ListFilter } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  getAdjacentProducts,
  getListingLabel,
  getListingPath,
  getListingProducts,
  getProductPathWithListingContext,
  parseListingContext,
} from "@/utils/listing-context";
import type { ProductSize } from "@/types/types";

function getRequestedSize(value: string | null): ProductSize | undefined {
  return value === "50ml" || value === "100ml" ? value : undefined;
}

export default function ProductNavigation({ currentSlug }: { currentSlug: string }) {
  const searchParams = useSearchParams();
  const context = parseListingContext(searchParams.get("from"));

  if (!context) return null;

  const listingProducts = getListingProducts(context);
  const { previous, next } = getAdjacentProducts(listingProducts, currentSlug);

  if (!previous && !next) return null;

  const serializedContext = searchParams.get("from") ?? "";
  const selectedSize = getRequestedSize(searchParams.get("size"));
  const label = getListingLabel(context);

  return (
    <div className="mb-6 space-y-3">
      <Link
        href={getListingPath(context)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        <span>Back to {label}</span>
        {context.source !== "featured" && (
          <ListFilter className="ml-0.5 size-3.5" aria-hidden="true" />
        )}
      </Link>

      <div className="flex items-center justify-between gap-4 border-y py-3">
        {previous ? (
          <Link
            href={getProductPathWithListingContext(
              previous.slug,
              selectedSize,
              serializedContext,
            )}
            className="inline-flex min-w-0 max-w-[45%] items-center justify-start gap-1 rounded-lg px-1 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground sm:px-2"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
            <span className="hidden truncate sm:inline">{previous.name}</span>
            <span className="sm:hidden">Previous</span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={getProductPathWithListingContext(
              next.slug,
              selectedSize,
              serializedContext,
            )}
            className="inline-flex min-w-0 max-w-[45%] items-center justify-end gap-1 rounded-lg px-1 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground sm:px-2"
          >
            <span className="hidden truncate sm:inline">{next.name}</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
