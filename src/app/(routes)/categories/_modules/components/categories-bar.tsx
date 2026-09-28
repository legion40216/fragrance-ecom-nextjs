"use client";

import { categories } from "@/data/data";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { CategorySlug } from "@/schema";

import { Button } from "@/components/ui/button";

export default function CategoriesBar({
  categoryParam,
}: {
  categoryParam: CategorySlug;
}) {
  const { update, isPending } = useUpdateSearchParams();

  const handleSelect = (slug?: string) => {
    update({ category: slug ?? null });
  };

  return (
    <div
      className="flex flex-wrap gap-2 transition-opacity aria-busy:opacity-60"
      aria-busy={isPending}
    >
      <Button
        variant={!categoryParam ? "default" : "outline"}
        size="sm"
        onClick={() => handleSelect(undefined)}
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          variant={categoryParam === category.slug ? "default" : "outline"}
          size="sm"
          onClick={() => handleSelect(category.slug)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
