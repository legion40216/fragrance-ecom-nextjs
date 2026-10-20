import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/data";

export default function BrandSection() {
  const storyProduct = products.find((product) => product.id === "amber-night-01") ?? products[0];

  return (
    <section className="my-2 overflow-hidden border-y">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden bg-[#E8E0D4] sm:min-h-[420px] md:min-h-[520px]">
          {storyProduct && (
            <Image
              src={storyProduct.image}
              alt={storyProduct.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-10 sm:p-14 lg:p-20"
            />
          )}
          <div className="pointer-events-none absolute inset-4 border border-[#24211F]/15 sm:inset-6" />
          <div className="absolute bottom-7 left-7 bg-[#F5F0E8]/90 px-4 py-3 text-[#24211F] backdrop-blur-sm sm:bottom-9 sm:left-9">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#24211F]/60">The fragrance wardrobe</p>
            {storyProduct && <p className="mt-1 text-sm">{storyProduct.name}</p>}
          </div>
        </div>

        <div className="flex min-h-[360px] flex-col items-start justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16 xl:px-20">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">A note on finding your scent</p>
          <h2 className="mt-5 max-w-lg font-serif text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            A fragrance, chosen with intention.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
            Fragrance is personal. Explore expressive florals, modern fresh notes, rich oud, and traditional attars — each with its own character, ready to become part of your everyday ritual.
          </p>
          <Link href="/products" className="mt-8 inline-flex min-h-11 items-center gap-3 border border-foreground px-5 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-foreground hover:text-background">
            Explore all fragrances <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
