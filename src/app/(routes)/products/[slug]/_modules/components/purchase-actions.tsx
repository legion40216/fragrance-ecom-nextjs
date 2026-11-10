import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

// Desktop buttons. On mobile the same actions live in MobilePurchaseBar.
export default function PurchaseActions({
  isSoldOut,
  inCart,
  onToggleCart,
  onBuyNow,
}: {
  isSoldOut: boolean;
  inCart: boolean;
  onToggleCart: () => void;
  onBuyNow: () => void;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <Button
        type="button"
        size="lg"
        className="hidden md:inline-flex"
        variant={inCart ? "outline" : "default"}
        disabled={isSoldOut}
        onClick={onToggleCart}
      >
        <ShoppingCart />
        {isSoldOut
          ? "Out of Stock"
          : inCart
            ? "Remove from cart"
            : "Add to cart"}
      </Button>

      <Button
        type="button"
        size="lg"
        variant="outline"
        disabled={isSoldOut}
        onClick={onBuyNow}
      >
        Buy it now
      </Button>
    </div>
  );
}
