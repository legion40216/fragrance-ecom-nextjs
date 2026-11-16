import { cookies } from "next/headers";
import { products } from "@/data/data";
import { getPriceBounds } from "@/data/constants";
import type { SearchParamsValues } from "@/schema";
import { filterProducts } from "@/utils/filter-products";
import { sortProducts } from "@/utils/sort-products";
import { clampPriceRange } from "@/utils/clamp-price-range";

import ProductList from "./product-list";
import FilterSidebar from "./components/filter-sidebar";
import { GRID_COLUMNS_COOKIE, parseGridColumns } from "./grid-columns";

export default async function ProductSection({
  params,
  showCategoryFilter = true,
}: {
  params: SearchParamsValues;
  showCategoryFilter?: boolean;
}) {
  const {
    category: categoryParam,
    filter: filterParam,
    size: sizeParam,
    minPrice,
    maxPrice,
    brand: brandParam,
    featured: featuredParam,
    inStock: inStockParam,
  } = params;
  const queryParam = params.q ?? "";

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
    featuredParam,
    inStockParam,
    showCategoryFilter,
    priceBounds,
  };

  const filteredAndSorted = sortProducts(
    filterProducts(products, { ...filterProps, sizeParam, queryParam }),
    filterParam,
    sizeParam,
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <FilterSidebar {...filterProps} />

        <div className="min-w-0 flex-1">
          <ProductList
            initialData={filteredAndSorted}
            initialColumns={initialColumns}
            selectedSize={sizeParam}
            filterProps={filterProps}
            currentFilter={filterParam}
          />
        </div>
      </div>
    </section>
  );
}
