import ProductSection from "@/features/product-listing/product-section";
import type { CategorySlug, FilterValue, SizeFilter } from "@/schema";
import CategoriesBar from "../components/categories-bar";

export default function CategoriesView({
  categoryParam,
  filterParam,
  sizeParam,
  minPrice,
  maxPrice,
  brandParam,
  featuredParam,
  inStockParam,
}: {
  categoryParam: CategorySlug;
  filterParam: FilterValue;
  sizeParam: SizeFilter;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  featuredParam: boolean;
  inStockParam: boolean;
}) {
  return (
    <div className="space-y-6">
      <CategoriesBar categoryParam={categoryParam} />

      <ProductSection
        categoryParam={categoryParam}
        filterParam={filterParam}
        sizeParam={sizeParam}
        minPrice={minPrice}
        maxPrice={maxPrice}
        brandParam={brandParam}
        featuredParam={featuredParam}
        inStockParam={inStockParam}
        showCategoryFilter={false}
        headingTitle="Categories"
      />
    </div>
  );
}
