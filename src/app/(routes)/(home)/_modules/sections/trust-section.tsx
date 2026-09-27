import { Check, Sparkles, Truck } from "lucide-react";

const points = [
  {
    icon: Sparkles,
    title: "Curated collection",
    description: "A focused selection instead of an overwhelming catalog.",
  },
  {
    icon: Check,
    title: "Clear product details",
    description: "Browse notes, sizes, prices, and availability before choosing.",
  },
  {
    icon: Truck,
    title: "Simple ordering",
    description: "A straightforward path from fragrance discovery to checkout.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative mt-20 overflow-hidden rounded-[2rem] bg-foreground px-6 py-12 text-background md:mt-28 md:px-12 md:py-16">
      <div className="absolute -right-24 -top-24 size-64 rounded-full border border-background/10" />
      <div className="absolute -bottom-32 left-1/3 size-72 rounded-full border border-background/5" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-background/50">
            Take your time
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            The right fragrance should feel personal.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-background/65">
            Browse by collection, compare your options, and open each fragrance
            for the details that matter before you decide.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {points.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-background/10 bg-background/5 p-4">
              <Icon className="size-4 text-background/70" />
              <p className="mt-4 text-sm font-medium">{title}</p>
              <p className="mt-1 text-xs leading-5 text-background/55">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
