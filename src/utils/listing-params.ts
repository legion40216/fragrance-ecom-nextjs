type RawSearchParams = Record<string, string | string[] | undefined>;

export function hasInvalidCategory(
  rawSearchParams: RawSearchParams,
  validatedParams: { category?: string },
) {
  const rawCategory = rawSearchParams.category;

  if (Array.isArray(rawCategory)) {
    return true;
  }

  return !!rawCategory && rawCategory !== validatedParams.category;
}
