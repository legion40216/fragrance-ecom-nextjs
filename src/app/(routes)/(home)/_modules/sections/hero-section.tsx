import Image from "next/image";
import CtaLink from "@/components/global-ui/cta-link";
import { products } from "@/data/data";

// Swap for a real campaign photograph when one is available.
const HERO_IMAGE =
  "/assets/product/images/Warm Brown Gradient with Soft Circles.png";

export default function HeroSection() {
  const heroProduct =
    products.find((product) => product.id === "royal-oud-01") ?? products[0];

  return (
    <section
      id="top"
      className="full-bleed relative flex min-h-[520px] items-end overflow-hidden bg-foreground md:min-h-[620px]"
    >
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/35 to-foreground/10" />

      {heroProduct && (
        <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
          <Image
            src={heroProduct.image}
            alt={heroProduct.name}
            fill
            sizes="50vw"
            className="object-contain p-16"
          />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-12 text-background sm:px-10 md:px-0 md:py-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-background/80">
          The art of fragrance
        </p>
        <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
          Scent, composed in three acts.
        </h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-background/80">
          Fragrances with character, chosen to leave an impression long after
          the moment has passed.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <CtaLink
            href="/products"
            className="border-background bg-background text-foreground hover:bg-background/90"
          >
            Explore fragrances
          </CtaLink>
          <CtaLink
            href="/products?sort=newest"
            className="border-background bg-transparent text-background hover:bg-background hover:text-foreground"
          >
            Shop new arrivals
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
