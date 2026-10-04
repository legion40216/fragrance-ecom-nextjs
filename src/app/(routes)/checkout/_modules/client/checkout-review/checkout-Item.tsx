"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCartStore";
import type { CartItemType } from "@/types/cart";
import { formatter } from "@/utils/formatters";

type CheckoutItemProps = {
  item: CartItemType;
};

export default function CheckoutItem({ item }: CheckoutItemProps) {
  const { removeItem, updateItemCount } = useCart();

  return (
    <li className="group flex gap-2">
      {/* PRODUCT IMAGE */}
      <Link
        href={`/products/${item.slug}`}
        className="relative block aspect-square w-[28%] overflow-hidden rounded-md border border-gray-200"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 15vw, 28vw"
          className="object-cover"
        />
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="flex w-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="block font-bold underline"
            >
              {item.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {item.brand} · {item.size}
            </p>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {formatter.format(item.price)}
              <X className="size-2" />
              <span>{item.count}</span>
            </div>

            <Badge className="font-semibold" variant="secondary">
              {formatter.format(item.price * item.count)}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex w-max items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Decrease quantity"
              disabled={item.count <= 1}
              onClick={() => updateItemCount(item.id, item.count - 1)}
            >
              <Minus className="size-4" />
            </Button>
            <span className="px-3">{item.count}</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Increase quantity"
              disabled={item.count >= item.stock}
              onClick={() => updateItemCount(item.id, item.count + 1)}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <Button
            className="text-red-600 hover:text-red-600"
            variant="ghost"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="mr-2 size-4" />
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
