import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden border-b">
      <div className="mx-auto grid min-h-[560px] w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">\n        <div className="contents" items-center gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-16 lg:min-h-[620px]">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            The art of fragrance
          </p>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            Leave a
            <span className="block italic">lasting impression.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Discover refined fragrances crafted for every mood, moment, and
            signature. Find the scent that becomes unmistakably yours.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5">
              Shop fragrances <ArrowRight className="size-4" />
            </Link>
            <Link href="/categories" className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted">
              Explore collections
            </Link>
          </div>
          <div className="mt-12 flex gap-8 border-t pt-6 text-sm">
            <div><p className="font-semibold">Curated scents</p><p className="mt-1 text-muted-foreground">For every occasion</p></div>
            <div><p className="font-semibold">Easy ordering</p><p className="mt-1 text-muted-foreground">Simple & secure</p></div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-8 rounded-full bg-muted/70 blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted">
            <Image src="/assets/product/images/royal-oud.svg" alt="Royal Oud fragrance" fill priority className="object-contain p-10 transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border bg-background/90 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured scent</p>
              <div className="mt-1 flex items-end justify-between gap-4">
                <p className="font-serif text-2xl">Royal Oud</p><p className="text-sm font-medium">Rs. 6,999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
