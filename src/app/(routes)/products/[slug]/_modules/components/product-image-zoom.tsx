"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import {
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

const DEFAULT_ZOOM_SCALE = 2.25;
const DRAG_THRESHOLD_PX = 8;

interface ProductImageZoomProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** How far the image scales in when zoomed. */
  zoomScale?: number;
}

export default function ProductImageZoom({
  src,
  alt,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  zoomScale = DEFAULT_ZOOM_SCALE,
}: ProductImageZoomProps) {
  const surfaceRef = useRef<HTMLButtonElement>(null);
  const pressRef = useRef<{ x: number; y: number } | null>(null);
  const draggedRef = useRef(false);

  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const moveOriginTo = useCallback((clientX: number, clientY: number) => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const rect = surface.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setOrigin({
      x: Math.min(Math.max(x, 0), 100),
      y: Math.min(Math.max(y, 0), 100),
    });
  }, []);

  const resetOrigin = useCallback(() => setOrigin({ x: 50, y: 50 }), []);

  const toggleZoom = useCallback(() => {
    setIsZoomed((previous) => {
      if (!previous) resetOrigin();
      return !previous;
    });
  }, [resetOrigin]);

  const stopZoom = useCallback(() => {
    setIsZoomed(false);
    resetOrigin();
  }, [resetOrigin]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    pressRef.current = { x: event.clientX, y: event.clientY };
    draggedRef.current = false;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse") {
      if (isZoomed) moveOriginTo(event.clientX, event.clientY);
      return;
    }

    const press = pressRef.current;
    if (!press) return;

    if (
      Math.hypot(event.clientX - press.x, event.clientY - press.y) >
      DRAG_THRESHOLD_PX
    ) {
      draggedRef.current = true;
    }

    if (isZoomed) moveOriginTo(event.clientX, event.clientY);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    pressRef.current = null;

    if (event.pointerType === "mouse" || draggedRef.current) return;

    moveOriginTo(event.clientX, event.clientY);
    toggleZoom();
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;
    moveOriginTo(event.clientX, event.clientY);
    setIsZoomed(true);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;
    stopZoom();
  };

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (event.detail !== 0) return;
    toggleZoom();
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
      onPointerCancel={() => {
        pressRef.current = null;
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onBlur={stopZoom}
      className={`group absolute inset-0 block overflow-hidden border-0 bg-transparent p-0 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
      }`}
      style={{ touchAction: isZoomed ? "none" : "pan-y pinch-zoom" }}
    >
      <span className="absolute inset-0 block p-8">
        <span className="relative block h-full w-full">
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            draggable={false}
            className="object-contain transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `scale(${isZoomed ? zoomScale : 1})`,
              transformOrigin: `${origin.x}% ${origin.y}%`,
            }}
          />
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
