import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/data";

export default function HeroSection() {
  const heroProduct = products.find((product) => product.id === "royal-oud-01") ?? products[0];

  return (
    <section id="top" className="overflow-hidden">
      <div className="grid gap-3 md:min-h-[540px] md:grid-cols-2">
        <div className="flex min-h-[420px] flex-col items-start justify-center bg-[#24211F] px-6 py-14 text-[#F5F0E8] sm:px-10 sm:py-20 lg:px-16 xl:px-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#C8BDAE]">
            The art of fragrance
          </p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Scent, composed
            <br />
            in three acts.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#F5F0E8]/70 sm:text-base">
            Fragrances with character, chosen to leave an impression long after the moment has passed.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/products"
              className="inline-flex min-h-12 items-center gap-4 border border-[#F5F0E8] px-5 text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:bg-[#F5F0E8] hover:text-[#24211F]"
            >
              Explore fragrances <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <span className="text-xs text-[#F5F0E8]/55">{products.length} fragrances to discover</span>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden bg-[#E8E0D4] sm:min-h-[440px] md:min-h-full">
          {heroProduct && (
            <Image
              src={heroProduct.image}
              alt={heroProduct.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-8 transition-transform duration-700 hover:scale-[1.03] sm:p-12 lg:p-16"
            />
          )}
          <div className="pointer-events-none absolute inset-4 border border-[#24211F]/15 sm:inset-6" />
          {heroProduct && (
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8">
              <div className="bg-[#F5F0E8]/90 px-4 py-3 text-[#24211F] backdrop-blur-sm">
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#24211F]/60">Featured fragrance</p>
                <p className="mt-1 text-sm">{heroProduct.name}</p>
              </div>
              <span className="pb-3 text-[10px] uppercase tracking-[0.18em] text-[#24211F]/70">01 / Signature</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
