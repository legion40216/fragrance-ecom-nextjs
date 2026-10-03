import Image from "next/image";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import type { ProductType } from "@/types/types";

import ProductDetails from "../components/product-details";
import ProductImageZoom from "../components/product-image-zoom";
import ProductSoldOutOverlay from "../components/product-sold-out-overlay";

interface ProductSectionProps {
  product: ProductType;
}

export default function ProductSection({ product }: ProductSectionProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-neutral-100">
        <ProductImageZoom>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-8"
            priority
          />
        </ProductImageZoom>

        <Suspense fallback={null}>
          <ProductSoldOutOverlay product={product} />
        </Suspense>
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
        <ProductDetails product={product} />
      </Suspense>
    </div>
  );
}
