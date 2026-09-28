import { searchParamsSchema, type SearchParamsValues } from "@/schema";

export type RawSearchParams = Record<
  string,
  string | string[] | undefined
>;

function normalizeSearchParams(
  searchParams: RawSearchParams,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      result[key] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      result[key] = value[value.length - 1];
    }
  }

  return result;
}

export function getValidatedSearchParams(
  searchParams: RawSearchParams,
): SearchParamsValues {
  const parsed = searchParamsSchema.parse(
    normalizeSearchParams(searchParams),
  );

  if (parsed.minPrice > parsed.maxPrice) {
    return {
      ...parsed,
      minPrice: parsed.maxPrice,
      maxPrice: parsed.minPrice,
    };
  }

  return parsed;
}
