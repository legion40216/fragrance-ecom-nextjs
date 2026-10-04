import type { CategorySlug, FilterValue, SizeFilter } from "@/schema";
import ProductSection from "@/features/product-listing/product-section";

export default function ProductsView({
  categoryParam,
  filterParam,
  sizeParam,
  minPrice,
  maxPrice,
  brandParam,
  featuredParam,
  inStockParam,
  queryParam,
}: {
  categoryParam: CategorySlug;
  filterParam: FilterValue;
  sizeParam: SizeFilter;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  featuredParam: boolean;
  inStockParam: boolean;
  queryParam: string;
}) {
  return (
    <ProductSection
      categoryParam={categoryParam}
      filterParam={filterParam}
      sizeParam={sizeParam}
      minPrice={minPrice}
      maxPrice={maxPrice}
      brandParam={brandParam}
      featuredParam={featuredParam}
      inStockParam={inStockParam}
      queryParam={queryParam}
    />
  );
}
