"use client";

import { ZoomIn } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useImageZoom } from "@/hooks/use-image-zoom";
import type { ProductType } from "@/types/types";

interface ProductZoomButtonProps {
  product: ProductType;
}

export default function ProductZoomButton({ product }: ProductZoomButtonProps) {
  const { isZoomed, imageStyle, toggle, pan, reset } = useImageZoom();

  return (
    <Dialog onOpenChange={reset}>
      <DialogTrigger
        render={
          <Button
            variant="secondary"
            size="icon"
            aria-label={`Zoom ${product.name} image`}
            className="absolute right-4 bottom-4 z-10 touch-manipulation shadow"
          />
        }
      >
        <ZoomIn />
      </DialogTrigger>

      <DialogContent
        className="w-[min(100%-2rem,64rem)] gap-3 p-4 sm:max-w-none"
        showCloseButton
      >
        <DialogTitle>{product.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Enlarged image of {product.name}. Click or tap the image to zoom in
          and out.
        </DialogDescription>

        <button
          type="button"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          onClick={toggle}
          onPointerMove={pan}
          className={`relative aspect-square w-full overflow-hidden rounded-md bg-neutral-100 ${
            isZoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in"
          }`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            draggable={false}
            className="select-none object-contain transition-transform duration-200"
            style={imageStyle}
          />
        </button>
      </DialogContent>
    </Dialog>
  );
}
