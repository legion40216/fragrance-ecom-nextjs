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
      disabled={isPending}
    >
      {sortOptions.map((option) => (
        <NativeSelectOption key={option.value} value={option.value}>
          {option.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
