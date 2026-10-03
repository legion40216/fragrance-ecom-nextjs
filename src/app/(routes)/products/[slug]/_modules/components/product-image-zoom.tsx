"use client";

import { ZoomIn } from "lucide-react";
import { type PointerEvent, type ReactNode, useState } from "react";

const ZOOM_SCALE = 2.5;

interface ProductImageZoomProps {
  children: ReactNode;
}

export default function ProductImageZoom({ children }: ProductImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  function updateOrigin(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setOrigin({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  }

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    updateOrigin(event);
    setIsZoomed(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (isZoomed) updateOrigin(event);
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") setIsZoomed(false);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") return;

    updateOrigin(event);
    setIsZoomed((current) => !current);
  }

  return (
    <div
      className={`absolute inset-0 ${
        isZoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in"
      }`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
    >
      <div
        className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `scale(${isZoomed ? ZOOM_SCALE : 1})`,
          transformOrigin: `${origin.x}% ${origin.y}%`,
        }}
      >
        {children}
      </div>

      {!isZoomed && (
        <ZoomIn className="pointer-events-none absolute right-3 bottom-3 size-5 text-neutral-500" />
      )}
    </div>
  );
}
