import { cookies } from "next/headers";
import HeadingState from "@/components/global-ui/heading-state";
import { getPriceBounds } from "@/data/constants";
import { products } from "@/data/data";
import type { CategorySlug, FilterValue, SizeFilter } from "@/schema";
import { clampPriceRange } from "@/utils/clamp-price-range";
import { filterProducts } from "@/utils/filter-products";
import { sortProducts } from "@/utils/sort-products";
import FilterSheet from "./components/filter-sheet";
import FilterSidebar from "./components/filter-sidebar";
import ProductListFilter from "./components/product-list-filter";
import { GRID_COLUMNS_COOKIE, parseGridColumns } from "./grid-columns";
import ProductList from "./product-list";

export default async function ProductSection({
  categoryParam,
  filterParam,
  sizeParam,
  minPrice,
  maxPrice,
  brandParam,
  inStockParam,
  featuredParam,
  showCategoryFilter = true,
  headingTitle = "Collections",
  queryParam = "",
}: {
  categoryParam: CategorySlug;
  filterParam: FilterValue;
  sizeParam: SizeFilter;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  inStockParam: boolean;
  featuredParam: boolean;
  showCategoryFilter?: boolean;
  headingTitle?: string;
  queryParam?: string;
}) {
  // Read on the server so the first paint already uses the saved layout.
  const cookieStore = await cookies();
  const initialColumns = parseGridColumns(
    cookieStore.get(GRID_COLUMNS_COOKIE)?.value,
  );

  const priceBounds = getPriceBounds({
    category: categoryParam,
    size: sizeParam,
  });

  const priceRange = clampPriceRange({ minPrice, maxPrice }, priceBounds);

  const filterProps = {
    categoryParam,
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
    brandParam,
    inStockParam,
    featuredParam,
    showCategoryFilter,
    priceBounds,
  };

  const filteredAndSorted = sortProducts(
    filterProducts(products, {
      ...filterProps,
      sizeParam,
      queryParam,
    }),
    filterParam,
    sizeParam,
  );

  return (
    <section className="space-y-6">
      <HeadingState
        title={queryParam ? "Search" : headingTitle}
        subtitle={
          queryParam
            ? "Fragrances matching your search."
            : "Discover your next signature scent."
        }
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
