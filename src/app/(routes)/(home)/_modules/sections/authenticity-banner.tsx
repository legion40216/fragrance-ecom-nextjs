import Link from "next/link";

export default function AuthenticityBanner() {
  return (
    <section className="bg-foreground px-[7%] py-16 text-background md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-background/45">Authenticity guaranteed</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-medium sm:text-5xl">100% Original Fragrances Only.</h2>
          <p className="mt-3 text-sm text-background/60">No compromises — just carefully selected fragrances.</p>
          <Link href="/products" className="mt-7 inline-block border border-background/40 px-6 py-3 text-[10px] uppercase tracking-[0.14em]">Browse collection</Link>
        </div>
        <div className="relative flex size-36 shrink-0 items-center justify-center rounded-full border border-background/35 font-serif text-3xl">
          100%
          <span className="absolute mt-20 font-sans text-[8px] uppercase tracking-[0.2em]">Original</span>
        </div>
      </div>
    </section>
  );
}
