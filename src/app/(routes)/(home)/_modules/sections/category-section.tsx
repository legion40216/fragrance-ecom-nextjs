import Link from "next/link";
import { categories } from "@/data/data";

export default function CategorySection() {
  return (
    <section id="collections" className="scroll-mt-8">
      <p className="mb-8 text-sm text-[#1F1712]/60">Heart</p>

      <h2 className="max-w-xl font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
        Start with a collection
      </h2>

      <ul className="mt-10 border-t border-[#1F1712]/20">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/products?category=${category.slug}`}
              className="grid gap-1 border-b border-[#1F1712]/20 py-5 transition-colors hover:bg-[#1F1712] hover:text-[#E7CFC8] md:grid-cols-[1fr_1.2fr] md:items-baseline md:px-4"
            >
              <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">
                {category.name}
              </span>
              <span className="text-sm opacity-70">{category.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
