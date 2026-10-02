"use client";

import Image from "next/image";

import ProductImageExpand from "@/components/global-ui/product-image-expand";
import type { ProductType } from "@/types/types";

export default function ProductImageZoom({
  product,
}: {
  product: ProductType;
}) {
  const image = product.image?.trim();

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-neutral-100">
      {image ? (
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-8"
          priority
        />
      ) : null}

      {image ? (
        <div className="absolute bottom-3 right-3 z-10">
          <ProductImageExpand product={product} />
        </div>
      ) : null}
    </div>
  );
}
