import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/data";

const categoryStyles: Record<string, string> = {
  "mens-fragrances": "bg-[#24211d]",
  "womens-fragrances": "bg-[#d9c9c5]",
  "unisex-fragrances": "bg-[#d8d5cb]",
  "oud-collection": "bg-[#51483e]",
  attars: "bg-[#b8a58d]",
};

export default function CategorySection() {
  return (
    <section className="px-0 pt-20 md:pt-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Explore by mood
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            Find your collection.
          </h2>
        </div>
        <Link
          href="/categories"
          className="hidden items-center gap-1 text-sm font-medium sm:flex"
        >
          View all
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/categories?category=${category.slug}`}
            className={`group relative min-h-[260px] overflow-hidden rounded-[1.5rem] p-6 text-white ${categoryStyles[category.slug] ?? "bg-muted text-foreground"}`}
          >
            <div className="absolute -right-10 -top-10 size-40 rounded-full border border-white/15 transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute -bottom-16 -right-6 size-44 rounded-full border border-white/10" />

            <div className="relative flex h-full flex-col justify-between">
              <span className="text-xs tracking-[0.2em] text-white/55">
                0{index + 1}
              </span>

              <div>
                <h3 className="max-w-[10rem] font-serif text-2xl leading-tight">
                  {category.name}
                </h3>
                <p className="mt-3 text-xs leading-5 text-white/65">
                  {category.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em]">
                  Explore
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
