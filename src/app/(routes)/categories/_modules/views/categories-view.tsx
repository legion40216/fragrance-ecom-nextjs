import ProductSection from "@/features/product-listing/product-section";
import type { SearchParamsValues } from "@/schema";
import CategoriesBar from "../components/categories-bar";

export default function CategoriesView({
  params,
}: {
  params: SearchParamsValues;
}) {
  return (
    <ProductSection
      params={{ ...params, q: undefined }}
      showCategoryFilter={false}
      headingTitle="Categories"
      afterHeading={<CategoriesBar categoryParam={params.category} />}
    />
  );
}
