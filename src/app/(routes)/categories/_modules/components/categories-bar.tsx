"use client";

import { categories } from "@/data/data";
import { useUpdateSearchParams } from "@/features/product-listing/hooks/use-update-search-params";
import type { CategorySlug } from "@/schema";
import { Button } from "@/components/ui/button";

export default function CategoriesBar({
  categoryParam,
}: {
  categoryParam: CategorySlug;
}) {
  const { update } = useUpdateSearchParams();

  const handleSelect = (slug?: string) => {
    update({ category: slug ?? null });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!categoryParam ? "default" : "outline"}
        size="sm"
        onClick={() => handleSelect()}
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
