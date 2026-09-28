import { z } from "zod";
import { brands } from "@/data/data";
import { categorySlugs } from "@/data/category-slugs";
import { PRICE_BOUNDS, sortOptions } from "@/data/constants";

const validFilterValues = sortOptions.map(
  (option) => option.value,
) as [string, ...string[]];

const baseSearchParamsSchema = z.object({
  category: z.enum(categorySlugs).optional().catch(undefined),

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

export const searchParamsSchema = baseSearchParamsSchema.transform((values) =>
  values.minPrice > values.maxPrice
    ? {
        ...values,
        minPrice: values.maxPrice,
        maxPrice: values.minPrice,
      }
    : values,
);

export type SearchParamsValues = z.infer<typeof searchParamsSchema>;
export type CategorySlug = SearchParamsValues["category"];
export type FilterValue = SearchParamsValues["filter"];
