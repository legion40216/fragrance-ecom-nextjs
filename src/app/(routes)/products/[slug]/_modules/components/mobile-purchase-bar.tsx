import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProductVariant } from "@/types/types";
import { formatter } from "@/utils/formatters";
import QuantityStepper from "./quantity-stepper";

// Sticky bar above the mobile bottom nav. Hidden from md up.
export default function MobilePurchaseBar({
  selectedVariant,
  quantity,
  maxQuantity,
  isSoldOut,
  inCart,
  onQuantityChange,
  onToggleCart,
}: {
  selectedVariant: ProductVariant;
  quantity: number;
  maxQuantity: number;
  isSoldOut: boolean;
  inCart: boolean;
  onQuantityChange: (next: number) => void;
  onToggleCart: () => void;
}) {
  return (
    <section
      className="fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-40 border-t bg-background/95 px-3 py-2 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.35)] backdrop-blur supports-[backdrop-filter]:bg-background/90 md:hidden"
      aria-label="Quick purchase"
    >
      <div className="mx-auto flex max-w-[1200px] items-center gap-2">
        <div className="min-w-0 shrink-0">
          <p className="text-[10px] leading-tight text-muted-foreground">
            {selectedVariant.size}
            {isSoldOut ? " · Sold out" : " · In stock"}
          </p>
          <p className="text-sm font-semibold tabular-nums">
            {formatter.format(selectedVariant.price)}
          </p>
        </div>

        <QuantityStepper
          variant="compact"
          quantity={quantity}
          max={maxQuantity}
          disabled={isSoldOut}
          onChange={onQuantityChange}
        />

        <Button
          type="button"
          size="lg"
          className="min-w-0 flex-1 gap-1.5 px-2 text-xs sm:text-sm"
          disabled={isSoldOut || inCart}
          onClick={onToggleCart}
        >
          {inCart ? (
            <>
              <Check className="size-4 shrink-0" />
              <span>Added</span>
            </>
          ) : isSoldOut ? (
            "Out of stock"
          ) : (
            <>
              <ShoppingCart className="size-4 shrink-0" />
              <span>Add to cart</span>
            </>
          )}
        </Button>
      </div>
    </section>
  );
}
