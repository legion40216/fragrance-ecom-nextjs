import { Suspense } from "react";

import ListingSkeleton from "@/features/product-listing/listing-skeleton";
import type { RawSearchParams } from "@/utils/parseSearchParams";
import { resolveListingParams } from "@/utils/resolve-listing-params";

import CategoriesView from "./_modules/views/categories-view";

interface CategoriesPageProps {
  searchParams: Promise<RawSearchParams>;
}

export default function Page({ searchParams }: CategoriesPageProps) {
  // The filters live in the URL, which is request-time data, so everything
  // that reads it sits inside Suspense with a skeleton as the fallback.
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <Categories searchParams={searchParams} />
    </Suspense>
  );
}

async function Categories({ searchParams }: CategoriesPageProps) {
  // Bad/unknown category in the URL -> redirect to a clean /categories
  const params = await resolveListingParams(searchParams, "/categories");

  return <CategoriesView params={params} />;
}
