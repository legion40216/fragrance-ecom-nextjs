import { categories } from "@/data/categories";
import { products } from "@/data/data";
import type { ProductType } from "@/types/types";
import { getNeighbors, type NavigationData } from "@/utils/product-navigation";

// Server only: uses the whole catalogue, so keep it out of client components.
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
    backLabel: category?.name ?? "All products",
    backHref: category
      ? `/categories?category=${encodeURIComponent(category.slug)}`
      : "/categories",
  };
}
