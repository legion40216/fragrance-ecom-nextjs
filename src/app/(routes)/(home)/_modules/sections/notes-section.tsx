import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/global-ui/section-header";
import { categories, products } from "@/data/data";

export default function CollectionsSection() {
  const collections = categories.slice(0, 3).map((category) => ({
    ...category,
    image: products.find((product) => product.category === category.slug)
      ?.image,
  }));

  return (
    <section id="collections" className="py-12 sm:py-16">
      <SectionHeader
        title="Collections"
        href="/categories"
        linkLabel="View all"
      />
      <div className="grid gap-3 sm:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/categories?category=${collection.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[3/4]">
              {collection.image && (
                <Image
                  src={collection.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              )}
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-xl">{collection.name}</h3>
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Explore
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
