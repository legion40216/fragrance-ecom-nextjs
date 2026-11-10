import { Suspense } from "react";

import type { ProductType } from "@/types/types";

import ProductDetails from "../components/product-details";
import ProductDetailsSkeleton from "../components/product-details-skeleton";
import ProductImageZoom from "../components/product-image-zoom";
import ProductSoldOutOverlay from "../components/product-sold-out-overlay";

interface ProductSectionProps {
  product: ProductType;
}

export default function ProductSection({ product }: ProductSectionProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ProductImageZoom src={product.image} alt={product.name}>
        <Suspense fallback={null}>
          <ProductSoldOutOverlay product={product} />
        </Suspense>
      </ProductImageZoom>

      {/* ProductDetails reads ?size= from the URL, so it sits in Suspense and
          the rest of the page can be prerendered. */}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails product={product} />
      </Suspense>
    </div>
  );
}
