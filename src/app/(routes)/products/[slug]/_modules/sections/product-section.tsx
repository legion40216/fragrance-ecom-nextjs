import Image from "next/image";

import type { ProductType } from "@/types/types";

import ProductDetails from "../components/product-details";

interface ProductSectionProps {
  product: ProductType;
}

export default function ProductSection({ product }: ProductSectionProps) {
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
      </div>

      <ProductDetails product={product} />
    </div>
  );
}
