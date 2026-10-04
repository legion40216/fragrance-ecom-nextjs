"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

import type { ProductType } from "@/types/types";
import { getProductPath } from "@/utils/product-url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MAX_RESULTS = 5;

export default function SearchDialog({
  products,
}: {
  products: ProductType[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim().toLowerCase();

  const results = trimmedQuery
    ? products
        .filter((product) =>
          [product.name, product.brand, product.description].some((value) =>
            value.toLowerCase().includes(trimmedQuery),
          ),
        )
        .slice(0, MAX_RESULTS)
    : [];

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const goToSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    close();
    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
  };

  const goToProduct = (slug: string) => {
    close();
    router.push(getProductPath(slug));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Search fragrances"
          />
        }
      >
        <Search className="size-5" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Search fragrances</DialogTitle>
          <DialogDescription>
            Search by fragrance name, brand, or description.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            goToSearch();
          }}
          className="flex gap-2"
        >
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search fragrances..."
            maxLength={80}
            aria-label="Search fragrances"
          />
          <Button type="submit" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>
        </form>

        {trimmedQuery && (
          <div className="space-y-3">
            {results.length > 0 ? (
              <>
                <div className="space-y-2">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => goToProduct(product.slug)}
                      className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted"
                    >
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{product.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {product.brand}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                  onClick={goToSearch}
                >
                  See all results
                  <ArrowRight className="size-4" />
                </Button>
              </>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No fragrances found.
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
