"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import ShareButton from "@/components/global-ui/share-button";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import useCart from "@/hooks/useCartStore";
import useHydrated from "@/hooks/useHydrated";
import { categories } from "@/data/categories";
import type { ProductSize, ProductVariant } from "@/types/types";
import { formatter } from "@/utils/formatters";
import { getProductPath } from "@/utils/product-url";
import { getCartLineId, toCartProduct } from "@/utils/product-variants";

export type QuickViewProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  description: string;
  category: string;
  variants: ProductVariant[];
};

export default function QuickViewContent({
  product,
  initialSize,
  onClose,
}: {
  product: QuickViewProduct;
  initialSize?: ProductSize;
  onClose: () => void;
}) {
  const router = useRouter();
  const hydrated = useHydrated();
  const { addItem, removeItem, updateItemCount } = useCart();

  const getInitialSize = () =>
    initialSize && product.variants.some((variant) => variant.size === initialSize)
      ? initialSize
      : (product.variants.find((variant) => variant.stock > 0)?.size ??
        product.variants[0].size);

  const [selectedSize, setSelectedSize] = useState<ProductSize>(getInitialSize);
  const [quantity, setQuantity] = useState(1);

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
    setSelectedSize(getInitialSize());
  }, [initialSize, product.variants]);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.count);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  const selectSize = (size: ProductSize) => {
    setSelectedSize(size);
    setQuantity(1);
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

    onClose();
    router.push("/checkout");
  };

  const isSoldOut = selectedVariant.stock === 0;
  const categoryName =
    categories.find((category) => category.slug === product.category)?.name ??
    product.category;

  return (
    <DialogContent
      showCloseButton
      className="max-h-[90dvh] overflow-hidden p-0 sm:max-w-3xl"
    >
      <div className="max-h-[90dvh] overflow-y-auto">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-neutral-100 md:sticky md:top-0 md:self-start">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>

          <div className="space-y-6 p-5 sm:p-7">
            <div className="space-y-2 pr-8">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {product.brand}
              </p>
              <div className="flex items-start justify-between gap-3">
                <DialogTitle className="font-serif text-2xl">
                  {product.name}
                </DialogTitle>
                <ShareButton
                  title={product.name}
                  text={`${product.name} by ${product.brand}`}
                  path={getProductPath(product.slug, selectedVariant.size)}
                  className="shrink-0"
                />
              </div>
              <p className="text-lg font-medium">
                {formatter.format(selectedVariant.price)}
              </p>
              <DialogDescription className="leading-6">
                {product.description}
              </DialogDescription>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.size}
                    type="button"
                    variant={
                      selectedVariant.size === variant.size
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    disabled={variant.stock === 0}
                    onClick={() => selectSize(variant.size)}
                  >
                    {variant.size}
                  </Button>
                ))}
              </div>
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
                    ? `Only ${selectedVariant.stock} left`
                    : `${selectedVariant.stock} available`}
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant={inCart ? "outline" : "default"}
                disabled={isSoldOut}
                onClick={addSelectedToCart}
              >
                <ShoppingCart />
                {inCart ? "Remove from cart" : "Add to cart"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isSoldOut}
                onClick={buyNow}
              >
                Buy it now
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onClose}
            >
              Close
            </Button>

            <div className="divide-y rounded-lg border text-sm">
              <div className="flex justify-between gap-4 p-3">
                <span className="text-muted-foreground">Size</span>
                <span>{selectedVariant.size}</span>
              </div>
              <div className="flex justify-between gap-4 p-3">
                <span className="text-muted-foreground">SKU</span>
                <span>{`${product.id}-${selectedVariant.size}`.toUpperCase()}</span>
              </div>
              <div className="flex justify-between gap-4 p-3">
                <span className="text-muted-foreground">Availability</span>
                <span>
                  {isSoldOut
                    ? "Sold out"
                    : selectedVariant.stock <= 5
                      ? `Only ${selectedVariant.stock} left`
                      : "In stock"}
                </span>
              </div>
              <div className="flex justify-between gap-4 p-3">
                <span className="text-muted-foreground">Category</span>
                <span className="text-right">{categoryName}</span>
              </div>
            </div>

            <Link
              href={getProductPath(product.slug, selectedVariant.size)}
              onClick={onClose}
              className="inline-flex text-sm font-medium underline underline-offset-4"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
