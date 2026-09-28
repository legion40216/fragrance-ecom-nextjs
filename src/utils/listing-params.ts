import { categories } from "@/data/data";
import type { SearchParamsValues } from "@/schema";

type RawSearchParams = Record<string, string | string[] | undefined>;

export function hasInvalidCategory(
  rawSearchParams: RawSearchParams,
  validatedParams: SearchParamsValues,
) {
  const rawCategory = rawSearchParams.category;
  if (rawCategory === undefined) return false;

  const category = Array.isArray(rawCategory)
    ? rawCategory[rawCategory.length - 1]
    : rawCategory;

  return (
    category !== validatedParams.category &&
    !categories.some((item) => item.slug === category)
  );
}
