"use client";

import { ZoomIn } from "lucide-react";
import Image from "next/image";
import { type PointerEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProductType } from "@/types/types";

const ZOOM_SCALE = 2.5;

interface ProductZoomButtonProps {
  product: ProductType;
}

export default function ProductZoomButton({ product }: ProductZoomButtonProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  function updateOrigin(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    setOrigin({
      x: Math.min(
        100,
        Math.max(0, ((event.clientX - rect.left) / rect.width) * 100),
      ),
      y: Math.min(
        100,
        Math.max(0, ((event.clientY - rect.top) / rect.height) * 100),
      ),
    });
  }

  function handleImageClick(event: PointerEvent<HTMLDivElement>) {
    updateOrigin(event);
    setIsZoomed((current) => !current);
  }

  return (
    <Dialog onOpenChange={() => setIsZoomed(false)}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Zoom image"
            className="absolute right-4 bottom-4 z-10 shadow"
          >
            <ZoomIn />
          </Button>
        }
      />

      <DialogContent
        className="w-[min(100%-2rem,64rem)] gap-3 p-4 sm:max-w-none"
        showCloseButton
      >
        <DialogTitle>{product.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Enlarged image of {product.name}. Click or tap to zoom.
        </DialogDescription>

        <div
          className={
            "relative aspect-square w-full overflow-hidden rounded-md bg-neutral-100 " +
            (isZoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in")
          }
          onPointerMove={(event) => {
            if (isZoomed) {
              updateOrigin(event);
            }
          }}
          onPointerDown={handleImageClick}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            draggable={false}
            className="select-none object-contain transition-transform duration-200"
            style={{
              transform: "scale(" + (isZoomed ? ZOOM_SCALE : 1) + ")",
              transformOrigin: origin.x + "% " + origin.y + "%",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
