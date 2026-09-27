import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/data";

export default function CategorySection() {
  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] 
            text-muted-foreground"
          >
            Find your signature
          </p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
            Shop by collection
          </h2>
        </div>
        <Link
          href="/categories"
          className="hidden items-center gap-1 text-sm font-medium 
            underline-offset-4 hover:underline sm:flex"
        >
          View all <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/categories?category=${category.slug}`}
            className="group relative min-h-48 overflow-hidden rounded-2xl 
              border bg-muted p-5 transition-transform hover:-translate-y-1"
          >
            <div className="absolute -right-8 -top-8 size-28 rounded-full 
              border border-foreground/10 transition-transform duration-500 
              group-hover:scale-150" 
            />
            <div className="relative flex h-full flex-col justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                0{index + 1}
              </span>

              <div>
                <h3 className="font-serif text-2xl">{category.name}</h3>

                <p className="mt-2 text-sm leading-5 text-muted-foreground">
                  {category.description}
                </p>
                
                <span className="mt-4 inline-flex text-sm font-medium">
                  Explore <ArrowUpRight className="ml-1 size-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/categories"
        className="mt-5 flex items-center justify-center gap-1 text-sm 
          font-medium sm:hidden"
      >
        View all collections <ArrowUpRight className="size-4" />
      </Link>
    </section>
  );
}
