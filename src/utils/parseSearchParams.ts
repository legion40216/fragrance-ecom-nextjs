// utils/parseSearchParams.ts

import { type SearchParamsValues, searchParamsSchema } from "@/schema";

type RawSearchParams = Record<string, string | string[] | undefined>;

function normalizeSearchParams(
  searchParams: RawSearchParams,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue;
    result[key] = Array.isArray(value) ? value[0] : value;
  }

  return result;
}

export function getValidatedSearchParams(
  searchParams: RawSearchParams,
): SearchParamsValues {
  const normalized = normalizeSearchParams(searchParams);
  const result = searchParamsSchema.safeParse(normalized);

  // Invalid or unknown category -> treat as "no filter" rather than erroring
  return result.success ? result.data : searchParamsSchema.parse({});
}
