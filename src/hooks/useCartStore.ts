import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { toast } from "@/components/ui/toast";
import type { CartItemType, CartProduct } from "@/types/cart";

interface CartState {
  items: CartItemType[];

  addItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  updateItemCount: (id: string, newCount: number) => void;
  clearCart: () => void;

  isInCart: (id: string) => boolean;
  getTotalCount: () => number;
  getTotalPrice: () => number;
}

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (product.stock === 0) {
          toast.add({ title: "This item is out of stock.", type: "error" });
          return;
        }

        if (get().items.some((item) => item.id === product.id)) return;

        set({ items: [...get().items, { ...product, count: 1 }] });
        toast.add({ title: "Added to cart.", type: "success" });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.add({ title: "Removed from cart.", type: "success" });
      },

      updateItemCount: (id, newCount) => {
        const item = get().items.find((currentItem) => currentItem.id === id);
        if (!item) return;

        if (newCount < 1) return;

        if (newCount > item.stock) {
          toast.add({
            title: `Only ${item.stock} in stock.`,
            type: "error",
          });
          return;
        }

        set({
          items: get().items.map((currentItem) =>
            currentItem.id === id
              ? { ...currentItem, count: newCount }
              : currentItem,
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
        toast.add({ title: "Cart cleared.", type: "success" });
      },

      isInCart: (id) => get().items.some((item) => item.id === id),

      getTotalCount: () =>
        get().items.reduce((total, item) => total + item.count, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.count,
          0,
        ),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export default useCart;
