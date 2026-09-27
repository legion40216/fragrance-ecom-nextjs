import Link from "next/link";
import { products } from "@/data/data";
import ProductCard from "@/components/global-ui/product-card";

export default function FeaturedSection() {
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 4);

  return (
    <section className="mx-auto max-w-[1450px] px-[5%] py-20 md:py-24">
      <div className="mb-9 flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Special selection</p>
          <h2 className="mt-2 font-serif text-4xl font-medium sm:text-5xl">Featured Fragrances</h2>
        </div>
        <Link href="/products" className="border-b border-foreground pb-1 text-[10px] uppercase tracking-[0.12em]">View all →</Link>
      </div>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {featuredProducts.map((product) => <ProductCard key={product.id} {...product} />)}
      </div>
    </section>
  );
}
