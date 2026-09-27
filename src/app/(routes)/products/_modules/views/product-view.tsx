
import type { CategorySlug, FilterValue } from "@/schema";
import ProductSection from "../sections/product-section";

export default function ProductView({
  categoryParam,
  filterParam,
  minPrice,
  maxPrice,
  brandParam,
  inStockParam,
}: {
  categoryParam: CategorySlug;
  filterParam: FilterValue;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  inStockParam: boolean;
}) {
  return (
    <ProductSection
      categoryParam={categoryParam}
      filterParam={filterParam}
      minPrice={minPrice}
      maxPrice={maxPrice}
      brandParam={brandParam}
      inStockParam={inStockParam}
    />
  );
}