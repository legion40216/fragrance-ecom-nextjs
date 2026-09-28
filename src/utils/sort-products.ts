// utils/sortProducts.ts

import type { FilterValue } from "@/schema";
import type { ProductType } from "@/types/types";

export function sortProducts(
  products: ProductType[],
  filter: FilterValue,
): ProductType[] {
  const sorted = [...products];

  switch (filter) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

    case "price_low_high":
      return sorted.sort((a, b) => a.price - b.price);

    case "price_high_low":
      return sorted.sort((a, b) => b.price - a.price);

    default:
      return sorted;
  }
}

export default sortProducts;
