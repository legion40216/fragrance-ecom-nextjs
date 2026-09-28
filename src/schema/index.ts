// schema/index.ts
import { z } from "zod";
import { PRICE_BOUNDS, sortOptions } from "@/data/constants";
import { brands, type CategorySlugValue, categories } from "@/data/data";

const validCategorySlugs = categories.map((category) => category.slug) as [
  CategorySlugValue,
  ...CategorySlugValue[],
];

const validFilterValues = sortOptions.map((option) => option.value) as [
  string,
  ...string[],
];

const baseSearchParamsSchema = z.object({
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
      value ? value.split(",").filter((b) => brands.includes(b)) : [],
    ),

  inStock: z
    .enum(["true"])
    .optional()
    .catch(undefined)
    .transform((value) => value === "true"),
});

// ?minPrice=9000&maxPrice=1000 would match nothing, so swap them instead.
export const searchParamsSchema = baseSearchParamsSchema.transform((values) =>
  values.minPrice > values.maxPrice
    ? { ...values, minPrice: values.maxPrice, maxPrice: values.minPrice }
    : values,
);

export type SearchParamsValues = z.infer<typeof searchParamsSchema>;
export type CategorySlug = SearchParamsValues["category"];
export type FilterValue = SearchParamsValues["filter"];
