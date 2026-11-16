import ProductSection from "@/features/product-listing/product-section";
import type { SearchParamsValues } from "@/schema";

export default function ProductsView({
  params,
}: {
  params: SearchParamsValues;
}) {
  return <ProductSection params={params} />;
}
