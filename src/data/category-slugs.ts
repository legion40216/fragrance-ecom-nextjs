export const categorySlugs = [
  "mens-fragrances",
  "womens-fragrances",
  "unisex-fragrances",
  "oud-collection",
  "attars",
] as const;

export type CategorySlugValue = (typeof categorySlugs)[number];
