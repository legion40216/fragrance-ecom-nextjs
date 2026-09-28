"use client";

import { useSyncExternalStore } from "react";
import type { ProductsType } from "@/types/types";
import ProductCard from "@/components/global-ui/product-card";
import EmptyState from "@/components/global-ui/empty-state";
import { Button } from "@/components/ui/button";

type GridColumns = 1 | 2 | 3;

const STORAGE_KEY = "product-grid-columns";
const GRID_EVENT = "product-grid-columns-change";

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

function isGridColumns(value: string | null): value is `${GridColumns}` {
  return value === "1" || value === "2" || value === "3";
}

function subscribeToGridColumns(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(GRID_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(GRID_EVENT, callback);
  };
}

function readGridColumns(): GridColumns {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (isGridColumns(saved)) {
      return Number(saved) as GridColumns;
    }
  } catch {
    // Ignore storage errors and use the default.
  }

  return 3;
}

function useGridColumns() {
  const columns = useSyncExternalStore<GridColumns>(
    subscribeToGridColumns,
    readGridColumns,
    () => 3,
  );

  const setColumns = (value: GridColumns) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // Preference just won't persist this session.
    }

    window.dispatchEvent(new Event(GRID_EVENT));
  };

  return [columns, setColumns] as const;
}

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
      {[0, 1, 2].slice(0, columns).map((i) => (
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
}: {
  initialData: ProductsType;
}) {
  const [columns, setColumns] = useGridColumns();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const activeColumns: GridColumns = columns === 3 && !isDesktop ? 2 : columns;

  if (initialData.length === 0) {
    return (
      <EmptyState
        title="No fragrances found"
        subtitle="Try adjusting or clearing your filters."
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

        <fieldset className="m-0 flex min-w-0 items-center gap-1 rounded-lg border bg-muted/40 p-1">
          <legend className="sr-only">Product grid layout</legend>
          {columnOptions.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              size="icon"
              variant={activeColumns === value ? "secondary" : "ghost"}
              aria-pressed={activeColumns === value}
              aria-label={label}
              title={label}
              onClick={() => setColumns(value)}
              className={`h-8 w-8 ${value === 3 ? "hidden md:inline-flex" : ""}`}
            >
              <ColumnsIcon columns={value} />
            </Button>
          ))}
        </fieldset>
      </div>

      <div
        className={`grid gap-4 transition-[grid-template-columns] duration-300 ease-out ${gridClasses[columns]}`}
      >
        {initialData.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
