"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "@/components/ui/toast";
import useCart from "@/hooks/useCartStore";
import useHydrated from "@/hooks/useHydrated";

import CheckoutReview from "./client/checkout-review";

// No backend yet, so the order number is generated in the browser
function createOrderNumber() {
  return `FR-${Date.now().toString(36).toUpperCase()}`;
}

export default function Client() {
  const router = useRouter();
  const hydrated = useHydrated();
  const items = useCart((state) => state.items);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // The cart lives in localStorage, so wait for the browser before rendering it
  if (!hydrated) return null;

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  const handlePlaceOrder = () => {
    if (items.length === 0 || isPlacingOrder) return;

    setIsPlacingOrder(true);

    const orderNumber = createOrderNumber();
    router.push(`/checkout/success?order=${orderNumber}`);

    // Empty the cart directly, so the "Cart cleared." toast doesn't show
    useCart.setState({ items: [] });
    toast.add({ title: "Order placed.", type: "success" });
  };

  return (
    <CheckoutReview
      items={items}
      totalPrice={totalPrice}
      isPlacingOrder={isPlacingOrder}
      onPlaceOrder={handlePlaceOrder}
    />
  );
}
