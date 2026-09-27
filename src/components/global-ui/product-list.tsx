"use client";

import { useEffect, useState } from "react";
import { ProductsType } from "@/types/types";
import ProductCard from "./product-card";
import EmptyState from "./empty-state";
import { Button } from "@/components/ui/button";

type GridColumns = 1 | 2 | 3;

const STORAGE_KEY = "product-grid-columns";

const gridClasses: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
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
}: {
  initialData: ProductsType;
}) {
  const [columns, setColumns] = useState<GridColumns>(3);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (isGridColumns(saved)) {
        setColumns(Number(saved) as GridColumns);
      }
    } catch {
      // Ignore storage errors and keep the default.
    }
  }, []);

  const handleGridChange = (value: GridColumns) => {
    setColumns(value);

    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // Preference just won't persist this session.
    }
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
              variant={columns === value ? "secondary" : "ghost"}
              aria-pressed={columns === value}
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
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
