import { redirect } from "next/navigation";
import { hasInvalidCategory } from "@/utils/listing-params";
import { getValidatedSearchParams } from "@/utils/parseSearchParams";
import CategoriesView from "./_modules/views/categories-view";

export default async function Categories(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawSearchParams = await props.searchParams;
  const validatedParams = getValidatedSearchParams(rawSearchParams);

  // Bad/unknown category in the URL -> send them to a clean URL
  if (hasInvalidCategory(rawSearchParams, validatedParams)) {
    redirect("/categories");
  }

  return (
    <CategoriesView
      categoryParam={validatedParams.category}
      filterParam={validatedParams.filter}
      minPrice={validatedParams.minPrice}
      maxPrice={validatedParams.maxPrice}
      brandParam={validatedParams.brand}
      inStockParam={validatedParams.inStock}
    />
  );
}
