import "server-only";

import { categories } from "@/data/categories";
import { products } from "@/data/data";
import type { ProductType } from "@/types/types";
import { getNeighbors, type NavigationData } from "@/utils/product-navigation";

// Server only: uses the whole catalogue, so keep it out of client components.
// Reads build-time data only (no cookies/headers/searchParams), so the product
// page stays statically generated.
export function getDefaultNavigation(product: ProductType): NavigationData {
  const sameCategory = products.filter(
    (item) => item.category === product.category,
  );

  const category = categories.find((item) => item.slug === product.category);

  return {
    ...getNeighbors(
      sameCategory.map((item) => ({ slug: item.slug, name: item.name })),
      product.slug,
    ),
    categoryName: category?.name ?? "All products",
  };
}
