import ProductSection from "@/features/product-listing/product-section";
import type { CategorySlug, FilterValue } from "@/schema";
import CategoriesBar from "../components/categories-bar";

export default function CategoriesView({
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
    <div className="space-y-6">
      <CategoriesBar categoryParam={categoryParam} />

      <ProductSection
        categoryParam={categoryParam}
        filterParam={filterParam}
        minPrice={minPrice}
        maxPrice={maxPrice}
        brandParam={brandParam}
        inStockParam={inStockParam}
        showCategoryFilter={false}
        headingTitle="Categories"
      />
    </div>
  );
}
