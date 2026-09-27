"use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { sortOptions } from "@/data/constants";
// import type { FilterValue } from "@/schema";

// export default function ProductListFilter({
//   currentFilter,
// }: {
//   currentFilter: FilterValue;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const handleFilterChange = (value: string | null) => {
//     if (value === null) return;

//     const params = new URLSearchParams(searchParams.toString());
//     params.set("filter", value);
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   return (
//     <Select value={currentFilter} onValueChange={handleFilterChange}>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Sort" />
//       </SelectTrigger>
//       <SelectContent>
//         {sortOptions.map((option) => (
//           <SelectItem key={option.value} value={option.value}>
//             {option.label}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// }

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
  return (
    <NativeSelect defaultValue={currentFilter}>
      <NativeSelectOption value="newest">
        Newest
      </NativeSelectOption>

      <NativeSelectOption value="oldest">
        Oldest
      </NativeSelectOption>

      <NativeSelectOption value="price_low_high">
        Price: Low to High
      </NativeSelectOption>

      <NativeSelectOption value="price_high_low">
        Price: High to Low
      </NativeSelectOption>
    </NativeSelect>
  );
}