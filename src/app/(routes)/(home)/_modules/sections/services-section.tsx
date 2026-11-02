import { Compass, PackageCheck, Sparkles } from "lucide-react";

const services = [
  {
    title: "Thoughtful delivery",
    copy: "Carefully packed, delivered to your door.",
    Icon: PackageCheck,
  },
  {
    title: "A considered selection",
    copy: "Distinctive scents for every kind of day.",
    Icon: Sparkles,
  },
  {
    title: "Find your signature",
    copy: "Explore notes that feel unmistakably yours.",
    Icon: Compass,
  },
];

export default function ServicesSection() {
  return (
    <section className="grid gap-8 border-b py-10 sm:grid-cols-3 sm:gap-6">
      {services.map(({ title, copy, Icon }) => (
        <div key={title} className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center border border-border text-foreground">
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em]">
              {title}
            </h2>
            <p className="mt-2 max-w-xs text-xs leading-6 text-muted-foreground">
              {copy}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
