"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import type { ProductType } from "@/types/types";
import { formatter } from "@/utils/formatters";
import { getProductPath } from "@/utils/product-url";
import { getLowestPrice } from "@/utils/product-variants";
import { searchProducts } from "@/utils/search-products";

const MAX_SUGGESTIONS = 5;

export default function SearchDialog({
  products,
}: {
  products: ProductType[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const results = searchProducts(products, trimmed).slice(0, MAX_SUGGESTIONS);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setQuery("");
  };

  const go = (href: string) => {
    handleOpenChange(false);
    router.push(href);
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Search fragrances"
        aria-keyshortcuts="Control+K Meta+K"
        onClick={() => setOpen(true)}
      >
        <Search className="size-5" />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="Search fragrances"
        description="Search by name, brand, collection, or fragrance notes."
      >
        <Command shouldFilter={false} loop>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search fragrances, brands, collections..."
            maxLength={80}
          />

          <CommandList>
            {trimmed && results.length === 0 && (
              <CommandEmpty>No fragrances match “{trimmed}”.</CommandEmpty>
            )}

            {trimmed && results.length > 0 && (
              <CommandGroup>
                <CommandItem
                  value="__see-all__"
                  onSelect={() =>
                    go(`/products?q=${encodeURIComponent(trimmed)}`)
                  }
                >
                  <ArrowRight />
                  See all results for “{trimmed}”
                </CommandItem>
              </CommandGroup>
            )}

            {results.length > 0 && (
              <CommandGroup heading="Fragrances">
                {results.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.id}
                    onSelect={() => go(getProductPath(product.slug))}
                  >
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {product.brand}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-muted-foreground">
                      From {formatter.format(getLowestPrice(product))}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
