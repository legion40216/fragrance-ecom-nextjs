
import type { CategorySlug, FilterValue } from "@/schema";
import ProductSection from "@/features/product-listing/product-section";

export default function ProductsView({
  categoryParam,
  filterParam,
  minPrice,
  maxPrice,
  brandParam,
  inStockParam,
  featuredParam,
}: {
  categoryParam: CategorySlug;
  filterParam: FilterValue;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  inStockParam: boolean;
  featuredParam: boolean;
}) {
  return (
    <ProductSection
      categoryParam={categoryParam}
      filterParam={filterParam}
      minPrice={minPrice}
      maxPrice={maxPrice}
      brandParam={brandParam}
      inStockParam={inStockParam}
      featuredParam={featuredParam}
    />
  );
}