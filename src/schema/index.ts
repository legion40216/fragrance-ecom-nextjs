// schemas/index.ts
import { z } from "zod";
import { categories } from "@/data/data";

const validCategorySlugs = categories.map(
  (category) => category.slug
) as [string, ...string[]];

export const searchParamsSchema = z.object({
  category: z.enum(validCategorySlugs).optional(),
});

export type SearchParamsValues = z.infer<typeof searchParamsSchema>;
export type CategorySlug = SearchParamsValues["category"];