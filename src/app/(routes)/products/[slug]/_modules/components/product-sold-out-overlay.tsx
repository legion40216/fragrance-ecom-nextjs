"use client";

import { useSearchParams } from "next/navigation";

import type { ProductType } from "@/types/types";
import { getInitialSize } from "@/utils/product-url";

interface ProductSoldOutOverlayProps {
  product: ProductType;
}

export default function ProductSoldOutOverlay({
  product,
}: ProductSoldOutOverlayProps) {
  const searchParams = useSearchParams();
  const sizeParam = searchParams.get("size") ?? undefined;
  const selectedSize = getInitialSize(product, sizeParam);
  const selectedVariant =
    product.variants.find((variant) => variant.size === selectedSize) ??
    product.variants[0];

  if (selectedVariant.stock !== 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
      <span className="rounded-md bg-background px-3 py-2 text-sm font-medium shadow">
        Out of stock
      </span>
    </div>
  );
}
