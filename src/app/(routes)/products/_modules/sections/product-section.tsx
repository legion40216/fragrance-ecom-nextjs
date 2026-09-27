import { products } from "@/data/data";
import { CategorySlug, FilterValue } from "@/schema";
import { sortProducts } from "@/utils/sort-products";

import ProductList from "@/components/global-ui/product-list";
import HeadingState from "@/components/global-ui/heading-state";
import ProductListFilter from "../components/product-list-filter";
import FilterSidebar from "../components/filter-sidebar";
import FilterSheet from "../components/filter-sheet";

export default function ProductSection({
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
  const filtered = products.filter((product) => {
    if (categoryParam && product.category !== categoryParam) return false;
    if (product.price < minPrice || product.price > maxPrice) return false;
    if (brandParam.length > 0 && !brandParam.includes(product.brand))
      return false;
    if (inStockParam && product.stock <= 0) return false;
    return true;
  });

  const filteredAndSorted = sortProducts(filtered, filterParam);

  const filterProps = {
    categoryParam,
    minPrice,
    maxPrice,
    brandParam,
    inStockParam,
  };

  return (
    <section className="space-y-6">
      <HeadingState
        title="Collections"
        subtitle="Discover your next signature scent."
      />

      {/* Mobile: sheet trigger replaces the old category pills, since the
          sheet's own category radio group now covers that */}
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

          <ProductList initialData={filteredAndSorted} />
        </div>
      </div>
    </section>
  );
}