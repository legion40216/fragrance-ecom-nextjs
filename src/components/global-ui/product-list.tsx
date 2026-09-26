import { ProductsType } from "@/types/types";
import ProductCard from "./product-card";
import EmptyState from "./empty-state";

export default function ProductList({
  initialData,
}: {
  initialData: ProductsType;
}) {
  if (initialData.length === 0) {
    return (
      <EmptyState
        title="No fragrances found"
        subtitle="Try a different category."
      />
    );
  }

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(220px,100%),1fr))]">
      {initialData.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}