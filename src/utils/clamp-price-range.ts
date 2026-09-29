// The URL default for maxPrice is the highest price in the whole catalogue,
// but the slider only goes as high as the current category + size allows.
// Clamping keeps "no price filter" looking like "no price filter".
export function clampPriceRange(
  { minPrice, maxPrice }: { minPrice: number; maxPrice: number },
  bounds: { min: number; max: number },
) {
  const clamp = (value: number) =>
    Math.min(Math.max(value, bounds.min), bounds.max);

  return { minPrice: clamp(minPrice), maxPrice: clamp(maxPrice) };
}
