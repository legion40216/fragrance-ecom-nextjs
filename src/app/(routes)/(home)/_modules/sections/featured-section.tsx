import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/data";
import ProductCard from "@/components/global-ui/product-card";

export default function FeaturedSection() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);

  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Handpicked for you
          </p>

          <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
            Signature scents
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Our featured fragrances — selected to give your collection a
            distinctive starting point.
          </p>
        </div>

        <Link
          href="/products"
          className="hidden items-center gap-2 text-sm font-medium sm:flex"
        >
          Shop all <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {featured.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <Link
        href="/products"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium sm:hidden"
      >
        Shop all fragrances <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}
