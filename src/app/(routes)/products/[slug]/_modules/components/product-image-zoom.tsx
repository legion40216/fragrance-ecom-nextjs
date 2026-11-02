"use client";

import { ZoomIn } from "lucide-react";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
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
  const [open, setOpen] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);

  const followPointer = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;

    const layer = layerRef.current;
    if (!layer) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    layer.style.transformOrigin = `${x}% ${y}%`;
    layer.style.transform = `scale(${HOVER_SCALE})`;
  };

  const resetHover = () => {
    if (layerRef.current) layerRef.current.style.transform = "";
  };

  const openViewer = () => {
    resetHover();
    setOpen(true);
  };

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-neutral-100">
      <div
        ref={layerRef}
        className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform motion-reduce:transition-none"
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

      <button
        type="button"
        aria-label={`Zoom in on ${alt}`}
        className="absolute inset-0 z-10 cursor-zoom-in outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
        onPointerEnter={followPointer}
        onPointerMove={followPointer}
        onPointerLeave={resetHover}
        onClick={openViewer}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 bottom-3 z-10 flex size-8 items-center justify-center rounded-full border bg-background/90 shadow"
      >
        <ZoomIn className="size-4" />
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-0 left-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none p-0 ring-0 sm:max-w-none">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <DialogDescription className="sr-only">
            Scroll or pinch to zoom, drag to move the image, and double-tap to
            zoom in or out.
          </DialogDescription>
          <ZoomViewer src={src} alt={alt} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
