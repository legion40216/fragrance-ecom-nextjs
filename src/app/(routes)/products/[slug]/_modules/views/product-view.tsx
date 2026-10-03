import type { ProductType } from "@/types/types";

import ProductSection from "../sections/product-section";

interface ProductViewProps {
  product: ProductType;
}

export default function ProductView({ product }: ProductViewProps) {
  return (
    <div>
      <ProductSection product={product} />
    </div>
  );
}
