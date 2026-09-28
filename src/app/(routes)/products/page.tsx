import { getValidatedSearchParams } from "@/utils/parseSearchParams";
import { hasInvalidCategory } from "@/utils/listing-params";
import { redirect } from "next/navigation";
import ProductView from "./_modules/views/product-view";

export default async function Product(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawSearchParams = await props.searchParams;
  const validatedParams = getValidatedSearchParams(rawSearchParams);

  if (hasInvalidCategory(rawSearchParams, validatedParams)) {
    redirect("/products");
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
