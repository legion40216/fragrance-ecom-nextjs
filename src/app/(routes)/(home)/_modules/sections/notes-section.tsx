import Link from "next/link";
import { categories, products } from "@/data/data";
import ProductCard from "@/components/global-ui/product-card";

// Colored strip shown at the top of each collection card
const NOTE_ACCENTS: Record<string, string> = {
  "mens-fragrances": "#A9834C",
  "womens-fragrances": "#A9834C",
  "unisex-fragrances": "#A9834C",
  "oud-collection": "#A9834C",
  attars: "#A9834C",
};

const CATEGORY_IMAGES: Record<string, string> = {
  "mens-fragrances": "/assets/product/images/noir-essence.svg",
  "womens-fragrances": "/assets/product/images/velvet-bloom.svg",
  "unisex-fragrances": "/assets/product/images/ocean-veil.svg",
  "oud-collection": "/assets/product/images/royal-oud.svg",
  attars: "/assets/product/images/royal-rose-attar.svg",
};

// Section wrapper styles
const sectionClasses = [
  "bg-[#F3ECE2] text-[#241A16]",
  "px-6 py-20 sm:px-10 lg:px-24 lg:pl-40",
].join(" ");

// Collection card styles (same height + width for every card)
const cardClasses = [
  "group relative h-72 w-44 shrink-0 overflow-hidden",
  "rounded-sm border border-[#241A16]/10 bg-[#EAE1D3] p-5",
].join(" ");

export default function NotesSection() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section id="heart" className={sectionClasses}>
      {/* Intro text */}
      <div className="mb-12 max-w-md">
        <p className="text-sm leading-6 text-[#241A16]/60">
          Underneath every top note is the heart — the part that decides
          whether a fragrance belongs to you.
        </p>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
          Five collections, one shelf.
        </h2>
      </div>

      {/* Collection cards: horizontally scrollable on mobile, grid on large screens */}
      <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className={`${cardClasses} lg:w-full lg:shrink`}
          >
            <img
              src={CATEGORY_IMAGES[category.slug]}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-32 w-32
                -translate-x-1/2 -translate-y-1/2 object-contain"
            />
            {/* Accent strip */}
            <span
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: NOTE_ACCENTS[category.slug] }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between pt-4">
              <h3 className="font-serif text-xl leading-tight">
                {category.name}
              </h3>

              {/* min-h keeps 2-line and 3-line descriptions aligned */}
              <p className="min-h-15 text-xs leading-5 text-[#FFFFFF]/100">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured products */}
      <div className="mt-20">
        <h3 className="font-serif text-3xl sm:text-4xl">Selected for you</h3>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
