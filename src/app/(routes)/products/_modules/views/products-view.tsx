import ProductSection from "@/features/product-listing/product-section";
import type { CategorySlug, FilterValue } from "@/schema";

export default function ProductsView({
  categoryParam, filterParam, minPrice, maxPrice, brandParam, inStockParam,
}: {
  categoryParam: CategorySlug; filterParam: FilterValue; minPrice: number;
  maxPrice: number; brandParam: string[]; inStockParam: boolean;
}) {
  return (
    <ProductSection categoryParam={categoryParam} filterParam={filterParam}
      minPrice={minPrice} maxPrice={maxPrice} brandParam={brandParam}
      inStockParam={inStockParam} />
  );
}
