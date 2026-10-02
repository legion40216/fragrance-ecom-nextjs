"use client";

import Image from "next/image";
import { Expand, Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import useCart from "@/hooks/useCartStore";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProductSize, ProductType } from "@/types/types";
import { formatter } from "@/utils/formatters";
import {
  getCartLineId,
  getDefaultVariant,
  toCartProduct,
} from "@/utils/product-variants";

type ExpandableProduct = Pick<
  ProductType,
  "id" | "slug" | "image" | "name" | "brand" | "description" | "category" | "variants"
>;

export default function ProductImageExpand({
  product,
}: {
  product: ExpandableProduct;
}) {
  const defaultVariant = getDefaultVariant({ variants: product.variants });
  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultVariant.size);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const addItem = useCart((state) => state.addItem);
  const selectedVariant =
    product.variants.find((variant) => variant.size === selectedSize) ??
    defaultVariant;
  const cartItem = useCart((state) =>
    state.items.find(
      (item) => item.id === getCartLineId(product.id, selectedVariant.size),
    ),
  );
  const categoryName =
    categories.find((category) => category.slug === product.category)?.name ??
    product.category;

  const buyNow = () => {
    if (!cartItem) {
      addItem(toCartProduct(product, selectedVariant), quantity);
    }
    router.push("/checkout");
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="rounded-full shadow"
            aria-label={`View full image of ${product.name}`}
            title="View full image"
          />
        }
      >
        <Expand className="size-4" aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-1rem)] max-h-[94dvh] max-w-6xl overflow-hidden p-3 sm:max-w-6xl sm:p-4">
        <DialogTitle className="sr-only">{product.name} details and full image</DialogTitle>
        <div className="grid max-h-[86dvh] gap-4 overflow-y-auto md:grid-cols-[minmax(0,1.3fr)_minmax(17rem,0.7fr)] md:overflow-hidden">
          <div className="relative h-[45vh] min-h-64 w-full md:h-[78dvh]">
            <Image
              src={product.image}
              alt={product.name}
              width={1200}
              height={1200}
              sizes="(min-width: 768px) 65vw, 96vw"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-5 overflow-y-auto p-1 md:py-6 md:pr-3">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {product.brand}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl">{product.name}</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Category</h3>
              <p className="text-sm text-muted-foreground">{categoryName}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.size}
                    type="button"
                    size="sm"
                    variant={selectedSize === variant.size ? "default" : "outline"}
                    disabled={variant.stock === 0}
                    onClick={() => {
                      setSelectedSize(variant.size);
                      setQuantity(1);
                    }}
                  >
                    {variant.size} · {formatter.format(variant.price)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Quantity</h3>
              <div className="flex w-fit items-center rounded-md border">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Decrease quantity"
                  disabled={selectedVariant.stock === 0 || quantity <= 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-10 text-center text-sm" aria-live="polite">
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Increase quantity"
                  disabled={selectedVariant.stock === 0 || quantity >= selectedVariant.stock}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(selectedVariant.stock, current + 1),
                    )
                  }
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedVariant.stock > 0
                  ? `${selectedVariant.stock} available`
                  : "Sold out"}
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                size="lg"
                disabled={selectedVariant.stock === 0}
                onClick={() =>
                  addItem(toCartProduct(product, selectedVariant), quantity)
                }
              >
                <ShoppingCart className="size-4" />
                Add to cart
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                disabled={selectedVariant.stock === 0}
                onClick={buyNow}
              >
                Buy it now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
