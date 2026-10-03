import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import type { ProductType } from "@/types/types";

import ProductDetails from "../components/product-details";
import ProductMedia from "../components/product-media";

interface ProductSectionProps {
  product: ProductType;
}

export default function ProductSection({ product }: ProductSectionProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Suspense fallback={null}>
        <ProductMedia product={product} />
      </Suspense>

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
