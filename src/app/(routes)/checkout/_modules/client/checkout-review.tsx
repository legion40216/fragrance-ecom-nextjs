"use client";

import type { CartItemType } from "@/types/cart";

import CheckoutItem from "./checkout-review/checkout-Item";
import OrderSummary from "./checkout-review/order-summary";

type CheckoutReviewProps = {
  items: CartItemType[];
  totalPrice: number;
  isPlacingOrder: boolean;
  onPlaceOrder: () => void;
};

export default function CheckoutReview({
  items,
  totalPrice,
  isPlacingOrder,
  onPlaceOrder,
}: CheckoutReviewProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* ITEMS CONTAINER */}
      <div className="space-y-2 lg:col-span-8">
        {items.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty</p>
        ) : (
          <ul className="space-y-6">
            {items.map((item) => (
              <CheckoutItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>

      {/* PAYMENT CONTAINER */}
      <div className="lg:col-span-4">
        <OrderSummary
          totalPrice={totalPrice}
          isEmpty={items.length === 0}
          isPlacingOrder={isPlacingOrder}
          onPlaceOrder={onPlaceOrder}
        />
      </div>
    </div>
  );
}
