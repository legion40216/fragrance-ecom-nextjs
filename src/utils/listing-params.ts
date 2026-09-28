type RawSearchParams = Record<string, string | string[] | undefined>;

export function hasInvalidCategory(
  rawSearchParams: RawSearchParams,
  validatedParams: { category?: string },
) {
  const rawCategory =
    typeof rawSearchParams.category === "string"
      ? rawSearchParams.category
      : undefined;

  return !!rawCategory && rawCategory !== validatedParams.category;
}
