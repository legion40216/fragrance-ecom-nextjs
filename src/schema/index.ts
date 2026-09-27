// schema/index.ts
import { z } from "zod";
import { categories, brands } from "@/data/data";
import { sortOptions, PRICE_BOUNDS } from "@/data/constants";

const validCategorySlugs = categories.map(
  (category) => category.slug
) as [string, ...string[]];

const validFilterValues = sortOptions.map(
  (option) => option.value
) as [string, ...string[]];

export const searchParamsSchema = z.object({
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

  // Comma-separated list of brand names -> string[], unknown brands dropped
  brand: z
    .string()
    .optional()
    .catch(undefined)
    .transform((value) =>
      value ? value.split(",").filter((b) => brands.includes(b)) : []
    ),

  inStock: z
    .enum(["true"])
    .optional()
    .catch(undefined)
    .transform((value) => value === "true"),
});

export type SearchParamsValues = z.infer<typeof searchParamsSchema>;
export type CategorySlug = SearchParamsValues["category"];
export type FilterValue = SearchParamsValues["filter"];