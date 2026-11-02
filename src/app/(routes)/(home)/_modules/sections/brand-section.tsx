import Image from "next/image";
import CtaLink from "@/components/global-ui/cta-link";

export default function BrandSection() {
  return (
    <section className="full-bleed bg-muted">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[320px] bg-border md:min-h-[520px]">
          <Image
            src="/assets/product/images/royal-oud.svg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-5 px-6 py-12 sm:px-10 md:px-14 md:py-16 lg:px-20">
          <h2 className="max-w-md font-serif text-4xl leading-[1.05] sm:text-[40px]">
            A little ritual. A lasting impression.
          </h2>
          <p className="max-w-md text-[13px] leading-7">
            We believe fragrance should feel personal. Explore expressive
            florals, modern fresh notes, rich oud, and traditional attars, each
            with its own character.
          </p>
          <CtaLink href="/products">Explore all fragrances</CtaLink>
        </div>
      </div>
    </section>
  );
}
