import Link from "next/link";
import { categories } from "@/data/data";

const CARD_BACKGROUND =
  "/assets/product/images/Warm%20Brown%20Gradient%20with%20Soft%20Circles.png";

const NOTE_ACCENTS: Record<string, string> = {
  "mens-fragrances": "#A9834C",
  "womens-fragrances": "#A9834C",
  "unisex-fragrances": "#A9834C",
  "oud-collection": "#A9834C",
  attars: "#A9834C",
};

export default function CollectionsSection() {
  return (
    <section id="collections" className="py-12 sm:py-16">
      <div className="mb-7 flex items-baseline justify-between gap-4 border-b pb-4 sm:mb-9">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Find your notes
          </p>
          <h2 className="font-serif text-3xl leading-tight">Collections</h2>
        </div>
        <Link
          href="/categories"
          className="text-[11px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
        >
          View all
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group relative h-72 w-44 shrink-0 overflow-hidden rounded-sm border border-foreground/10 bg-muted p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:w-full lg:shrink"
          >
            <img
              src={CARD_BACKGROUND}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: NOTE_ACCENTS[category.slug] ?? "#A9834C" }}
            />
            <span
              className="absolute inset-x-0 bottom-0 h-1.5"
              style={{ backgroundColor: NOTE_ACCENTS[category.slug] ?? "#A9834C" }}
            />
            <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/5" />
            <div className="relative z-10 flex h-full flex-col justify-between pt-4">
              <h3 className="font-serif text-xl leading-tight text-white">
                {category.name}
              </h3>
              <p className="min-h-15 text-xs leading-5 text-white/90">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
