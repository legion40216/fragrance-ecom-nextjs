import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/data";

const COLLECTION_DETAILS: Record<string, { number: string; note: string }> = {
  "mens-fragrances": { number: "01", note: "Bold, grounded, distinctive." },
  "womens-fragrances": { number: "02", note: "Floral, luminous, expressive." },
  "unisex-fragrances": { number: "03", note: "Made to move beyond labels." },
  "oud-collection": { number: "04", note: "Deep woods and warm resins." },
  attars: { number: "05", note: "Tradition in a concentrated drop." },
};

export default function NotesSection() {
  return (
    <section id="heart" className="py-16 sm:py-20 lg:py-24">
      <div className="mb-8 flex items-end justify-between gap-5 border-b pb-5 sm:mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Explore by character</p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">Find your collection.</h2>
        </div>
        <Link href="/categories" className="hidden items-center gap-2 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] sm:inline-flex">
          View all <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => {
          const detail = COLLECTION_DETAILS[category.slug];
          return (
            <Link
              key={category.id}
              href={`/categories?category=${category.slug}`}
              className="group relative flex min-h-56 flex-col justify-between overflow-hidden bg-background p-5 transition-colors hover:bg-muted/60 sm:min-h-64 sm:p-6"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] tracking-[0.16em] text-muted-foreground">{detail.number}</span>
                <ArrowUpRight aria-hidden="true" className="size-4 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
              <div>
                <div className="mb-4 h-px w-8 bg-foreground/40 transition-all duration-300 group-hover:w-14" />
                <h3 className="text-xl leading-snug">{category.name}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail.note}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Discover collection</p>
              </div>
            </Link>
          );
        })}
      </div>
      <Link href="/categories" className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] sm:hidden">
        View all collections <ArrowUpRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
