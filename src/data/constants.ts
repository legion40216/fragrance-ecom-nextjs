// constants.ts
import { products } from "./data";

export const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

// ISO 4217 code used by the price formatter. Change it here (e.g. "PKR").
export const CURRENCY = "USD";

// Slider step; the max bound is rounded up to a multiple of it.
export const PRICE_STEP = 100;

// Derived from the catalogue so a product priced above a hard-coded ceiling
// can never be silently hidden by the default (max) price filter.
const highestPrice = products.reduce((max, p) => Math.max(max, p.price), 0);

export const PRICE_BOUNDS = {
  min: 0,
  max: Math.max(PRICE_STEP, Math.ceil(highestPrice / PRICE_STEP) * PRICE_STEP),
} as const;
