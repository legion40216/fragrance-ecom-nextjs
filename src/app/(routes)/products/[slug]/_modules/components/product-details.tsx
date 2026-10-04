"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import ShareButton from "@/components/global-ui/share-button";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import useCart from "@/hooks/useCartStore";
import useHydrated from "@/hooks/useHydrated";
import type { ProductSize, ProductType } from "@/types/types";
import { formatter } from "@/utils/formatters";
import { getProductPath, getInitialSize } from "@/utils/product-url";
import { getCartLineId, toCartProduct } from "@/utils/product-variants";

interface ProductDetailsProps {
  product: ProductType;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydrated();
  const { addItem, removeItem, updateItemCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const sizeParam = searchParams.get("size") ?? undefined;
  const [selectedSize, setSelectedSize] = useState<ProductSize>(() =>
    getInitialSize(product, sizeParam),
  );

  useEffect(() => {
    setSelectedSize(getInitialSize(product, sizeParam));
  }, [product.id, sizeParam]);

  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) => variant.size === selectedSize) ??
      product.variants[0],
    [product.variants, selectedSize],
  );

  const cartLineId = getCartLineId(product.id, selectedVariant.size);
  const cartItem = useCart((state) =>
    state.items.find((item) => item.id === cartLineId),
  );

  const inCart = hydrated && Boolean(cartItem);
  const maxQuantity = selectedVariant.stock;

  useEffect(() => {
    setQuantity(cartItem?.count ?? 1);
  }, [cartItem]);

  const selectSize = (size: ProductSize) => {
    const variant = product.variants.find((item) => item.size === size);
    if (!variant || variant.stock === 0) return;

    setSelectedSize(size);
    setQuantity(1);
    router.replace(getProductPath(product.slug, size), { scroll: false });
  };

  const changeQuantity = (next: number) => {
    const safeQuantity = Math.min(Math.max(next, 1), maxQuantity);
    setQuantity(safeQuantity);

    if (cartItem) {
      updateItemCount(cartLineId, safeQuantity);
    }
  };

  const addSelectedToCart = () => {
    if (selectedVariant.stock === 0) return;

    if (cartItem) {
      removeItem(cartLineId);
      return;
    }

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
  };

  const buyNow = () => {
    if (selectedVariant.stock === 0) return;

    if (!cartItem) {
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
    }

    router.push("/checkout");
  };

  const isSoldOut = selectedVariant.stock === 0;
  const categoryName =
    categories.find((category) => category.slug === product.category)?.name ??
    product.category;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {product.brand}
        </p>
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-serif text-3xl">{product.name}</h1>
          <ShareButton
            title={product.name}
            text={product.name + " by " + product.brand}
            path={getProductPath(product.slug, selectedVariant.size)}
            showLabel
            className="shrink-0"
          />
        </div>
        <p className="text-lg font-medium">
          {formatter.format(selectedVariant.price)}
        </p>
        <p className="leading-6 text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <Button
              key={variant.size}
              type="button"
              variant={
                selectedVariant.size === variant.size ? "default" : "outline"
              }
              size="sm"
              disabled={variant.stock === 0}
              title={variant.stock === 0 ? "Out of stock" : undefined}
              onClick={() => selectSize(variant.size)}
            >
              {variant.size}
            </Button>
          ))}
        </div>
        {product.variants.some((variant) => variant.stock === 0) && (
          <p className="text-xs text-muted-foreground">
            {product.variants
              .filter((variant) => variant.stock === 0)
              .map((variant) => variant.size + " out of stock")
              .join(" • ")}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Quantity</p>
        <div className="flex w-fit items-center rounded-md border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isSoldOut || quantity <= 1}
            onClick={() => changeQuantity(quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus />
          </Button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isSoldOut || quantity >= maxQuantity}
            onClick={() => changeQuantity(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {isSoldOut
            ? "Sold out"
            : selectedVariant.stock <= 5
              ? "Only " + selectedVariant.stock + " left"
              : selectedVariant.stock + " available"}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          type="button"
          size="lg"
          variant={inCart ? "outline" : "default"}
          disabled={isSoldOut}
          onClick={addSelectedToCart}
        >
          <ShoppingCart />
          {isSoldOut
            ? "Out of Stock"
            : inCart
              ? "Remove from cart"
              : "Add to cart"}
        </Button>

        <Button
          type="button"
          size="lg"
          variant="outline"
          disabled={isSoldOut}
          onClick={buyNow}
        >
          Buy it now
        </Button>
      </div>

      <div className="divide-y rounded-lg border text-sm">
        <div className="flex justify-between gap-4 p-3">
          <span className="text-muted-foreground">Size</span>
          <span>{selectedVariant.size}</span>
        </div>
        <div className="flex justify-between gap-4 p-3">
          <span className="text-muted-foreground">SKU</span>
          <span>{(product.id + "-" + selectedVariant.size).toUpperCase()}</span>
        </div>
        <div className="flex justify-between gap-4 p-3">
          <span className="text-muted-foreground">Availability</span>
          <span>
            {isSoldOut
              ? "Sold out"
              : selectedVariant.stock <= 5
                ? "Only " + selectedVariant.stock + " left"
                : "In stock"}
          </span>
        </div>
        <div className="flex justify-between gap-4 p-3">
          <span className="text-muted-foreground">Category</span>
          <span className="text-right">{categoryName}</span>
        </div>
      </div>
    </div>
  );
}
