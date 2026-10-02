import type { ProductSize, ProductType } from "@/types/types";
import { getDefaultVariant } from "@/utils/product-variants";

// "/products/noir-essence" or "/products/noir-essence?size=100ml"
export function getProductPath(slug: string, size?: ProductSize): string {
  return size ? `/products/${slug}?size=${size}` : `/products/${slug}`;
}

// Turns the ?size= value from the URL into the size to preselect.
// Falls back to the default size when it is missing, unknown or sold out.
export function getInitialSize(
  product: Pick<ProductType, "variants">,
  sizeParam: string | string[] | undefined,
): ProductSize {
  const requested = Array.isArray(sizeParam) ? sizeParam[0] : sizeParam;

  const match = product.variants.find(
    (variant) => variant.size === requested && variant.stock > 0,
  );

  return (match ?? getDefaultVariant(product)).size;
}
