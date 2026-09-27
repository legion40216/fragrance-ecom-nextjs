import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative -mx-2 overflow-hidden border-b bg-[#f4f1eb] md:-mx-0">
      <div className="grid min-h-[680px] items-center lg:grid-cols-[1.05fr_0.95fr]">
        <div className="px-6 py-20 sm:px-10 md:px-14 lg:px-20 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              <Sparkles className="size-3.5" />
              Curated fragrance collection
            </div>

            <h1 className="font-serif text-5xl leading-[0.94] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Find the scent
              <span className="block italic">that feels like you.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore refined fragrances, from everyday signatures to rich oud
              and traditional attars. Take your time and discover what fits
              your style.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                Shop fragrances
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/categories"
                className="inline-flex items-center rounded-full border border-foreground/20 bg-background/50 px-6 py-3 text-sm font-medium transition-colors hover:bg-background"
              >
                Explore collections
              </Link>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-2 gap-6 border-t border-foreground/10 pt-6 text-sm sm:grid-cols-3">
              <div>
                <p className="font-semibold">Curated scents</p>
                <p className="mt-1 text-muted-foreground">For every mood</p>
              </div>
              <div>
                <p className="font-semibold">Men & women</p>
                <p className="mt-1 text-muted-foreground">Plus unisex picks</p>
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold">Oud & attar</p>
                <p className="mt-1 text-muted-foreground">Traditional notes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden bg-[#ded7ca] lg:min-h-[680px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.9),transparent_34%)]" />

          <div className="absolute inset-x-8 top-8 flex justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/50 sm:inset-x-12">
            <span>Fragrance No. 01</span>
            <span>Signature</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative aspect-[4/5] w-full max-w-[390px]">
              <Image
                src="/assets/product/images/royal-oud.svg"
                alt="Royal Oud"
                fill
                priority
                className="object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur-md sm:inset-x-10">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Featured fragrance
            </p>
            <div className="mt-1 flex items-end justify-between gap-4">
              <div>
                <p className="font-serif text-2xl">Royal Oud</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Deep oud, amber & soft woods
                </p>
              </div>
              <Link
                href="/products/royal-oud-01"
                className="text-xs font-medium underline underline-offset-4"
              >
                Discover
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
