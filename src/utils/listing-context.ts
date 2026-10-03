import { categories } from "@/data/categories";
import { getPriceBounds, PRICE_BOUNDS } from "@/data/constants";
import { products } from "@/data/data";
import type { CategorySlug, FilterValue, SizeFilter } from "@/schema";
import type { ProductSize, ProductType } from "@/types/types";
import { getValidatedSearchParams, type RawSearchParams } from "@/utils/parseSearchParams";
import { getProductPath } from "@/utils/product-url";
import { clampPriceRange } from "@/utils/clamp-price-range";
import { filterProducts } from "@/utils/filter-products";
import { sortProducts } from "@/utils/sort-products";

export type ListingSource = "products" | "categories" | "featured";
export type CatalogListingSource = Exclude<ListingSource, "featured">;

export type ListingContext =
  | {
      source: "featured";
    }
  | {
      source: "products" | "categories";
      category: CategorySlug;
      filter: FilterValue;
      size: SizeFilter;
      minPrice: number;
      maxPrice: number;
      brand: string[];
      inStock: boolean;
    };

function toSearchParams(context: Exclude<ListingContext, { source: "featured" }>) {
  const params = new URLSearchParams();

  if (context.category) params.set("category", context.category);
  if (context.filter !== "newest") params.set("filter", context.filter);
  if (context.size) params.set("size", context.size);
  if (context.minPrice !== PRICE_BOUNDS.min) {
    params.set("minPrice", String(context.minPrice));
  }
  if (context.maxPrice !== PRICE_BOUNDS.max) {
    params.set("maxPrice", String(context.maxPrice));
  }
  if (context.brand.length > 0) {
    params.set("brand", context.brand.join(","));
  }
  if (context.inStock) params.set("inStock", "true");

  return params;
}

export function serializeListingContext(context: ListingContext): string {
  if (context.source === "featured") return "featured";

  const query = toSearchParams(context).toString();
  return query ? `${context.source}?${query}` : context.source;
}

export function parseListingContext(value: string | null): ListingContext | null {
  if (!value) return null;

  const questionMark = value.indexOf("?");
  const source = questionMark === -1 ? value : value.slice(0, questionMark);
  const query = questionMark === -1 ? "" : value.slice(questionMark + 1);

  if (source === "featured") {
    return query ? null : { source: "featured" };
  }

  if (source !== "products" && source !== "categories") return null;

  const searchParams = new URLSearchParams(query);
  const raw: RawSearchParams = {};

  for (const [key, paramValue] of searchParams.entries()) {
    raw[key] = paramValue;
  }

  const rawCategory = typeof raw.category === "string" ? raw.category : undefined;

  // The existing parser intentionally normalizes bad values. For a navigation
  // context, an unknown category should invalidate the whole context instead.
  if (rawCategory && !categories.some((category) => category.slug === rawCategory)) {
    return null;
  }

  const validated = getValidatedSearchParams(raw);

  return {
    source,
    category: validated.category,
    filter: validated.filter,
    size: validated.size,
    minPrice: validated.minPrice,
    maxPrice: validated.maxPrice,
    brand: validated.brand,
    inStock: validated.inStock,
  };
}

export function getListingProducts(context: ListingContext): ProductType[] {
  if (context.source === "featured") {
    return products.filter((product) => product.isFeatured).slice(0, 4);
  }

  const priceBounds = getPriceBounds({
    category: context.category,
    size: context.size as ProductSize | undefined,
  });

  const priceRange = clampPriceRange(
    {
      minPrice: context.minPrice,
      maxPrice: context.maxPrice,
    },
    priceBounds,
  );

  const filtered = filterProducts(products, {
    categoryParam: context.category,
    sizeParam: context.size,
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
    brandParam: context.brand,
    inStockParam: context.inStock,
  });

  return sortProducts(filtered, context.filter, context.size);
}

export function getAdjacentProducts(
  listingProducts: ProductType[],
  currentSlug: string,
): { previous: ProductType | null; next: ProductType | null } {
  if (listingProducts.length <= 1) {
    return { previous: null, next: null };
  }

  const currentIndex = listingProducts.findIndex(
    (product) => product.slug === currentSlug,
  );

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous:
      listingProducts[
        (currentIndex - 1 + listingProducts.length) % listingProducts.length
      ],
    next: listingProducts[(currentIndex + 1) % listingProducts.length],
  };
}

export function getListingPath(context: ListingContext): string {
  if (context.source === "featured") return "/#featured";

  const query = toSearchParams(context).toString();
  return query ? `/${context.source}?${query}` : `/${context.source}`;
}

export function getListingLabel(context: ListingContext): string {
  if (context.source === "featured") return "Featured";

  if (context.category) {
    return (
      categories.find((category) => category.slug === context.category)?.name ??
      "Collection"
    );
  }

  return context.source === "categories" ? "Categories" : "All Products";
}

export function getProductPathWithListingContext(
  slug: string,
  size: ProductSize | undefined,
  serializedContext: string,
): string {
  const productPath = getProductPath(slug, size);
  const separator = productPath.includes("?") ? "&" : "?";

  return `${productPath}${separator}from=${encodeURIComponent(serializedContext)}`;
}
