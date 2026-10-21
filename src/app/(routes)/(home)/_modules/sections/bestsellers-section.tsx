import ProductCard from "@/components/global-ui/product-card";
import SectionHeader from "@/components/global-ui/section-header";
import { products } from "@/data/data";

export default function BestsellersSection() {
  const bestsellers = products
    .filter((product) => product.isBestSeller)
    .slice(0, 4);

  if (bestsellers.length === 0) return null;

  return (
    <section className="pb-12 sm:pb-16">
      <SectionHeader
        eyebrow="Loved by fragrance enthusiasts"
        title="Bestsellers"
        href="/products"
        linkLabel="View all"
      />
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4">
        {bestsellers.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
