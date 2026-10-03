"use client";

import {
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";

interface Point {
  x: number;
  y: number;
}

const CENTER: Point = { x: 50, y: 50 };
const DRAG_THRESHOLD = 4;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getPoint(event: PointerEvent<HTMLElement>): Point {
  const rect = event.currentTarget.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

/**
 * Click/tap-to-zoom state for an image.
 *
 * Zooming in keeps the clicked point under the pointer. Once zoomed,
 * dragging pans the image without changing the zoom anchor, which keeps
 * desktop pointer movement from making the image jump.
 */
export function useImageZoom(scale = 2.5) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [translation, setTranslation] = useState<Point>({ x: 0, y: 0 });

  const dragStart = useRef<Point | null>(null);
  const startTranslation = useRef<Point>({ x: 0, y: 0 });
  const didDrag = useRef(false);

  const toggle = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (didDrag.current) {
        didDrag.current = false;
        return;
      }

      if (isZoomed) {
        setIsZoomed(false);
        setTranslation({ x: 0, y: 0 });
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setTranslation({
        x: (rect.width / 2 - x) * (scale - 1),
        y: (rect.height / 2 - y) * (scale - 1),
      });
      setIsZoomed(true);
    },
    [isZoomed, scale],
  );

  const pointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!isZoomed) return;

      const point = getPoint(event);
      dragStart.current = point;
      startTranslation.current = translation;
      didDrag.current = false;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [isZoomed, translation],
  );

  const pan = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!isZoomed || !dragStart.current) return;

      const point = getPoint(event);
      const dx = point.x - dragStart.current.x;
      const dy = point.y - dragStart.current.y;

      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        didDrag.current = true;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const maxX = (rect.width * (scale - 1)) / 2;
      const maxY = (rect.height * (scale - 1)) / 2;

      setTranslation({
        x: clamp(startTranslation.current.x + dx, -maxX, maxX),
        y: clamp(startTranslation.current.y + dy, -maxY, maxY),
      });
    },
    [isZoomed, scale],
  );

  const pointerUp = useCallback((event: PointerEvent<HTMLElement>) => {
    dragStart.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const reset = useCallback(() => {
    setIsZoomed(false);
    setTranslation({ x: 0, y: 0 });
    dragStart.current = null;
    didDrag.current = false;
  }, []);

  return {
    isZoomed,
    reset,
    toggle,
    pointerDown,
    pan,
    pointerUp,
    imageStyle: {
      transform: `translate3d(${translation.x}px, ${translation.y}px, 0) scale(${isZoomed ? scale : 1})`,
      transformOrigin: "center center",
    },
  };
}
