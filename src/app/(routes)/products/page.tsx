import { Suspense } from "react";

import ListingSkeleton from "@/features/product-listing/listing-skeleton";
import type { RawSearchParams } from "@/utils/parseSearchParams";
import { resolveListingParams } from "@/utils/resolve-listing-params";

import ProductsView from "./_modules/views/products-view";

interface ProductsPageProps {
  searchParams: Promise<RawSearchParams>;
}

export default function Page({ searchParams }: ProductsPageProps) {
  // The filters live in the URL, which is request-time data, so everything
  // that reads it sits inside Suspense with a skeleton as the fallback.
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <Listing searchParams={searchParams} />
    </Suspense>
  );
}

async function Listing({ searchParams }: ProductsPageProps) {
  // Bad/unknown category in the URL -> redirect to a clean /products
  const params = await resolveListingParams(searchParams, "/products");

  return <ProductsView params={params} />;
}
