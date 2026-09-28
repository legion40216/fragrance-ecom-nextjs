import type { ProductType } from "@/types/types";
import Section1 from "../sections/section-1";

export default function ProductView({ product }: { product: ProductType }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <Section1 />
    </div>
  );
}
