import Link from "next/link";
import { categories } from "@/data/data";

const visualStyles = [
  "bg-gradient-to-br from-neutral-950 via-neutral-800 to-stone-500",
  "bg-gradient-to-br from-rose-100 via-stone-200 to-stone-500",
];

export default function CategorySection() {
  const visibleCategories = categories.slice(0, 2);

  return (
    <section className="px-[5%] py-20 text-center md:py-24">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Try before you buy</p>
      <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Find the fragrance that fits you.</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Explore different fragrance collections and take your time finding your next signature scent.</p>
      <div className="mx-auto mt-11 grid max-w-6xl gap-5 text-left sm:grid-cols-2">
        {visibleCategories.map((category, index) => (
          <Link key={category.id} href={`/categories?category=${category.slug}`} className="group overflow-hidden border border-border bg-muted/30">
            <div className={`relative h-[300px] overflow-hidden ${visualStyles[index]}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-6xl text-white/20 transition-transform duration-500 group-hover:scale-110">{index === 0 ? "M" : "W"}</span>
              </div>
              <span className="absolute left-5 top-5 bg-white px-2 py-1 text-[9px] uppercase tracking-[0.14em]">Collection 0{index + 1}</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-sm tracking-[0.08em]">{category.name.toUpperCase()}</h3>
              <span className="mt-2 block text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Explore collection →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
