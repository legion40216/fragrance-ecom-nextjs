import { getHighestPrice } from "@/utils/product-variants";
import { products } from "./data";
import type { ProductCategorySlug } from "./categories";
import type { ProductSize } from "@/types/types";

export const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export const CURRENCY = "USD";

export const PRICE_STEP = 100;

export function getPriceBounds({
  category,
  size,
}: {
  category?: ProductCategorySlug;
  size?: ProductSize;
}): { min: number; max: number } {
  const matchingProducts = products.filter((product) => {
    if (category && product.category !== category) return false;
    if (size && !product.variants.some((variant) => variant.size === size)) {
      return false;
    }
    return true;
  });

  const highestPrice = matchingProducts.reduce((max, product) => {
    const variants = size
      ? product.variants.filter((variant) => variant.size === size)
      : product.variants;

    return Math.max(max, getHighestPrice({ variants }));
  }, 0);

  return {
    min: 0,
    max: Math.max(
      PRICE_STEP,
      Math.ceil(highestPrice / PRICE_STEP) * PRICE_STEP,
    ),
  };
}

export const PRICE_BOUNDS: { min: number; max: number } = getPriceBounds({});
