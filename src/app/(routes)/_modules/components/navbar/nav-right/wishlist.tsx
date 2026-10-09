"use client";

import { Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCart from "@/hooks/useCartStore";
import useHydrated from "@/hooks/useHydrated";
import type { ProductSize, ProductVariant } from "@/types/types";
import { formatter } from "@/utils/formatters";
import { getProductPath } from "@/utils/product-url";
import { toCartProduct } from "@/utils/product-variants";
import {
  readWishlist,
  WISHLIST_CHANGE_EVENT,
  type WishlistProduct,
  writeWishlist,
} from "@/utils/wishlist";

interface WishlistProps {
  mobile?: boolean;
}

export default function Wishlist({ mobile = false }: WishlistProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<WishlistProduct[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<
    Record<string, ProductSize>
  >({});
  const addItem = useCart((state) => state.addItem);
  const hydrated = useHydrated();

  useEffect(() => {
    const syncWishlist = () => setItems(readWishlist());
    syncWishlist();
    window.addEventListener(WISHLIST_CHANGE_EVENT, syncWishlist);
    window.addEventListener("storage", syncWishlist);
    return () => {
      window.removeEventListener(WISHLIST_CHANGE_EVENT, syncWishlist);
      window.removeEventListener("storage", syncWishlist);
    };
  }, []);

  const removeProduct = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    if (writeWishlist(updated)) setItems(updated);
  };

  const selectedVariant = (product: WishlistProduct): ProductVariant => {
    const pickedSize = selectedSizes[product.id];
    return (
      product.variants.find((variant) => variant.size === pickedSize) ??
      product.variants.find((variant) => variant.stock > 0) ??
      product.variants[0]
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size={mobile ? "default" : "icon"}
            className={
              mobile
                ? "relative h-14 w-full min-w-0 flex-1 flex-col gap-1 rounded-lg px-1 text-[11px] font-medium text-muted-foreground hover:text-foreground"
                : "relative"
            }
            aria-label={`Open wishlist, ${items.length} items`}
          />
        }
      >
        <Heart className="size-5" strokeWidth={1.75} />
        {mobile && <span>Wishlist</span>}
        {items.length > 0 && (
          <span
            className={
              mobile
                ? "absolute right-1/2 top-1 flex size-4 translate-x-3 items-center justify-center rounded-full bg-rose-600 text-[10px] font-medium text-white"
                : "absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-medium text-white"
            }
          >
            {items.length > 9 ? "9+" : items.length}
          </span>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-sm" showCloseButton>
        <SheetHeader>
          <SheetTitle className="uppercase">Wishlist</SheetTitle>
          <SheetDescription>
            Products you have saved for later.
          </SheetDescription>
        </SheetHeader>

        {!hydrated || items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-muted-foreground">
            <Heart className="size-8" />
            <p className="uppercase">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
            {items.map((product) => {
              const variant = selectedVariant(product);
              return (
                <article
                  key={product.id}
                  className="grid grid-cols-[76px_1fr] gap-3 border-b pb-4"
                >
                  <Link
                    href={getProductPath(product.slug, variant.size)}
                    onClick={() => setIsOpen(false)}
                    className="relative aspect-square overflow-hidden rounded-md bg-neutral-100"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="76px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={getProductPath(product.slug, variant.size)}
                          onClick={() => setIsOpen(false)}
                          className="block truncate font-medium hover:underline"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {product.brand}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label={`Remove ${product.name} from wishlist`}
                        onClick={() => removeProduct(product.id)}
                      >
                        <X />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {product.variants.map((size) => (
                        <span key={size.size} className="relative inline-flex">
                          <Button
                            type="button"
                            size="sm"
                            variant={
                              variant.size === size.size ? "default" : "outline"
                            }
                            disabled={size.stock === 0}
                            aria-label={
                              size.stock === 0
                                ? `${size.size}, out of stock`
                                : size.size
                            }
                            aria-pressed={variant.size === size.size}
                            onClick={() =>
                              setSelectedSizes((current) => ({
                                ...current,
                                [product.id]: size.size,
                              }))
                            }
                          >
                            {size.size}
                          </Button>
                          {size.stock === 0 && (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-1 top-1/2 h-px -translate-y-1/2 rotate-[-18deg] rounded-full bg-red-600"
                            />
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold">
                          {formatter.format(variant.price)}
                        </p>
                        <p
                          className={`text-xs ${variant.stock > 0 ? "text-emerald-700" : "text-red-600"}`}
                        >
                          {variant.stock > 0 ? "In stock" : "Out of stock"}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        disabled={variant.stock === 0}
                        onClick={() => addItem(toCartProduct(product, variant))}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
