import { products } from "@/data/data";

export const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
] as const;

export const PRICE_STEP = 100;

export const PRICE_BOUNDS = {
  min: 0,
  max:
    Math.ceil(
      Math.max(0, ...products.map((product) => product.price)) / PRICE_STEP,
    ) * PRICE_STEP,
} as const;
