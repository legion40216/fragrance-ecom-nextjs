import { categories } from "@/data/categories";
import type { ProductType, ProductVariant } from "@/types/types";
import { isLowStock } from "@/utils/product-variants";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 p-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

export default function ProductSpecs({
  product,
  selectedVariant,
}: {
  product: ProductType;
  selectedVariant: ProductVariant;
}) {
  const categoryName =
    categories.find((category) => category.slug === product.category)?.name ??
    product.category;

  const availability =
    selectedVariant.stock === 0
      ? "Sold out"
      : isLowStock(selectedVariant.stock)
        ? `Only ${selectedVariant.stock} left`
        : "In stock";

  return (
    <div className="divide-y rounded-lg border text-sm">
      <Row label="Size" value={selectedVariant.size} />
      <Row
        label="SKU"
        value={`${product.id}-${selectedVariant.size}`.toUpperCase()}
      />
      <Row label="Availability" value={availability} />
      <Row label="Category" value={categoryName} />
    </div>
  );
}
