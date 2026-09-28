"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FilterValue } from "@/schema";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export default function ProductListFilter({
  currentFilter,
}: {
  currentFilter: FilterValue;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", value);
    router.replace(`${pathname}?${params.toString()}`);
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
