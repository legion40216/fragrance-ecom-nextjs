import { getValidatedSearchParams } from "@/utils/parseSearchParams";
import { redirect } from "next/navigation";
import CategoriesView from "./_modules/views/categories-view";

export default async function Categories(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawSearchParams = await props.searchParams;
  const validatedParams = getValidatedSearchParams(rawSearchParams);

  const rawCategory =
    typeof rawSearchParams.category === "string"
      ? rawSearchParams.category
      : undefined;

  if (rawCategory && rawCategory !== validatedParams.category) {
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
