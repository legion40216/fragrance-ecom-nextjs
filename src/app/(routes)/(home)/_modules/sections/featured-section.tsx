import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/data";
import ProductCard from "@/components/global-ui/product-card";

export default function FeaturedSection() {
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 4);

  return (
    <section className="pt-20 md:pt-28">
      <div className="mb-9 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Curated for you
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            Featured fragrances
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            A small selection to start exploring the collection.
          </p>
        </div>

        <Link
          href="/products"
          className="hidden items-center gap-2 text-sm font-medium sm:flex"
        >
          Shop all
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
