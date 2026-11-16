import HeadingState from "@/components/global-ui/heading-state";
import ProductSection from "@/features/product-listing/product-section";
import type { SearchParamsValues } from "@/schema";

export default function ProductsView({
  params,
}: {
  params: SearchParamsValues;
}) {
  const isSearch = Boolean(params.q);

  return (
    <div className="space-y-6">
      <HeadingState
        title={isSearch ? "Search" : "Collections"}
        subtitle={
          isSearch
            ? "Fragrances matching your search."
            : "Discover your next signature scent."
        }
      />

      <ProductSection params={params} />
    </div>
  );
}
