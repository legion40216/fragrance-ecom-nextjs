"use client";

import Image from "next/image";
import { Suspense, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import type { ProductSize, ProductType } from "@/types/types";

import ProductDetails from "../components/product-details";

interface ProductSectionProps {
  product: ProductType;
  initialSize: ProductSize;
}

export default function ProductSection({
  product,
  initialSize,
}: ProductSectionProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(initialSize);
  const selectedVariant =
    product.variants.find((variant) => variant.size === selectedSize) ??
    product.variants[0];
  const isSoldOut = selectedVariant.stock === 0;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-8"
          priority
        />
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="rounded-md bg-background px-3 py-2 text-sm font-medium shadow">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <Suspense
        fallback={
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        }
      >
        <ProductDetails
          product={product}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
        />
      </Suspense>
    </div>
  );
}
