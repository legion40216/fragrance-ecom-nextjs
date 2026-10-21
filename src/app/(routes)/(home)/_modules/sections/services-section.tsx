const services = [
  {
    title: "Thoughtful delivery",
    copy: "Carefully packed, delivered to your door.",
  },
  {
    title: "A considered selection",
    copy: "Distinctive scents for every kind of day.",
  },
  {
    title: "Find your signature",
    copy: "Explore notes that feel unmistakably yours.",
  },
];

export default function ServicesSection() {
  return (
    <section className="grid gap-8 border-b py-10 sm:grid-cols-3 sm:gap-6">
      {services.map(({ title, copy }) => (
        <div key={title}>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em]">
            {title}
          </h2>
          <p className="mt-2 max-w-xs text-xs leading-6 text-muted-foreground">
            {copy}
          </p>
        </div>
      ))}
    </section>
  );
}
