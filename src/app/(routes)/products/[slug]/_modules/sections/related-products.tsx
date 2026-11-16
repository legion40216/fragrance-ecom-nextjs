import ProductCard from "@/components/global-ui/product-card";
import { products } from "@/data/data";
import type { ProductType } from "@/types/types";

const RELATED_LIMIT = 4;

// Same-category products first, then other products to fill the row, since
// some categories only hold two or three fragrances.
function getRelatedProducts(product: ProductType): ProductType[] {
  const others = products.filter((item) => item.id !== product.id);
  const sameCategory = others.filter(
    (item) => item.category === product.category,
  );
  const rest = others.filter((item) => item.category !== product.category);

  return [...sameCategory, ...rest].slice(0, RELATED_LIMIT);
}

export default function RelatedProducts({ product }: { product: ProductType }) {
  const related = getRelatedProducts(product);

  if (related.length === 0) return null;

  return (
    <section
      className="space-y-4 pt-6 md:pt-12"
      aria-labelledby="related-products"
    >
      <h2 id="related-products" className="font-serif text-2xl tracking-tight">
        You may also like
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {related.map((item) => (
          <ProductCard
            key={item.id}
            {...item}
            sizes="(min-width: 768px) 25vw, 50vw"
          />
        ))}
      </div>
    </section>
  );
}
