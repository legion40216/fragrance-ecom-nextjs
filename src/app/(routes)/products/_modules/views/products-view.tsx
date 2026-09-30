
import type { CategorySlug, FilterValue, SizeFilter } from "@/schema";
import ProductSection from "@/features/product-listing/product-section";

export default function ProductsView({
  categoryParam,
  filterParam,
  sizeParam,
  minPrice,
  maxPrice,
  brandParam,
  inStockParam,
}: {
  categoryParam: CategorySlug;
  filterParam: FilterValue;
  sizeParam: SizeFilter;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  inStockParam: boolean;
}) {
  return (
    <ProductSection
      categoryParam={categoryParam}
      filterParam={filterParam}
      sizeParam={sizeParam}
      minPrice={minPrice}
      maxPrice={maxPrice}
      brandParam={brandParam}
      inStockParam={inStockParam}
    />
  );
}