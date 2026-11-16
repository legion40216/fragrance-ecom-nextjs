import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

// "default" is the full-size stepper in the details column,
// "compact" is the one inside the mobile purchase bar.
export default function QuantityStepper({
  quantity,
  max,
  disabled,
  onChange,
  variant = "default",
}: {
  quantity: number;
  max: number;
  disabled: boolean;
  onChange: (next: number) => void;
  variant?: "default" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <div
      className={
        compact
          ? "flex shrink-0 items-center rounded-md border"
          : "flex w-fit items-center rounded-md border"
      }
    >
      <Button
        type="button"
        variant="ghost"
        size={compact ? "icon-sm" : "icon"}
        className={compact ? "size-8" : undefined}
        disabled={disabled || quantity <= 1}
        onClick={() => onChange(quantity - 1)}
        aria-label="Decrease quantity"
      >
        <Minus className={compact ? "size-3.5" : undefined} />
      </Button>
      {compact ? (
        <output
          className="w-6 text-center text-xs font-medium tabular-nums"
          aria-live="polite"
          aria-label={`Quantity: ${quantity}`}
        >
          {quantity}
        </output>
      ) : (
        <span className="w-10 text-center text-sm">{quantity}</span>
      )}
      <Button
        type="button"
        variant="ghost"
        size={compact ? "icon-sm" : "icon"}
        className={compact ? "size-8" : undefined}
        disabled={disabled || quantity >= max}
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
      >
        <Plus className={compact ? "size-3.5" : undefined} />
      </Button>
    </div>
  );
}
