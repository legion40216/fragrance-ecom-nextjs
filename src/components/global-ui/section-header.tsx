import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

export default function SectionHeader({
  title,
  href,
  linkLabel,
}: SectionHeaderProps) {
  return (
    <div className="mb-7 flex items-baseline justify-between gap-4 border-b pb-4 sm:mb-9">
      <h2 className="font-serif text-3xl leading-tight">{title}</h2>
      {href && linkLabel && (
        <Link
          href={href}
          className="text-[11px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
