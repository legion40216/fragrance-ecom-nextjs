import Link from "next/link";
import { categories, products } from "@/data/data";
import ProductCard from "@/components/global-ui/product-card";
import {
  getProductPathWithListingContext,
  serializeListingContext,
} from "@/utils/listing-context";

// Colored strip shown at the top of each collection card
const NOTE_ACCENTS: Record<string, string> = {
  "mens-fragrances": "#5B4636",
  "womens-fragrances": "#8C4B4A",
  "unisex-fragrances": "#7C7263",
  "oud-collection": "#21121B",
  attars: "#A9834C",
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
  const listingContext = serializeListingContext({ source: "featured" });

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
            {/* Accent strip */}
            <span
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: NOTE_ACCENTS[category.slug] }}
            />

            <div className="flex h-full flex-col justify-between pt-4">
              <h3 className="font-serif text-xl leading-tight">
                {category.name}
              </h3>

              {/* min-h keeps 2-line and 3-line descriptions aligned */}
              <p className="min-h-15 text-xs leading-5 text-[#241A16]/60">
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
            <ProductCard
              key={product.id}
              {...product}
              href={getProductPathWithListingContext(
                product.slug,
                undefined,
                listingContext,
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
