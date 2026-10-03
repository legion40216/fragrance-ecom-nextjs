"use client";

import {
  type PointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";

interface ZoomOrigin {
  x: number;
  y: number;
}

const CENTER: ZoomOrigin = { x: 50, y: 50 };
const DRAG_THRESHOLD_PX = 8;

const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

export function useImageZoom(scale = 2.25) {
  const surfaceRef = useRef<HTMLButtonElement>(null);
  const pressRef = useRef<{ x: number; y: number } | null>(null);
  const draggedRef = useRef(false);

  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState<ZoomOrigin>(CENTER);

  const moveOriginTo = useCallback((clientX: number, clientY: number) => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const rect = surface.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    setOrigin({
      x: clampPercent(((clientX - rect.left) / rect.width) * 100),
      y: clampPercent(((clientY - rect.top) / rect.height) * 100),
    });
  }, []);

  const reset = useCallback(() => {
    setIsZoomed(false);
    setOrigin(CENTER);
  }, []);

  const toggle = useCallback(() => {
    setIsZoomed((current) => {
      if (!current) setOrigin(CENTER);
      return !current;
    });
  }, []);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      pressRef.current = { x: event.clientX, y: event.clientY };
      draggedRef.current = false;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
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
    },
    [isZoomed, moveOriginTo],
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      pressRef.current = null;

      if (event.pointerType === "mouse" || draggedRef.current) return;

      moveOriginTo(event.clientX, event.clientY);
      toggle();
    },
    [moveOriginTo, toggle],
  );

  const handlePointerCancel = useCallback(() => {
    pressRef.current = null;
    draggedRef.current = false;
  }, []);

  const handlePointerEnter = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType !== "mouse") return;

      moveOriginTo(event.clientX, event.clientY);
      setIsZoomed(true);
    },
    [moveOriginTo],
  );

  const handlePointerLeave = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType !== "mouse") return;
      reset();
    },
    [reset],
  );

  return {
    surfaceRef,
    isZoomed,
    reset,
    toggle,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handlePointerEnter,
    handlePointerLeave,
    imageStyle: {
      transform: `scale(${isZoomed ? scale : 1})`,
      transformOrigin: `${origin.x}% ${origin.y}%`,
    },
  };
}
