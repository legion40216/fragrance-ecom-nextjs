import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/data";

export default function NotesSection() {
  const collections = categories.slice(0, 3);

  return (
    <section id="collections" className="py-16 sm:py-20 lg:py-24">
      <div className="mb-7 flex items-end justify-between gap-5 border-b pb-4 sm:mb-9">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Explore by character</p>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Collections</h2>
        </div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
        >
          View all <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {collections.map((category, index) => (
          <Link
            key={category.id}
            href={`/categories?category=${category.slug}`}
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden bg-muted p-5 text-foreground transition-colors hover:bg-muted/80 sm:min-h-72 sm:p-7 lg:min-h-80 lg:p-8"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] uppercase tracking-[0.16em] text-foreground/55">
                0{index + 1} / Collection
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 -translate-x-1 translate-y-1 text-foreground/65 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              />
            </div>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-5 font-serif text-[8rem] leading-none text-foreground/[0.07] transition-transform duration-500 group-hover:scale-110 sm:right-6 sm:top-6 sm:text-[10rem] lg:text-[12rem]"
            >
              {category.name.trim().charAt(0).toUpperCase()}
            </span>

            <div className="relative mt-16">
              <h3 className="max-w-[15ch] font-serif text-2xl leading-tight sm:text-3xl">
                {category.name}
              </h3>
              <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em]">
                Explore <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
