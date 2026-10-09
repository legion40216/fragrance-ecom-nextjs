import type { ProductType } from "@/types/types";

export const WISHLIST_STORAGE_KEY = "fragrance-wishlist";
export const WISHLIST_CHANGE_EVENT = "fragrance-wishlist-change";

export type WishlistProduct = Pick<
  ProductType,
  | "id"
  | "slug"
  | "name"
  | "brand"
  | "image"
  | "description"
  | "category"
  | "variants"
>;

export function readWishlist(): WishlistProduct[] {
  try {
    const wishlist = JSON.parse(
      window.localStorage.getItem(WISHLIST_STORAGE_KEY) ?? "[]",
    );
    return Array.isArray(wishlist) ? wishlist : [];
  } catch {
    return [];
  }
}

export function writeWishlist(wishlist: WishlistProduct[]) {
  try {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}
