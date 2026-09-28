import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function BrandSection() {
  return (
    <section
      className="overflow-hidden rounded-[2rem] border 
      bg-foreground text-background"
    >
      <div
        className="grid items-center gap-10 p-7 sm:p-10 
        md:grid-cols-[1.2fr_0.8fr] md:p-14"
      >
        <div>
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full
            border border-background/20 px-3 py-1.5 text-xs 
            uppercase tracking-[0.2em] text-background/70"
          >
            <Sparkles className="size-3.5" /> Your signature, your story
          </div>

          <h2
            className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl
            md:text-6xl"
          >
            Fragrance is more than a scent.
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-background/65">
            It is the detail people remember. Explore warm ouds, fresh everyday
            scents, elegant florals, and concentrated attars made for moments
            worth remembering.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full 
              bg-background px-6 py-3 text-sm font-medium text-foreground 
              transition-transform hover:-translate-y-0.5"
          >
            Find your fragrance <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ["01", "Everyday", "Fresh, clean, effortless"],
            ["02", "Evening", "Warm, deep, memorable"],
            ["03", "Luxury", "Rich oud & amber"],
            ["04", "Traditional", "Classic concentrated attars"],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-2xl border border-background/15 p-5"
            >
              <span className="text-xs text-background/45">{number}</span>
              <p className="mt-8 font-medium">{title}</p>
              <p className="mt-1 text-xs leading-5 text-background/55">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
