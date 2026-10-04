"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatter } from "@/utils/formatters";

type OrderSummaryProps = {
  totalPrice: number;
  isEmpty: boolean;
  isPlacingOrder: boolean;
  onPlaceOrder: () => void;
};

export default function OrderSummary({
  totalPrice,
  isEmpty,
  isPlacingOrder,
  onPlaceOrder,
}: OrderSummaryProps) {
  // Stripe is not available yet, so Cash on Delivery is the only choice
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          {formatter.format(totalPrice)}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-4 text-base font-medium text-gray-900">
          Payment Method
        </h3>
        <RadioGroup
          className="space-y-2"
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(String(value))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="stripe" id="stripe" disabled />
            <Label htmlFor="stripe">Pay with Stripe *Coming soon</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod">Cash on Delivery</Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        className="mt-6 w-full"
        disabled={isEmpty || isPlacingOrder}
        onClick={onPlaceOrder}
      >
        {isPlacingOrder ? "Placing order..." : "Place Order"}
      </Button>
    </div>
  );
}
