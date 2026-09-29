import type { ProductType } from "@/types/types";
import type { CategorySlug } from "@/schema";

export interface ProductFilters {
  categoryParam: CategorySlug;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  inStockParam: boolean;
  featuredParam: boolean;
}

export function filterProducts(
  products: ProductType[],
  {
    categoryParam,
    minPrice,
    maxPrice,
    brandParam,
    inStockParam,
    featuredParam,
  }: ProductFilters,
): ProductType[] {
  return products.filter((product) => {
    if (categoryParam && product.category !== categoryParam) return false;
    if (product.price < minPrice || product.price > maxPrice) return false;
    if (brandParam.length > 0 && !brandParam.includes(product.brand))
      return false;
    if (inStockParam && product.stock <= 0) return false;
   if (
  featuredParam &&
  !product.isFeatured &&
  !product.isBestSeller
) {
  return false;
}
    return true;
  });
}
