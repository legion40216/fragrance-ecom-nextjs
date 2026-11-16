import { Button } from "@/components/ui/button";
import type { ProductSize, ProductVariant } from "@/types/types";

export default function SizeSelector({
  variants,
  selectedSize,
  onSelect,
}: {
  variants: ProductVariant[];
  selectedSize: ProductSize;
  onSelect: (size: ProductSize) => void;
}) {
  const soldOut = variants.filter((variant) => variant.stock === 0);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Size</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <Button
            key={variant.size}
            type="button"
            variant={selectedSize === variant.size ? "default" : "outline"}
            size="sm"
            aria-label={
              variant.stock === 0
                ? `${variant.size}, out of stock`
                : variant.size
            }
            title={variant.stock === 0 ? "Out of stock" : undefined}
            onClick={() => onSelect(variant.size)}
          >
            {variant.size}
          </Button>
        ))}
      </div>
      {soldOut.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {soldOut.map((variant) => `${variant.size} out of stock`).join(" • ")}
        </p>
      )}
    </div>
  );
}
