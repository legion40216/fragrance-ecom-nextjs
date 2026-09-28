import Link from "next/link";

const stages = [
  ["Top", "Citrus, green notes", "You notice these first. They fade within the hour."],
  ["Heart", "Rose, jasmine", "They arrive as the top fades and carry the scent for hours."],
  ["Base", "Oud, amber, vanilla, musk", "What is left on your skin at the end of the day."],
];

export default function BrandSection() {
  return (
    <section className="bg-[linear-gradient(to_bottom,#E7CFC8,#241813_10rem)] px-6 pb-24 pt-40 text-[#F1E2CF] md:px-14">
      <p className="mb-8 text-sm text-[#F1E2CF]/60">Base</p>

      <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl">
        What lingers is what people remember.
      </h2>

      <p className="mt-6 max-w-xl leading-7 text-[#F1E2CF]/70">
        Every bottle here opens light, settles into flowers or woods, and dries
        down to oud, amber or musk. Check the notes before you choose.
      </p>

      <dl className="mt-14 grid gap-8 border-t border-[#F1E2CF]/20 pt-8 md:grid-cols-3">
        {stages.map(([stage, notes, text]) => (
          <div key={stage}>
            <dt className="font-[family-name:var(--font-display)] text-2xl text-[#D69A3A]">
              {stage}
            </dt>
            <dd className="mt-2 font-medium">{notes}</dd>
            <dd className="mt-1 text-sm leading-6 text-[#F1E2CF]/60">{text}</dd>
          </div>
        ))}
      </dl>

      <Link
        href="/products"
        className="mt-14 inline-block rounded-md bg-[#D69A3A] px-6 py-3 text-sm font-medium text-[#241813] transition-colors hover:bg-[#E3AE57]"
      >
        Shop all fragrances
      </Link>
    </section>
  );
}
