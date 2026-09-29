import type { ProductType } from "@/types/types";

export type CartProduct = Pick<
  ProductType,
  "id" | "slug" | "name" | "brand" | "price" | "size" | "image" | "stock"
>;

export type CartItemType = CartProduct & {
  count: number;
};
