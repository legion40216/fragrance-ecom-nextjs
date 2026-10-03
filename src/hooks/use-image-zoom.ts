"use client";

import { type MouseEvent, type PointerEvent, useCallback, useState } from "react";

interface ZoomOrigin {
  x: number;
  y: number;
}

const CENTER: ZoomOrigin = { x: 50, y: 50 };

const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

function getOrigin(event: MouseEvent<HTMLElement>): ZoomOrigin {
  const rect = event.currentTarget.getBoundingClientRect();

  return {
    x: clampPercent(((event.clientX - rect.left) / rect.width) * 100),
    y: clampPercent(((event.clientY - rect.top) / rect.height) * 100),
  };
}

/**
 * Click/tap-to-zoom state for an image. Zooming in anchors on the point that
 * was clicked; while zoomed, moving the pointer pans the image.
 */
export function useImageZoom(scale = 2.5) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState<ZoomOrigin>(CENTER);

  const toggle = useCallback((event: MouseEvent<HTMLElement>) => {
    setOrigin(getOrigin(event));
    setIsZoomed((current) => !current);
  }, []);

  const pan = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (isZoomed) setOrigin(getOrigin(event));
    },
    [isZoomed],
  );

  const reset = useCallback(() => {
    setIsZoomed(false);
    setOrigin(CENTER);
  }, []);

  return {
    isZoomed,
    reset,
    toggle,
    pan,
    imageStyle: {
      transform: `scale(${isZoomed ? scale : 1})`,
      transformOrigin: `${origin.x}% ${origin.y}%`,
    },
  };
}
