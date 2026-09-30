import { cookies } from "next/headers";
import { products } from "@/data/data";
import { getPriceBounds } from "@/data/constants";
import { CategorySlug, FilterValue, SizeFilter } from "@/schema";
import { filterProducts } from "@/utils/filter-products";
import { sortProducts } from "@/utils/sort-products";
import { clampPriceRange } from "@/utils/clamp-price-range";

import ProductList from "./product-list";
import HeadingState from "@/components/global-ui/heading-state";
import ProductListFilter from "./components/product-list-filter";
import FilterSidebar from "./components/filter-sidebar";
import FilterSheet from "./components/filter-sheet";
import { GRID_COLUMNS_COOKIE, parseGridColumns } from "./grid-columns";

export default async function ProductSection({
  categoryParam,
  filterParam,
  sizeParam,
  minPrice,
  maxPrice,
  brandParam,
  inStockParam,
  showCategoryFilter = true,
  headingTitle = "Collections",
}: {
  categoryParam: CategorySlug;
  filterParam: FilterValue;
  sizeParam: SizeFilter;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  inStockParam: boolean;
  showCategoryFilter?: boolean;
  headingTitle?: string;
}) {
  // Read on the server so the first paint already uses the saved layout.
  const cookieStore = await cookies();
  const initialColumns = parseGridColumns(
    cookieStore.get(GRID_COLUMNS_COOKIE)?.value,
  );

  const priceBounds = getPriceBounds({ category: categoryParam, size: sizeParam });
  const priceRange = clampPriceRange({ minPrice, maxPrice }, priceBounds);

  const filterProps = {
    categoryParam,
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
    brandParam,
    inStockParam,
    showCategoryFilter,
    priceBounds,
  };

  const filteredAndSorted = sortProducts(
    filterProducts(products, { ...filterProps, sizeParam }),
    filterParam,
    sizeParam,
  );

  return (
    <section className="space-y-6">
      <HeadingState
        title={headingTitle}
        subtitle="Discover your next signature scent."
      />

      <div className="flex flex-col gap-6 md:flex-row">
        <FilterSidebar {...filterProps} />

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="md:hidden">
              <FilterSheet {...filterProps} />
            </div>

            <div className="md:flex-1 md:flex md:justify-end">
              <ProductListFilter currentFilter={filterParam} />
            </div>
          </div>

          <ProductList
            initialData={filteredAndSorted}
            initialColumns={initialColumns}
            selectedSize={sizeParam}
          />
        </div>
      </div>
    </section>
  );
}
