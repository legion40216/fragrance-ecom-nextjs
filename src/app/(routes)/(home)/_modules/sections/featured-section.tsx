import Link from "next/link";
import { products } from "@/data/data";
import ProductCard from "@/components/global-ui/product-card";

export default function FeaturedSection() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
          Signature scents
        </h2>
        <Link href="/products" className="text-sm font-medium underline underline-offset-4">
          Shop all
        </Link>
      </div>

      <div className="-mx-6 mt-8 flex snap-x gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
        {featured.map((product) => (
          <div
            key={product.id}
            className="w-[68%] shrink-0 snap-start rounded-lg bg-white/50 sm:w-[40%] md:w-auto"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
}
