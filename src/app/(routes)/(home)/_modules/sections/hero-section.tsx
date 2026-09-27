import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative -mx-2 overflow-hidden bg-[#eee9e1] md:-mx-0">
      <div className="grid min-h-[650px] items-center lg:grid-cols-2">
        <div className="px-6 py-20 sm:px-10 md:px-14 lg:px-[10%]">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Authentic fragrance • discover before you buy
          </p>
          <h1 className="font-serif text-6xl font-medium leading-[0.93] tracking-tight sm:text-7xl lg:text-[5.25rem]">
            Find Your
            <br />
            <em>Signature Scent</em>
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Explore a curated collection of premium fragrances and discover
            the scent that feels right before committing to a full bottle.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex bg-foreground px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-80"
          >
            Shop fragrances
          </Link>
        </div>
        <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden lg:min-h-[650px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_45%)]" />
          <div className="relative h-[390px] w-[300px] sm:h-[450px] sm:w-[350px]">
            <Image src="/assets/product/images/royal-oud.svg" alt="Royal Oud" fill priority className="object-contain drop-shadow-[25px_35px_45px_rgba(0,0,0,0.25)]" />
          </div>
          <div className="absolute bottom-8 left-1/2 w-[calc(100%-3rem)] max-w-sm -translate-x-1/2 border border-black/10 bg-white/80 p-4 backdrop-blur">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Featured fragrance</p>
            <div className="mt-1 flex items-center justify-between gap-4">
              <span className="font-serif text-xl">Royal Oud</span>
              <Link href="/products/royal-oud-01" className="text-[10px] uppercase tracking-[0.12em] underline underline-offset-4">Discover</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
