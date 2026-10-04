import { resolveListingParams } from "@/utils/resolve-listing-params";
import CategoriesView from "./_modules/views/categories-view";

export default async function Categories(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Bad/unknown category in the URL -> redirect to a clean /categories
  const validatedParams = await resolveListingParams(
    props.searchParams,
    "/categories",
  );
  return (
    <CategoriesView
      categoryParam={validatedParams.category}
      filterParam={validatedParams.filter}
      sizeParam={validatedParams.size}
      minPrice={validatedParams.minPrice}
      maxPrice={validatedParams.maxPrice}
      featuredParam={validatedParams.featured}
      brandParam={validatedParams.brand}
      inStockParam={validatedParams.inStock}
    />
  );
}
