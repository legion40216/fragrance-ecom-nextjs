"use client";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { sortOptions } from "@/data/constants";
import type { FilterValue } from "@/schema";
import { useUpdateSearchParams } from "../hooks/use-update-search-params";

export default function ProductListFilter({
  currentFilter,
}: {
  currentFilter: FilterValue;
}) {
  const { update, isPending } = useUpdateSearchParams();

  return (
    <NativeSelect
      value={currentFilter}
      aria-busy={isPending}
      onChange={(event) => update({ filter: event.target.value })}
    >
      {sortOptions.map((option) => (
        <NativeSelectOption key={option.value} value={option.value}>
          {option.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}

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
