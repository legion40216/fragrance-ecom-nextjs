"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { products } from "@/data/data";
import { getProductPath } from "@/utils/product-url";
import useCart from "@/hooks/useCartStore";
import type { CartItemType } from "@/types/cart";
import { formatter } from "@/utils/formatters";
import { toCartProduct } from "@/utils/product-variants";

interface CartItemProps {
  item: CartItemType;
  onNavigate: () => void;
}

export default function CartItem({ item, onNavigate }: CartItemProps) {
  const { removeItem, updateItemCount } = useCart();
  const changeItemVariant = useCart((state) => state.changeItemVariant);
  const product = products.find((currentProduct) => currentProduct.id === item.productId);

  return (
    <div className="grid grid-cols-[72px_1fr] gap-3 border-b py-4">
      <div className="relative aspect-square overflow-hidden rounded-md bg-neutral-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="72px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={getProductPath(item.slug, item.size)}
              onClick={onNavigate}
              className="block truncate font-medium hover:underline"
            >
              {item.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {item.brand} · {item.size}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Remove ${item.name}`}
            onClick={() => removeItem(item.id)}
          >
            <X className="size-3.5" />
          </Button>
        </div>

        {product && (
          <fieldset className="flex flex-wrap items-center gap-1.5 pt-1">
            <legend className="sr-only">Choose size for {item.name}</legend>
            {product.variants.map((variant) => {
              const selected = item.size === variant.size;
              return <button key={variant.size} type="button" aria-pressed={selected} disabled={variant.stock === 0} onClick={() => changeItemVariant(item.id, toCartProduct(product, variant))} className={`min-h-7 min-w-16 rounded-lg border px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${selected ? "border-foreground bg-foreground text-background" : "border-border bg-background text-foreground"}`}>
                {variant.size}{variant.stock === 0 && <span className="ml-1 text-red-600">×</span>}
              </button>;
            })}
          </fieldset>
        )}

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-1">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Decrease quantity"
              disabled={item.count <= 1}
              onClick={() => updateItemCount(item.id, item.count - 1)}
            >
              <Minus className="size-3.5" />
            </Button>

            <span className="w-8 text-center text-sm">{item.count}</span>

            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Increase quantity"
              disabled={item.count >= item.stock}
              onClick={() => updateItemCount(item.id, item.count + 1)}
            >
              <Plus className="size-3.5" />
            </Button>
          </div>

          <span className="font-semibold">
            {formatter.format(item.price * item.count)}
          </span>
        </div>
      </div>
    </div>
  );
}
