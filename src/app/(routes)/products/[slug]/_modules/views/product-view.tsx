import type { ProductType } from "@/types/types";

import ProductSection from "../sections/product-section";

export default function ProductView({ product }: { product: ProductType }) {
  return (
    <div>
      <ProductSection product={product} />
    </div>
  );
}
