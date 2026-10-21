import { ArrowRight, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import BrandSection from "../sections/brand-section";
import FeaturedSection from "../sections/featured-section";
import HeroSection from "../sections/hero-section";
import NotesSection from "../sections/notes-section";

export default function HomepageView() {
  return (
    <div className="relative">
      <HeroSection />
      <NotesSection />
      <FeaturedSection />

      <BrandSection />

      <section className="grid gap-8 border-y py-8 sm:grid-cols-3 sm:gap-6">
        {[
          { icon: PackageCheck, title: "Thoughtful delivery", copy: "Carefully packed, delivered to your door." },
          { icon: ShieldCheck, title: "A considered selection", copy: "Distinctive scents for every kind of day." },
          { icon: Sparkles, title: "Find your signature", copy: "Explore notes that feel unmistakably yours." },
        ].map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex flex-col items-start gap-3 px-1">
            <Icon aria-hidden="true" className="size-5 text-muted-foreground" strokeWidth={1.4} />
            <div>
              <h2 className="text-sm font-medium">{title}</h2>
              <p className="mt-1.5 max-w-xs text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="my-10 flex flex-col items-start justify-between gap-6 bg-muted/50 px-6 py-10 sm:px-10 md:flex-row md:items-center md:py-14">
        <div className="max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">A note from us</p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">Make scent part of your story.</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
            From bright everyday blends to deep, lingering oud, find a fragrance worth coming back to.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center gap-3 border border-foreground px-5 text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
        >
          Explore fragrances <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </section>
    </div>
  );
}
