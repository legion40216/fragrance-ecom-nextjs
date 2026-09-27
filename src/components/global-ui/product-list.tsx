"use client";

import { useEffect, useState } from "react";
import { ProductsType } from "@/types/types";
import ProductCard from "./product-card";
import EmptyState from "./empty-state";
import { Button } from "@/components/ui/button";

type GridColumns = 1 | 2 | 3;

const gridClasses: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

const gridOptions: GridColumns[] = [1, 2, 3];

export default function ProductList({
  initialData,
}: {
  initialData: ProductsType;
}) {
  const [columns, setColumns] = useState<GridColumns>(3);

  useEffect(() => {
    const savedColumns = window.localStorage.getItem("product-grid-columns");

    if (savedColumns === "1" || savedColumns === "2" || savedColumns === "3") {
      setColumns(Number(savedColumns) as GridColumns);
    }
  }, []);

  const handleGridChange = (value: GridColumns) => {
    setColumns(value);
    window.localStorage.setItem("product-grid-columns", String(value));
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
      <div className="flex items-center justify-end">
        <div
          className="flex items-center gap-1 rounded-lg border p-1"
          role="group"
          aria-label="Product grid layout"
        >
          {gridOptions.map((value) => (
            <Button
              key={value}
              type="button"
              size="sm"
              variant={columns === value ? "secondary" : "ghost"}
              aria-pressed={columns === value}
              aria-label={`${value} by ${value} product grid`}
              title={`${value} by ${value} product grid`}
              onClick={() => handleGridChange(value)}
            >
              {value} × {value}
            </Button>
          ))}
        </div>
      </div>

      <div className={`grid gap-4 ${gridClasses[columns]}`}>
        {initialData.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
