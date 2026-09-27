import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/data";
import { formatter } from "@/utils/formatters";

export default function BaseSection() {
  const spotlight = products.find((p) => p.id === "rose-attar-01") ?? products[products.length - 1];

  return (
    <section id="base" className="bg-[#21121B] px-6 py-24 text-[#F3ECE2] sm:px-10 lg:px-24 lg:pl-40">
      <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="max-w-sm text-sm leading-6 text-[#F3ECE2]/55">
            Long after the first spray fades, the base note stays — on skin, on fabric, in memory.
          </p>
          <p className="mt-8 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
            The fragrances people ask you about a week later.
          </p>
          <Link href="/products" className="mt-10 inline-flex items-center rounded-full border border-[#A9834C] px-7 py-3 text-sm font-medium text-[#F3ECE2] transition-colors hover:bg-[#A9834C] hover:text-[#21121B]">
            Find yours
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute inset-4 rounded-full border border-[#A9834C]/40" />
          <div className="relative aspect-square overflow-hidden rounded-full border border-[#A9834C]/70 bg-[#35202C] p-10">
            <Image src={spotlight.image} alt={spotlight.name} fill className="object-contain p-6" />
          </div>
          <div className="mt-6 text-center">
            <p className="font-serif text-xl">{spotlight.name}</p>
            <p className="mt-1 text-sm text-[#F3ECE2]/60">{formatter.format(spotlight.price)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
