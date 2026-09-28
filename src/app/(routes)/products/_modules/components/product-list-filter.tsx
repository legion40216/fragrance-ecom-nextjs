"use client";

import type { FilterValue } from "@/schema";
import { sortOptions } from "@/data/constants";
import { useUpdateSearchParams } from "../hooks/use-update-search-params";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export default function ProductListFilter({
  currentFilter,
}: {
  currentFilter: FilterValue;
}) {
  const { updateParams, isPending } = useUpdateSearchParams();

  return (
    <NativeSelect
      value={currentFilter}
      disabled={isPending}
      onChange={(event) => updateParams({ filter: event.target.value })}
    >
      {sortOptions.map((option) => (
        <NativeSelectOption key={option.value} value={option.value}>
          {option.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
