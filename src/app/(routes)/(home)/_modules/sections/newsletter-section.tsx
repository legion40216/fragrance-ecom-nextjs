import NewsletterForm from "../components/newsletter-form";

export default function NewsletterSection() {
  return (
    <section className="grid gap-10 border-b py-14 md:grid-cols-2 md:gap-12 md:py-20">
      <div>
        <h2 className="max-w-md font-serif text-3xl leading-tight sm:text-4xl">
          New scents reach our clients first
        </h2>
        <p className="mt-3 max-w-sm text-[13px] leading-6 text-muted-foreground">
          One letter each month: new arrivals, private offers, nothing else.
        </p>
      </div>
      <NewsletterForm />
    </section>
  );
}
