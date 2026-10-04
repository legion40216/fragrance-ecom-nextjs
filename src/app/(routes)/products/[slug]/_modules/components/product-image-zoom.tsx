"use client";

import { ZoomIn } from "lucide-react";
import Image from "next/image";
import type { ReactNode, PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ZoomViewer from "./zoom-viewer";

const HOVER_SCALE = 2;

interface ProductImageZoomProps {
  src: string;
  alt: string;
  children?: ReactNode;
}

export default function ProductImageZoom({
  src,
  alt,
  children,
}: ProductImageZoomProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  const setZoom = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const layer = layerRef.current;
    if (!layer) return;
    layer.style.transformOrigin = `${x}% ${y}%`;
    layer.style.transform = `scale(${HOVER_SCALE})`;
  };

  const resetZoom = () => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.style.transform = "scale(1)";
    layer.style.transformOrigin = "center";
  };

  return (
    <Dialog>
      <div
        className="relative aspect-square w-full overflow-hidden rounded-lg border bg-neutral-100"
        onPointerMove={setZoom}
        onPointerLeave={resetZoom}
      >
        <div
          ref={layerRef}
          className="absolute inset-0 transition-transform duration-200 will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-8"
            priority
          />
        </div>

        {children}

        <DialogTrigger
          render={
            <button
              type="button"
              aria-label={`Zoom ${alt} image`}
              className="absolute right-4 bottom-4 z-10 rounded-full border bg-background/90 p-2 shadow backdrop-blur transition hover:bg-background"
            />
          }
        >
          <ZoomIn className="size-4" />
        </DialogTrigger>
      </div>

      <DialogContent className="h-screen w-screen max-w-none border-0 bg-background/95 p-0">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">
          Enlarged product image. Use pinch, drag, wheel, or the zoom controls
          to inspect the image.
        </DialogDescription>
        <ZoomViewer src={src} alt={alt} />
      </DialogContent>
    </Dialog>
  );
}
