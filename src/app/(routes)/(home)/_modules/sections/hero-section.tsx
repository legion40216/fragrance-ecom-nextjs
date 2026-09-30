import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/data";

export default function HeroSection() {
  const heroProduct = products.find((p) => p.id === "royal-oud-01");

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#F3ECE2] px-6 pb-16 pt-20 text-[#241A16] sm:px-10 lg:px-24 lg:pl-40 lg:pt-28"
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="max-w-md text-sm leading-6 text-[#241A16]/60">
            Every fragrance opens with a first impression — sharp, bright,
            unmistakable. This is ours.
          </p>
          <h1 className="mt-6 max-w-xl font-serif text-6xl leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
            Scent, composed
            <br />
            in three acts.
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/products"
              className="inline-flex items-center border-b border-[#241A16] pb-1 text-sm font-medium"
            >
              Shop the collection
            </Link>
            <span className="text-sm text-[#241A16]/50">
              {products.length} fragrances, five collections
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#241A16]/15 bg-[#EAE1D3] lg:ml-auto">
            <Image
              src="/assets/home/signature-scent-hero.svg"
              alt="Aurelia signature scent collection"
              fill
              priority
              className="object-cover object-right"
            />
          </div>
          {heroProduct && (
            <p className="mt-4 text-sm text-[#241A16]/60 lg:text-right">
              Featured — {heroProduct.name}, {heroProduct.brand}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
