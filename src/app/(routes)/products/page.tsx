import { getValidatedSearchParams } from "@/utils/parseSearchParams";
import { redirect } from "next/navigation";
import ProductView from "./_modules/views/product-view";

export default async function Product(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawSearchParams = await props.searchParams;
  const validatedParams = getValidatedSearchParams(rawSearchParams);

  const rawCategory =
    typeof rawSearchParams.category === "string"
      ? rawSearchParams.category
      : undefined;

  // Bad/unknown category in the URL -> send them to a clean URL
  if (rawCategory && rawCategory !== validatedParams.category) {
    redirect("/");
  }

  return (
    <div>
      <ProductView
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