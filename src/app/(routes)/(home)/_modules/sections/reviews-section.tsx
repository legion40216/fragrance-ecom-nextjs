const reviews = [
  ["★★★★★", "A beautifully simple shopping experience. The fragrance arrived exactly as expected.", "A customer"],
  ["★★★★★", "The product details made it easy to compare scents before choosing.", "A fragrance lover"],
  ["★★★★★", "Packaging was neat and the overall experience felt premium.", "Verified customer"],
  ["★★★★★", "Found a scent I now keep reaching for every day.", "A happy customer"],
];

export default function ReviewsSection() {
  return (
    <section className="bg-[#f7f6f3] px-[5%] py-20 text-center md:py-24">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Customer love</p>
      <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Let customers speak for us</h2>
      <div className="mx-auto mt-11 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map(([stars, quote, name]) => (
          <article key={name} className="bg-white p-7 text-left">
            <div className="text-xs tracking-[0.25em]">{stars}</div>
            <p className="mt-5 min-h-20 text-sm leading-6 text-muted-foreground">“{quote}”</p>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.12em]">{name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
