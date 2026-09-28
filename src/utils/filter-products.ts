import type { CategorySlug } from "@/schema";
import type { ProductType } from "@/types/types";

export interface ProductFilters {
  categoryParam: CategorySlug;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  inStockParam: boolean;
}

export function filterProducts(
  products: ProductType[],
  {
    categoryParam,
    minPrice,
    maxPrice,
    brandParam,
    inStockParam,
  }: ProductFilters,
): ProductType[] {
  return products.filter((product) => {
    if (categoryParam && product.category !== categoryParam) return false;
    if (product.price < minPrice || product.price > maxPrice) return false;
    if (brandParam.length > 0 && !brandParam.includes(product.brand))
      return false;
    if (inStockParam && product.stock <= 0) return false;
    return true;
  });
}
