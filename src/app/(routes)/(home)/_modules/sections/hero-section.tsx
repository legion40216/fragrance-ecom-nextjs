import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/data";
import { formatter } from "@/utils/formatters";

export default function HeroSection() {
  const hero = products.find((product) => product.id === "royal-oud-01");

  return (
    <section className="bg-[#E9EEEA] px-6 pb-20 pt-14 md:px-14 md:pt-20">
      <p className="mb-8 text-sm text-[#1F1712]/60">Top note</p>

      <div className="grid items-end gap-14 md:grid-cols-[1.25fr_0.75fr]">
        <div>
          <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-5xl leading-[1.03] sm:text-6xl lg:text-7xl">
            Scent that stays after you leave.
          </h1>

          <p className="mt-6 max-w-md leading-7 text-[#1F1712]/70">
            Oud, amber, rose and musk, in full 100ml bottles and pocket-size
            attars.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link
              href="/products"
              className="rounded-md bg-[#1F1712] px-6 py-3 text-sm font-medium text-[#E9EEEA] transition-colors hover:bg-[#3A2A20]"
            >
              Shop all fragrances
            </Link>
            <Link
              href="#collections"
              className="text-sm font-medium underline underline-offset-4"
            >
              Browse collections
            </Link>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-sm">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-[#D3DCD6]">
            <Image
              src="/assets/product/images/royal-oud.svg"
              alt={hero?.name ?? "Featured fragrance"}
              fill
              priority
              className="object-contain p-12"
            />
          </div>
          <figcaption className="mt-3 flex justify-between text-sm">
            <span>{hero?.name ?? "Royal Oud"}</span>
            <span className="text-[#1F1712]/60">
              {hero ? formatter.format(hero.price) : ""}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
