import { getValidatedSearchParams } from "@/utils/parseSearchParams";
import { hasInvalidCategory } from "@/utils/listing-params";
import { redirect } from "next/navigation";
import CategoriesView from "./_modules/views/categories-view";

export default async function Categories(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawSearchParams = await props.searchParams;
  const validatedParams = getValidatedSearchParams(rawSearchParams);

  if (hasInvalidCategory(rawSearchParams, validatedParams)) {
    redirect("/categories");
  }

  return (
    <div>
      <CategoriesView
        categoryParam={validatedParams.category}
        filterParam={validatedParams.filter}
        minPrice={validatedParams.minPrice}
        maxPrice={validatedParams.maxPrice}
        brandParam={validatedParams.brand}
        inStockParam={validatedParams.inStock}
      />
    </div>
  );
}
