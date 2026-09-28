"use client";

import { useState, useSyncExternalStore } from "react";
import { ProductsType } from "@/types/types";
import ProductCard from "@/components/global-ui/product-card";
import EmptyState from "@/components/global-ui/empty-state";
import { Button } from "@/components/ui/button";
import { GRID_COLUMNS_COOKIE, type GridColumns } from "./grid-columns";

// 3 columns is desktop-only, so on smaller screens it clamps to 2.
const gridClasses: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
};

const columnOptions: { value: GridColumns; label: string }[] = [
  { value: 1, label: "Single column" },
  { value: 2, label: "Two columns" },
  { value: 3, label: "Three columns" },
];

// Tells the browser how wide each card renders so it fetches a suitably
// sized image. Approximate on purpose (layout has a sidebar from `md`).
const cardSizes: Record<GridColumns, string> = {
  1: "(min-width: 768px) 75vw, 100vw",
  2: "(min-width: 768px) 38vw, 50vw",
  3: "(min-width: 768px) 25vw, 50vw",
};

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function ColumnsIcon({ columns }: { columns: GridColumns }) {
  const gap = 2;
  const width = (16 - gap * (columns - 1)) / columns;

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {Array.from({ length: columns }).map((_, i) => (
        <rect
          key={i}
          x={i * (width + gap)}
          y={2}
          width={width}
          height={12}
          rx={1.5}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export default function ProductList({
  initialData,
  initialColumns,
}: {
  initialData: ProductsType;
  initialColumns: GridColumns;
}) {
  // Saved preference (read from a cookie on the server, so there is no
  // first-paint jump). Never overwritten by viewport changes.
  const [columns, setColumns] = useState<GridColumns>(initialColumns);

  // Matches Tailwind's `md` breakpoint.
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // What is actually shown, so the highlighted button matches the real grid.
  const activeColumns: GridColumns = columns === 3 && !isDesktop ? 2 : columns;

  const handleGridChange = (value: GridColumns) => {
    setColumns(value);

    // A cookie (not localStorage) so the server can render the saved layout.
    // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API isn't supported in all browsers yet
    document.cookie = `${GRID_COLUMNS_COOKIE}=${value}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
  };

  if (initialData.length === 0) {
    return (
      <EmptyState
        title="No fragrances found"
        subtitle="Try a different category."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {initialData.length}{" "}
          {initialData.length === 1 ? "product" : "products"}
        </p>

        <div
          className="flex items-center gap-1 rounded-lg border bg-muted/40 p-1"
          role="group"
          aria-label="Product grid layout"
        >
          {columnOptions.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              size="icon"
              variant={activeColumns === value ? "secondary" : "ghost"}
              aria-pressed={activeColumns === value}
              aria-label={label}
              title={label}
              onClick={() => handleGridChange(value)}
              className={`h-8 w-8 ${value === 3 ? "hidden md:inline-flex" : ""}`}
            >
              <ColumnsIcon columns={value} />
            </Button>
          ))}
        </div>
      </div>

      <div
        className={`grid gap-4 transition-[grid-template-columns] duration-300 ease-out ${gridClasses[columns]}`}
      >
        {initialData.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            sizes={cardSizes[activeColumns]}
          />
        ))}
      </div>
    </div>
  );
}
