import Link from "next/link";

export default function BrandSection() {
  return (
    <section className="bg-[#151515] px-[6%] py-16 text-background md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <h2 className="font-serif text-3xl">FRAGRANCE STORE</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-background/50">Premium fragrances and carefully selected scents for every occasion.</p>
        </div>
        <div><h3 className="text-[10px] font-semibold uppercase tracking-[0.16em]">Need help?</h3><Link className="mt-4 block text-xs text-background/55" href="/contact">Contact</Link><Link className="mt-2 block text-xs text-background/55" href="/about">About</Link></div>
        <div><h3 className="text-[10px] font-semibold uppercase tracking-[0.16em]">Shop</h3><Link className="mt-4 block text-xs text-background/55" href="/products">All fragrances</Link><Link className="mt-2 block text-xs text-background/55" href="/categories">Collections</Link></div>
        <div><h3 className="text-[10px] font-semibold uppercase tracking-[0.16em]">Information</h3><p className="mt-4 text-xs leading-5 text-background/55">Simple ordering.<br />Clear product details.</p></div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-background/10 pt-5 text-[10px] text-background/35">© 2026 Fragrance Store. All rights reserved.</div>
    </section>
  );
}
