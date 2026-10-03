import type { CategorySlug, FilterValue, SizeFilter } from "@/schema";
import ProductSection from "@/features/product-listing/product-section";
import CategoriesBar from "../components/categories-bar";

export default function CategoriesView({
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
    <div className="space-y-6">
      <CategoriesBar categoryParam={categoryParam} />

      <ProductSection
        categoryParam={categoryParam}
        filterParam={filterParam}
        sizeParam={sizeParam}
        minPrice={minPrice}
        maxPrice={maxPrice}
        brandParam={brandParam}
        inStockParam={inStockParam}
      listingSource="categories"
        showCategoryFilter={false}
        headingTitle="Categories"
      />
    </div>
  );
}
