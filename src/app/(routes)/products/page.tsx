import { resolveListingParams } from "@/utils/resolve-listing-params";
import ProductsView from "./_modules/views/products-view";
export default async function Products(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Bad/unknown category in the URL -> redirect to a clean /products
  const validatedParams = await resolveListingParams(
    props.searchParams,
    "/products",
  );
  return (
    <div>
      <ProductsView
        categoryParam={validatedParams.category}
        filterParam={validatedParams.filter}
        sizeParam={validatedParams.size}
        minPrice={validatedParams.minPrice}
        maxPrice={validatedParams.maxPrice}
        featuredParam={validatedParams.featured}
        brandParam={validatedParams.brand}
        inStockParam={validatedParams.inStock}
      />
    </div>
  );
}