import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandSection() {
  return (
    <section className="my-2 overflow-hidden border-y bg-muted/30">
      <div className="grid md:grid-cols-2">
        <div className="flex min-h-[320px] flex-col items-start justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">The fragrance wardrobe</p>
          <h2 className="mt-5 max-w-lg text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            A little ritual. A lasting impression.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
            We believe fragrance should feel personal. Explore expressive florals, modern fresh notes, rich oud, and traditional attars — each with its own character.
          </p>
          <Link href="/products" className="mt-8 inline-flex min-h-11 items-center gap-3 border border-foreground px-5 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-foreground hover:text-background">
            Find your fragrance <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-secondary/50 px-8 py-12 sm:min-h-[360px]">
          <div className="absolute inset-5 border border-foreground/10 sm:inset-8" />
          <div className="relative grid w-full max-w-sm grid-cols-2 gap-3">
            {[
              ["01", "The first impression", "Bright, fresh top notes"],
              ["02", "The heart", "Floral and aromatic"],
              ["03", "The lasting note", "Warm woods and amber"],
              ["04", "Your signature", "A scent that feels like you"],
            ].map(([number, title, copy]) => (
              <div key={number} className="min-h-32 border border-foreground/10 bg-background/65 p-4 backdrop-blur-sm sm:p-5">
                <span className="text-[10px] text-muted-foreground">{number}</span>
                <h3 className="mt-5 text-sm">{title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
