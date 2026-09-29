"use client";

import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCartStore";
import useHydrated from "@/hooks/useHydrated";
import type { CartProduct } from "@/types/cart";

export default function AddToCartButton({ product }: { product: CartProduct }) {
  const { addItem, removeItem } = useCart();
  const inCart = useCart((state) =>
    state.items.some((item) => item.id === product.id),
  );
  const hydrated = useHydrated();

  const isInCart = hydrated && inCart;
  const isOutOfStock = product.stock === 0;

  return (
    <Button
      variant={isInCart ? "default" : "secondary"}
      size="icon-sm"
      className="rounded-full shadow"
      disabled={isOutOfStock}
      aria-label={
        isInCart
          ? `Remove ${product.name} from cart`
          : `Add ${product.name} to cart`
      }
      aria-pressed={isInCart}
      onClick={() => (isInCart ? removeItem(product.id) : addItem(product))}
    >
      {isInCart ? <Check /> : <ShoppingCart />}
    </Button>
  );
}
