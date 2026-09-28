// utils/parseSearchParams.ts

import { searchParamsSchema } from "@/schema";
import type { SearchParamsValues } from "@/schema";


type RawSearchParams = Record<string, string | string[] | undefined>;

function normalizeSearchParams(
  searchParams: RawSearchParams
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
  searchParams: RawSearchParams
): SearchParamsValues {
  const normalized = normalizeSearchParams(searchParams);
  const result = searchParamsSchema.safeParse(normalized);

  if (result.success) {
    return result.data;
  }

  return searchParamsSchema.parse({});
}