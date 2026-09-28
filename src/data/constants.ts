import { products } from "./data";

export const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export const PRICE_BOUNDS = {
  min: Math.min(...products.map((product) => product.price)),
  max: Math.max(...products.map((product) => product.price)),
} as const;

export const PRICE_STEP = 100;
