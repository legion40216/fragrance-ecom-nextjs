"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CircleAlert } from "lucide-react";
import useCart from "@/hooks/useCartStore";
import AddToCartButton from "@/components/global-ui/add-to-cart-button";
import QuickView from "@/components/global-ui/quick-view";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
  const [stockTooltipOpen, setStockTooltipOpen] = useState(false);
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

  const stockStatus = unavailableSizes.length === 0
    ? "available"
    : unavailableSizes.length === variants.length
      ? "out"
      : "partial";
  const lowStockVariants = sortedVariants.filter(
    (variant) => variant.stock > 0 && variant.stock <= 5,
  );
  const lowStockTooltip = lowStockVariants
    .map((variant) => `${variant.size}: Only ${variant.stock} left`)
    .join(" • ");

  const unavailableTooltip =
    stockStatus === "out"
      ? "All sizes currently unavailable"
      : stockStatus === "partial"
        ? `${unavailableSizes.join(", ")} currently unavailable`
        : "";

  const stockTooltip = [lowStockTooltip, unavailableTooltip]
    .filter(Boolean)
    .join(" • ");

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
        </div>
      </Link>

      <div className="absolute right-2 top-2 flex flex-col items-end gap-1">
        <div className="flex items-center gap-1">
          {!selectedSize &&
            (stockStatus === "partial" || lowStockVariants.length > 0) && (
            <Tooltip open={stockTooltipOpen} onOpenChange={setStockTooltipOpen}>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    className="flex size-7 items-center justify-center rounded-full bg-background/90 shadow"
                    aria-label={stockTooltip}
                    onClick={() => setStockTooltipOpen((open) => !open)}
                  />
                }
              >
                <CircleAlert
                  className="size-3.5 text-amber-600"
                  aria-hidden="true"
                />
              </TooltipTrigger>
              <TooltipContent>{stockTooltip}</TooltipContent>
            </Tooltip>
          )}
          <QuickView
            product={{ id, slug, name, brand, image, description, category, variants }}
            selectedSize={selectedSize}
            open={quickViewOpen}
            onOpenChange={setQuickViewOpen}
          />
        </div>
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
