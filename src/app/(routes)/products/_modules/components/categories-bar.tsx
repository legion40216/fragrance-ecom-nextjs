"use client";

import { categories } from "@/data/data";
import { useRouter, useSearchParams } from "next/navigation";
import { CategorySlug } from "@/schema";

import { Button } from "@/components/ui/button";

export default function CategoriesBar({
  categoryParam,
}: {
  categoryParam: CategorySlug;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }

    const query = params.toString();
    router.replace(query ? `/?${query}` : "/");
  };

  return (
    <div className="flex flex-wrap gap-2">
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