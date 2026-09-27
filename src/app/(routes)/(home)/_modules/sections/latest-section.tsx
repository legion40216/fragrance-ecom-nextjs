import { products } from "@/data/data";
import ProductCard from "@/components/global-ui/product-card";

export default function LatestSection() {
  const latestProducts = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);

  return (
    <section className="mx-auto max-w-[1450px] px-[5%] py-20 md:py-24">
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">New arrival</p>
        <h2 className="mt-2 font-serif text-4xl font-medium sm:text-5xl">Latest Arrivals</h2>
      </div>
      <div className="mb-7 flex items-center justify-between border-y py-3">
        <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{latestProducts.length} fragrances</span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Newest</span>
      </div>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {latestProducts.map((product) => <ProductCard key={product.id} {...product} />)}
      </div>
    </section>
  );
}
