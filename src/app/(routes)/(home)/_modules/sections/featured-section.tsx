import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/data";
import ProductCard from "@/components/global-ui/product-card";

export default function FeaturedSection() {
  const bestsellers = products.filter((product) => product.isBestSeller).slice(0, 4);

  return (
    <section className="pb-16 sm:pb-20 lg:pb-24">
      <div className="mb-8 flex items-end justify-between gap-4 border-b pb-5 sm:mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Customer favourites</p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">Bestsellers</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
            Fragrances people return to, chosen for their distinctive character.
          </p>
        </div>
        <Link href="/products" className="hidden items-center gap-2 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] sm:inline-flex">
          View all <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-4 md:gap-y-10">
        {bestsellers.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <Link href="/products" className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-border text-[10px] font-medium uppercase tracking-[0.14em] transition-colors hover:border-foreground sm:hidden">
        View all fragrances <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
