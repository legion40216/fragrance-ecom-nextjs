import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="grid gap-10 py-10 sm:grid-cols-2 sm:gap-12 sm:py-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-8">
        <div className="max-w-sm">
          <Link href="/" className="inline-block text-2xl tracking-[0.2em]">ATELIER</Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
            Fragrance with character. Discover a scent that feels distinctly yours.
          </p>
          <Link href="/products" className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em]">
            Explore fragrances <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.18em]">Discover</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><Link className="transition-colors hover:text-foreground" href="/products">All fragrances</Link></li>
            <li><Link className="transition-colors hover:text-foreground" href="/categories">Collections</Link></li>
            <li><Link className="transition-colors hover:text-foreground" href="/products?sort=newest">New arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.18em]">Collections</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {categories.slice(0, 4).map((category) => (
              <li key={category.id}>
                <Link className="transition-colors hover:text-foreground" href={`/categories?category=${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.18em]">Need a hand?</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Have a question about a fragrance or finding the right scent? We’re happy to help.
          </p>
          <Link href="/products" className="mt-3 inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground">
            Browse the catalogue <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t py-5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Atelier. All rights reserved.</p>
        <p>Made for the moments that stay.</p>
      </div>
    </footer>
  );
}
