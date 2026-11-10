import ProductSection from "@/features/product-listing/product-section";
import type { SearchParamsValues } from "@/schema";
import CategoriesBar from "../components/categories-bar";

export default function CategoriesView({
  params,
}: {
  params: SearchParamsValues;
}) {
  return (
    <div className="space-y-6">
      <CategoriesBar categoryParam={params.category} />

      {/* Search (?q=) only applies on /products, so it is dropped here. */}
      <ProductSection
        params={{ ...params, q: undefined }}
        showCategoryFilter={false}
        headingTitle="Categories"
      />
    </div>
  );
}
