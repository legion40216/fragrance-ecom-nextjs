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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {initialData.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
