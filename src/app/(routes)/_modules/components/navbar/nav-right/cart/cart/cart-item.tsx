"use client";

import React, { useState } from "react";
import Link from "next/link";

import { X, Plus, Minus } from "lucide-react";
import useCart from "@/hooks/useCartStore";
import { formatter } from "@/utils/formatters";
import Image from "next/image";

import { Button } from "@/components/ui/button";


export default function CartItem({

}) {
  // const { removeItem, updateItemCount } = useCart();
  // const [count, setCount] = useState<number>(countFromProps);

  // const handleRemove = () => {
  //   removeItem(id);
  // };

  // const handleCountChange = (newCount: number) => {
  //   if (newCount > quantity) {
  //     toast.error(`Only ${quantity} items available.`);
  //     return;
  //   }
  //   if (newCount < 1) {
  //     toast.error("Quantity cannot be less than 1.");
  //     return;
  //   }
  //   setCount(newCount);
  //   updateItemCount(id, newCount);
  // };

  return (
    <div className="grid grid-cols-[30%_1fr] gap-4 py-4 border-b">
      {/* <div className="rounded-md overflow-hidden w-full relative aspect-square">
        <Image
          src={image}
          alt={title || "Product image"}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col">
          <div
            className="flex justify-between text-base 
        font-medium text-gray-900"
          >
            <Link
              className="font-medium hover:underline"
              href={`/products/${id}`}
              onClick={() => setOpen(false)} // Close the cart
            >
              {title}
            </Link>
            <span className="font-semibold">
              {formatter.format(price * count)}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">{category}</p>

          {discount > 0 && (
            <p className="text-sm text-green-600">{discount}% off</p>
          )}

          <div className="flex items-center mt-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCountChange(count - 1)}
              disabled={count <= 1}
            >
              <Minus className="size-4" />
            </Button>

            <span className="px-3">{count}</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCountChange(count + 1)}
              disabled={count >= quantity}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        <Button variant="ghost" onClick={handleRemove} size={"icon"}>
          <X size={15} />
        </Button>
      </div> */}
    </div>
  );
}
