"use client";

import { ZoomIn } from "lucide-react";
import type { ReactNode, MouseEvent } from "react";

import { useImageZoom } from "@/hooks/use-image-zoom";

interface ProductImageZoomProps {
  children: ReactNode;
  alt: string;
  zoomScale?: number;
}

const DEFAULT_ZOOM_SCALE = 2.25;

export default function ProductImageZoom({
  children,
  alt,
  zoomScale = DEFAULT_ZOOM_SCALE,
}: ProductImageZoomProps) {
  const {
    surfaceRef,
    isZoomed,
    toggle,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handlePointerEnter,
    handlePointerLeave,
    reset,
    imageStyle,
  } = useImageZoom(zoomScale);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Pointer/touch interactions are handled by pointerup. Keep click for
    // keyboard activation of the native button.
    if (event.detail === 0) toggle();
  };

  return (
    <button
      ref={surfaceRef}
      type="button"
      aria-label={isZoomed ? `Zoom out of ${alt}` : `Zoom in on ${alt}`}
      aria-pressed={isZoomed}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onBlur={reset}
      className={`group absolute inset-0 block overflow-hidden border-0 bg-transparent p-0 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
      }`}
      style={{ touchAction: isZoomed ? "none" : "pan-y pinch-zoom" }}
    >
      <span className="absolute inset-0 block p-8">
        <span
          className="relative block h-full w-full transition-transform duration-300 ease-out will-change-transform"
          style={imageStyle}
        >
          {children}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-sm transition-opacity duration-200 ${
          isZoomed ? "opacity-0" : "opacity-70 group-hover:opacity-100"
        }`}
      >
        <ZoomIn className="size-4" />
      </span>
    </button>
  );
}
