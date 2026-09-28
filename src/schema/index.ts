import { z } from "zod";
import { categories, brands } from "@/data/data";
import { PRICE_BOUNDS, sortOptions, type SortValue } from "@/data/constants";
import type { ProductCategorySlug } from "@/data/categories";

const validCategorySlugs = categories.map(
  (category) => category.slug,
) as [string, ...string[]];

const validFilterValues = sortOptions.map(
  (option) => option.value,
) as [string, ...string[]];

export type SearchParamsValues = {
  category?: ProductCategorySlug;
  filter: SortValue;
  minPrice: number;
  maxPrice: number;
  brand: string[];
  inStock: boolean;
};

export const searchParamsSchema: z.ZodType<SearchParamsValues> = z.object({
  category: z.enum(validCategorySlugs).optional().catch(undefined),

  filter: z
    .enum(validFilterValues)
    .optional()
    .catch("newest")
    .default("newest"),

  minPrice: z.coerce
    .number()
    .min(PRICE_BOUNDS.min)
    .max(PRICE_BOUNDS.max)
    .optional()
    .catch(PRICE_BOUNDS.min)
    .default(PRICE_BOUNDS.min),

  maxPrice: z.coerce
    .number()
    .min(PRICE_BOUNDS.min)
    .max(PRICE_BOUNDS.max)
    .optional()
    .catch(PRICE_BOUNDS.max)
    .default(PRICE_BOUNDS.max),

  brand: z
    .string()
    .optional()
    .catch(undefined)
    .transform((value) =>
      value ? value.split(",").filter((brand) => brands.includes(brand)) : [],
    ),

  inStock: z
    .enum(["true"])
    .optional()
    .catch(undefined)
    .transform((value) => value === "true"),
});

export type CategorySlug = SearchParamsValues["category"];
export type FilterValue = SearchParamsValues["filter"];
