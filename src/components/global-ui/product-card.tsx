import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/global-ui/add-to-cart-button";
import QuickView from "@/components/global-ui/quick-view";
import { Badge } from "@/components/ui/badge";
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
  extends Pick<
    ProductType,
    | "id"
    | "slug"
    | "name"
    | "brand"
    | "variants"
    | "image"
    | "isNew"
    | "isBestSeller"
    | "description"
    | "category"
  > {
  selectedSize?: ProductSize;
  sizes?: string;
}

export default function ProductCard({
  id,
  slug,
  name,
  brand,
  variants,
  image,
  isNew,
  isBestSeller,
  description,
  category,
  selectedSize,
  sizes = "(min-width: 768px) 25vw, 50vw",
}: ProductCardProps) {
  const defaultVariant = getDefaultVariant({ variants });
  const selectedVariant =
    (selectedSize &&
      variants.find((variant) => variant.size === selectedSize)) ??
    defaultVariant;
  const isOutOfStock = selectedSize
    ? selectedVariant.stock === 0
    : !isProductInStock({ variants });

  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <Link href={`/products/${slug}`} className="block">
        <div className="relative aspect-square bg-neutral-100">
          <Image
            src={image}
            alt={name}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

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

          {selectedSize ? (
            <p className="pt-0.5 text-sm font-medium sm:text-base">
              {formatter.format(selectedVariant.price)} · {selectedVariant.size}
            </p>
          ) : (
            <div className="pt-0.5 text-sm font-medium sm:text-base">
              <p>
                {formatter.format(getLowestPrice({ variants }))} -{" "}
                {formatter.format(getHighestPrice({ variants }))}
              </p>
              <p>50/100ml</p>
            </div>
          )}
        </div>
      </Link>

      <div className="absolute right-2 top-2 flex flex-col gap-1">
        <QuickView
          product={{
            id,
            slug,
            name,
            brand,
            image,
            description,
            category,
            variants,
          }}
          selectedSize={selectedSize}
        />

        <AddToCartButton
          product={toCartProduct(
            { id, slug, name, brand, image },
            selectedVariant,
          )}
          disabled={selectedVariant.stock === 0}
        />
      </div>
    </div>
  );
}
