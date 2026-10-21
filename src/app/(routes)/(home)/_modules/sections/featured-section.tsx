import ProductCard from "@/components/global-ui/product-card";
import SectionHeader from "@/components/global-ui/section-header";
import { products } from "@/data/data";

export default function JustArrivedSection() {
  const arrivals = [...products]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 8);

  return (
    <section className="pb-12 sm:pb-16">
      <SectionHeader
        title="Just arrived"
        href="/products?sort=newest"
        linkLabel="All new in"
      />
      <div className="-mx-2 flex snap-x gap-3 overflow-x-auto px-2 pb-2 md:mx-0 md:px-0">
        {arrivals.map((product) => (
          <div
            key={product.id}
            className="w-[44vw] max-w-60 shrink-0 snap-start sm:w-60"
          >
            <ProductCard {...product} sizes="240px" />
          </div>
        ))}
      </div>
    </section>
  );
}
