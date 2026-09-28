"use client";

import type { FilterValue } from "@/schema";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { sortOptions } from "@/data/constants";
import { useUpdateSearchParams } from "@/features/product-listing/hooks/use-update-search-params";

export default function ProductListFilter({
  currentFilter,
}: {
  currentFilter: FilterValue;
}) {
  const { updateParams, isPending } = useUpdateSearchParams();

  const handleFilterChange = (value: string) => {
    updateParams({ filter: value });
  };

  return (
    <NativeSelect
      value={currentFilter}
      onChange={(event) => handleFilterChange(event.target.value)}
    >
      <NativeSelectOption value="newest">Newest</NativeSelectOption>
      <NativeSelectOption value="oldest">Oldest</NativeSelectOption>
      <NativeSelectOption value="price_low_high">
        Price: Low to High
      </NativeSelectOption>
      <NativeSelectOption value="price_high_low">
        Price: High to Low
      </NativeSelectOption>
    </NativeSelect>
  );
}
