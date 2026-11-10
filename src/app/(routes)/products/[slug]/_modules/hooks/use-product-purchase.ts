"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import useCart from "@/hooks/useCartStore";
import useHydrated from "@/hooks/useHydrated";
import type { ProductSize, ProductType } from "@/types/types";
import { getInitialSize, getProductPath } from "@/utils/product-url";
import { getCartLineId, toCartProduct } from "@/utils/product-variants";

// Everything the product page needs to pick a size, set a quantity and put
// the result in the cart. The UI components only receive values and callbacks.
export default function useProductPurchase(product: ProductType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydrated();
  const addItem = useCart((state) => state.addItem);
  const removeItem = useCart((state) => state.removeItem);
  const updateItemCount = useCart((state) => state.updateItemCount);

  const sizeParam = searchParams.get("size") ?? undefined;
  const [selectedSize, setSelectedSize] = useState<ProductSize>(() =>
    getInitialSize(product, sizeParam),
  );
  const [quantity, setQuantity] = useState(1);

  // Follow the URL when it changes from outside (back/forward, a link).
  // biome-ignore lint/correctness/useExhaustiveDependencies: only re-sync when the product or ?size= changes
  useEffect(() => {
    setSelectedSize(getInitialSize(product, sizeParam));
  }, [product.id, sizeParam]);

  const selectedVariant =
    product.variants.find((variant) => variant.size === selectedSize) ??
    product.variants[0];

  const cartLineId = getCartLineId(product.id, selectedVariant.size);
  const cartItem = useCart((state) =>
    state.items.find((item) => item.id === cartLineId),
  );

  const inCart = hydrated && Boolean(cartItem);
  const isSoldOut = selectedVariant.stock === 0;
  const maxQuantity = selectedVariant.stock;

  useEffect(() => {
    setQuantity(cartItem?.count ?? 1);
  }, [cartItem]);

  const selectSize = (size: ProductSize) => {
    if (!product.variants.some((variant) => variant.size === size)) return;

    // Let customers inspect every size and its price, including sold-out ones.
    // Purchase controls stay disabled while a sold-out size is selected.
    setSelectedSize(size);
    setQuantity(1);

    // Keep the URL in step with the choice so a refresh or a shared link opens
    // on the same size. replaceState avoids a router round trip.
    window.history.replaceState(null, "", getProductPath(product.slug, size));
  };

  const changeQuantity = (next: number) => {
    const safeQuantity = Math.min(Math.max(next, 1), maxQuantity);
    setQuantity(safeQuantity);

    if (cartItem) {
      updateItemCount(cartLineId, safeQuantity);
    }
  };

  const addToCart = () =>
    addItem(
      toCartProduct(
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          image: product.image,
        },
        selectedVariant,
      ),
      quantity,
    );

  const toggleCart = () => {
    if (isSoldOut) return;

    if (cartItem) {
      removeItem(cartLineId);
      return;
    }

    addToCart();
  };

  const buyNow = () => {
    if (isSoldOut) return;

    if (!cartItem) addToCart();

    router.push("/checkout");
  };

  return {
    selectedVariant,
    quantity,
    maxQuantity,
    isSoldOut,
    inCart,
    selectSize,
    changeQuantity,
    toggleCart,
    buyNow,
  };
}
