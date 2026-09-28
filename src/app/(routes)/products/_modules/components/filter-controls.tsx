"use client";

import { useEffect, useState } from "react";

import { categories, brands } from "@/data/data";
import { PRICE_BOUNDS, PRICE_STEP } from "@/data/constants";
import type { CategorySlug } from "@/schema";
import { formatter } from "@/utils/formatters";
import { useUpdateSearchParams } from "@/features/product-listing/hooks/use-update-search-params";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export interface FilterControlsProps {
  categoryParam: CategorySlug;
  minPrice: number;
  maxPrice: number;
  brandParam: string[];
  inStockParam: boolean;
  onChange?: () => void;
}

export default function FilterControls({
  categoryParam,
  minPrice,
  maxPrice,
  brandParam,
  inStockParam,
  onChange,
}: FilterControlsProps) {
  const { updateParams, clear, isPending } = useUpdateSearchParams();

  const [priceDraft, setPriceDraft] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    setPriceDraft([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleUpdate = (updates: Record<string, string | null>) => {
    updateParams(updates);
    onChange?.();
  };

  const handleCategoryChange = (slug: string) => {
    handleUpdate({ category: slug === "all" ? null : slug });
  };

  const handlePriceCommit = (value: number | readonly number[]) => {
    if (typeof value === "number") return;

    const [min, max] = value;
    handleUpdate({
      minPrice: min === PRICE_BOUNDS.min ? null : String(min),
      maxPrice: max === PRICE_BOUNDS.max ? null : String(max),
    });
  };

  const handleBrandToggle = (brand: string) => {
    const next = brandParam.includes(brand)
      ? brandParam.filter((item) => item !== brand)
      : [...brandParam, brand];

    handleUpdate({ brand: next.length ? next.join(",") : null });
  };

  const handleInStockToggle = (checked: boolean) => {
    handleUpdate({ inStock: checked ? "true" : null });
  };

  const handleClearAll = () => {
    clear();
    onChange?.();
  };

  const hasActiveFilters =
    !!categoryParam ||
    minPrice !== PRICE_BOUNDS.min ||
    maxPrice !== PRICE_BOUNDS.max ||
    brandParam.length > 0 ||
    inStockParam;

  return (
    <div className="space-y-6" aria-busy={isPending}>
      <div>
        <h2 className="font-medium">Filters</h2>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Category</Label>
        <RadioGroup
          value={categoryParam ?? "all"}
          onValueChange={handleCategoryChange}
          disabled={isPending}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="cat-all" />
            <Label htmlFor="cat-all" className="font-normal cursor-pointer">
              All
            </Label>
          </div>

          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <RadioGroupItem value={category.slug} id={`cat-${category.id}`} />
              <Label
                htmlFor={`cat-${category.id}`}
                className="font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Price</Label>
        <Slider
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={PRICE_STEP}
          value={priceDraft}
          onValueChange={(value) => setPriceDraft(value as [number, number])}
          onValueCommitted={handlePriceCommit}
          className="mt-2"
          disabled={isPending}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatter.format(priceDraft[0])}</span>
          <span>{formatter.format(priceDraft[1])}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Brand</Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-3">
              <Checkbox
                id={`brand-${brand}`}
                checked={brandParam.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
                disabled={isPending}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="font-normal cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox
          id="in-stock"
          checked={inStockParam}
          onCheckedChange={(checked) => handleInStockToggle(!!checked)}
          disabled={isPending}
        />
        <Label htmlFor="in-stock" className="font-normal cursor-pointer">
          In stock only
        </Label>
      </div>

      <div className="flex justify-end">
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearAll} disabled={isPending}>
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
