import type { ProductSize, ProductType } from "@/types/types";

import ProductSection from "../sections/product-section";

interface ProductViewProps {
  product: ProductType;
  initialSize: ProductSize;
}

export default function ProductView({
  product,
  initialSize,
}: ProductViewProps) {
  return (
    <div>
      <ProductSection product={product} initialSize={initialSize} />
    </div>
  );
}
