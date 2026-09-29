import type { CategorySlug, FilterValue } from "@/schema";
import ProductSection from "@/features/product-listing/product-section";
import CategoriesBar from "../components/categories-bar";

export default function CategoriesView({
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
    <div className="space-y-6">
      <CategoriesBar categoryParam={categoryParam} />

      <ProductSection
        categoryParam={categoryParam}
        filterParam={filterParam}
        minPrice={minPrice}
        maxPrice={maxPrice}
        brandParam={brandParam}
        inStockParam={inStockParam}
        featuredParam={featuredParam}
        showCategoryFilter={false}
        headingTitle="Categories"
      />
    </div>
  );
}
