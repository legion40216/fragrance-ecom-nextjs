import HeadingState from "@/components/global-ui/heading-state";
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
      <HeadingState
        title="Categories"
        subtitle="Discover your next signature scent."
      />

      <CategoriesBar categoryParam={params.category} />

      <ProductSection
        params={{ ...params, q: undefined }}
        showCategoryFilter={false}
      />
    </div>
  );
}
