"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Info } from "lucide-react";
import useCart from "@/hooks/useCartStore";
import AddToCartButton from "@/components/global-ui/add-to-cart-button";
import QuickView from "@/components/global-ui/quick-view";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ProductSize, ProductType } from "@/types/types";
import { formatter } from "@/utils/formatters";
import {
  getDefaultVariant,
  getHighestPrice,
  getLowestPrice,
  isProductInStock,
  toCartProduct,
} from "@/utils/product-variants";

interface ProductCardProps
  extends Pick<ProductType, "id" | "slug" | "name" | "brand" | "variants" | "image" | "isNew" | "isBestSeller" | "description" | "category"> {
  selectedSize?: ProductSize;
  sizes?: string;
}

export default function ProductCard({
  id, slug, name, brand, variants, image, isNew, isBestSeller,
  description, category, selectedSize,
  sizes = "(min-width: 768px) 25vw, 50vw",
}: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const cartHasProduct = useCart((state) =>
    state.items.some((item) => item.productId === id),
  );
  const removeProduct = useCart((state) => state.removeProduct);

  const defaultVariant = getDefaultVariant({ variants });
  const selectedVariant =
    (selectedSize && variants.find((variant) => variant.size === selectedSize)) ??
    defaultVariant;
  const isOutOfStock = selectedSize
    ? selectedVariant.stock === 0
    : !isProductInStock({ variants });

  const sortedVariants = [...variants].sort((a, b) => a.price - b.price);
  const unavailableSizes = sortedVariants
    .filter((variant) => variant.stock === 0)
    .map((variant) => variant.size);

  const priceLabel = selectedSize
    ? formatter.format(selectedVariant.price)
    : formatter.format(getLowestPrice({ variants })) + " - " + formatter.format(getHighestPrice({ variants }));

  const sizeLabel = selectedSize
    ? selectedVariant.size
    : sortedVariants.map((variant) => variant.size).join("/");

  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <Link href={"/products/" + slug} className="block">
        <div className="relative aspect-square bg-neutral-100">
          <Image src={image} alt={name} fill sizes={sizes}
            className="object-cover transition-transform duration-300 group-hover:scale-105" />

          {(isNew || isBestSeller) && (
            <Badge className="absolute left-2 top-2 h-auto rounded border-0 bg-white/90 px-2 py-1 text-xs font-medium text-foreground shadow-none">
              {isNew ? "New" : "Bestseller"}
            </Badge>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <span className="text-sm font-medium">Out of stock</span>
            </div>
          )}
        </div>

        <div className="space-y-1 p-2.5 sm:p-3">
          <p className="text-[11px] text-muted-foreground sm:text-xs">{brand}</p>
          <h3 className="font-serif text-base leading-tight sm:text-lg">{name}</h3>

          <div className="flex flex-wrap items-baseline justify-between gap-x-2 pt-1">
            <span className="text-sm font-medium sm:text-base">{priceLabel}</span>
            <span className="text-xs text-muted-foreground">{sizeLabel}</span>
          </div>

          {unavailableSizes.length > 0 && !selectedSize && (
            <p className="text-[11px] text-muted-foreground">
              {unavailableSizes.join(", ")} currently unavailable
            </p>
          )}

          {!selectedSize && !isOutOfStock && selectedVariant.stock <= 5 && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground" />
                }
              >
                <Info className="size-3.5" aria-hidden="true" />
                Only {selectedVariant.stock} left
              </TooltipTrigger>
              <TooltipContent>
                Only {selectedVariant.stock} left in stock
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </Link>

      <div className="absolute right-2 top-2 flex flex-col gap-1">
        <QuickView
          product={{ id, slug, name, brand, image, description, category, variants }}
          selectedSize={selectedSize}
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
        />
        <AddToCartButton
          product={toCartProduct({ id, slug, name, brand, image }, selectedVariant)}
          disabled={selectedVariant.stock === 0}
          onClick={
            selectedSize
              ? undefined
              : () => cartHasProduct ? removeProduct(id) : setQuickViewOpen(true)
          }
          isInCartOverride={!selectedSize && cartHasProduct ? true : undefined}
        />
      </div>
    </div>
  );
}
