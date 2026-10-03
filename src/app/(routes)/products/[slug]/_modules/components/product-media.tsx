"use client";

import { ZoomIn } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProductType } from "@/types/types";
import { getInitialSize } from "@/utils/product-url";

import ProductSoldOutOverlay from "./product-sold-out-overlay";

interface ProductMediaProps {
  product: ProductType;
}

export default function ProductMedia({ product }: ProductMediaProps) {
  const searchParams = useSearchParams();
  const sizeParam = searchParams.get("size") ?? undefined;
  const selectedSize = getInitialSize(product, sizeParam);
  const selectedVariant =
    product.variants.find((variant) => variant.size === selectedSize) ??
    product.variants[0];
  const isSoldOut = selectedVariant.stock === 0;

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-neutral-100">
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-contain p-8"
        priority
      />

      {!isSoldOut && (
        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant="secondary"
                className="absolute right-4 bottom-4 z-10 touch-manipulation shadow"
              />
            }
          >
            <ZoomIn />
            Zoom image
          </DialogTrigger>

          <DialogContent
            className="w-[min(100%-2rem,64rem)] gap-3 p-4 sm:max-w-none"
            showCloseButton
          >
            <DialogTitle>{product.name} image</DialogTitle>
            <DialogDescription>
              Enlarged product image for {product.name}.
            </DialogDescription>
            <div className="relative aspect-square w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <ProductSoldOutOverlay product={product} />
    </div>
  );
}
