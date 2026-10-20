import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/data";

export default function HeroSection() {
  const heroProduct = products.find((product) => product.id === "royal-oud-01");

  return (
    <section id="top" className="relative overflow-hidden border-b bg-muted/40">
      <div className="grid min-h-[520px] items-stretch md:min-h-[600px] md:grid-cols-[1fr_0.92fr]">
        <div className="flex flex-col items-start justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            The art of fragrance
          </p>
          <h1 className="mt-6 max-w-xl text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Scent, composed
            <br />
            in three acts.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            Fragrances with character, crafted to leave an impression long after the moment has passed.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/products" className="inline-flex min-h-12 items-center gap-4 bg-foreground px-6 text-xs font-medium uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-85">
              Shop the collection <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <span className="text-xs text-muted-foreground">{products.length} fragrances to discover</span>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden bg-secondary/60 md:min-h-full">
          {heroProduct && (
            <Image
              src={heroProduct.image}
              alt={heroProduct.name}
              fill
              priority
              sizes="(min-width: 768px) 46vw, 100vw"
              className="object-contain p-10 transition-transform duration-700 hover:scale-[1.03] sm:p-14 lg:p-20"
            />
          )}
          <div className="pointer-events-none absolute inset-5 border border-foreground/10 sm:inset-8" />
          {heroProduct && (
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8">
              <div className="bg-background/90 px-4 py-3 backdrop-blur-sm">
                <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Featured fragrance</p>
                <p className="mt-1 text-sm">{heroProduct.name}</p>
              </div>
              <span className="pb-3 text-[10px] uppercase tracking-[0.18em] text-foreground/70">01 / Signature</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
