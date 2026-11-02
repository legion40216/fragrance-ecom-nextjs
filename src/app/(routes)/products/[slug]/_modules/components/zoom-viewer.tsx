"use client";

import { cn } from "cn";
import { Minus, Plus, RotateCcw } from "lucide-react";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const BUTTON_STEP = 1.5;
const DOUBLE_TAP_SCALE = 2.5;
const KEYBOARD_PAN = 48;

const TAP_MAX_MS = 300;
const TAP_MAX_MOVE = 8;
const DOUBLE_TAP_MAX_MS = 300;
const DOUBLE_TAP_MAX_DISTANCE = 32;

type Point = { x: number; y: number };
type View = { scale: number; x: number; y: number };

const CENTER: Point = { x: 0, y: 0 };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const toCenter = (clientX: number, clientY: number, frame: DOMRect): Point => ({
  x: clientX - frame.left - frame.width / 2,
  y: clientY - frame.top - frame.height / 2,
});

function constrain(view: View, frame: DOMRect): View {
  const maxX = (frame.width * (view.scale - 1)) / 2;
  const maxY = (frame.height * (view.scale - 1)) / 2;

  return {
    scale: view.scale,
    x: clamp(view.x, -maxX, maxX),
    y: clamp(view.y, -maxY, maxY),
  };
}

function zoomAt(
  view: View,
  nextScale: number,
  point: Point,
  frame: DOMRect,
): View {
  const scale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
  const ratio = scale / view.scale;

  return constrain(
    {
      scale,
      x: point.x - (point.x - view.x) * ratio,
      y: point.y - (point.y - view.y) * ratio,
    },
    frame,
  );
}

interface ZoomViewerProps {
  src: string;
  alt: string;
}

export default function ZoomViewer({ src, alt }: ZoomViewerProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 });
  const [animate, setAnimate] = useState(false);

  const pointers = useRef(new Map<number, Point>());
  const lastPinch = useRef<{ distance: number; mid: Point } | null>(null);
  const press = useRef<(Point & { time: number; pinched: boolean }) | null>(
    null,
  );
  const lastTap = useRef<(Point & { time: number }) | null>(null);

  const update = useCallback(
    (change: (current: View, frame: DOMRect) => View, animated: boolean) => {
      const frame = frameRef.current?.getBoundingClientRect();
      if (!frame) return;

      setAnimate(animated);
      setView((current) => change(current, frame));
    },
    [],
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const sensitivity = event.ctrlKey ? 0.01 : 0.002;
      const factor = Math.exp(-event.deltaY * sensitivity);

      update(
        (current, rect) =>
          zoomAt(
            current,
            current.scale * factor,
            toCenter(event.clientX, event.clientY, rect),
            rect,
          ),
        false,
      );
    };

    frame.addEventListener("wheel", onWheel, { passive: false });
    return () => frame.removeEventListener("wheel", onWheel);
  }, [update]);

  useEffect(() => {
    const pan = (dx: number, dy: number) =>
      update(
        (current, rect) =>
          constrain({ ...current, x: current.x + dx, y: current.y + dy }, rect),
        true,
      );

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "+":
        case "=":
          update(
            (current, rect) =>
              zoomAt(current, current.scale * BUTTON_STEP, CENTER, rect),
            true,
          );
          break;
        case "-":
        case "_":
          update(
            (current, rect) =>
              zoomAt(current, current.scale / BUTTON_STEP, CENTER, rect),
            true,
          );
          break;
        case "0":
          update((current, rect) => zoomAt(current, 1, CENTER, rect), true);
          break;
        case "ArrowLeft":
          pan(KEYBOARD_PAN, 0);
          break;
        case "ArrowRight":
          pan(-KEYBOARD_PAN, 0);
          break;
        case "ArrowUp":
          pan(0, KEYBOARD_PAN);
          break;
        case "ArrowDown":
          pan(0, -KEYBOARD_PAN);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [update]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size === 1) {
      press.current = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
        pinched: false,
      };
      return;
    }

    if (pointers.current.size === 2) {
      if (press.current) press.current.pinched = true;

      const [a, b] = [...pointers.current.values()];
      lastPinch.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      };
    }
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const previous = pointers.current.get(event.pointerId);
    if (!previous) return;

    const next = { x: event.clientX, y: event.clientY };
    pointers.current.set(event.pointerId, next);

    if (pointers.current.size === 2 && lastPinch.current) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const last = lastPinch.current;
      lastPinch.current = { distance, mid };

      if (last.distance === 0) return;

      update((current, rect) => {
        const zoomed = zoomAt(
          current,
          current.scale * (distance / last.distance),
          toCenter(mid.x, mid.y, rect),
          rect,
        );

        return constrain(
          {
            ...zoomed,
            x: zoomed.x + (mid.x - last.mid.x),
            y: zoomed.y + (mid.y - last.mid.y),
          },
          rect,
        );
      }, false);
      return;
    }

    if (pointers.current.size === 1) {
      const dx = next.x - previous.x;
      const dy = next.y - previous.y;

      update(
        (current, rect) =>
          constrain({ ...current, x: current.x + dx, y: current.y + dy }, rect),
        false,
      );
    }
  };

  const endPointer = (
    event: ReactPointerEvent<HTMLDivElement>,
    cancelled: boolean,
  ) => {
    pointers.current.delete(event.pointerId);
    lastPinch.current = null;

    if (pointers.current.size > 0) return;

    const start = press.current;
    press.current = null;
    if (cancelled || !start || start.pinched) return;

    const now = performance.now();
    const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y);
    if (moved > TAP_MAX_MOVE || now - start.time > TAP_MAX_MS) return;

    const previousTap = lastTap.current;
    const isDoubleTap =
      previousTap !== null &&
      now - previousTap.time < DOUBLE_TAP_MAX_MS &&
      Math.hypot(event.clientX - previousTap.x, event.clientY - previousTap.y) <
        DOUBLE_TAP_MAX_DISTANCE;

    if (!isDoubleTap) {
      lastTap.current = { x: event.clientX, y: event.clientY, time: now };
      return;
    }

    lastTap.current = null;
    update(
      (current, rect) =>
        current.scale > 1
          ? zoomAt(current, 1, CENTER, rect)
          : zoomAt(
              current,
              DOUBLE_TAP_SCALE,
              toCenter(event.clientX, event.clientY, rect),
              rect,
            ),
      true,
    );
  };

  const zoomed = view.scale > 1;

  return (
    <div className="relative size-full bg-neutral-100">
      <div
        ref={frameRef}
        className={cn(
          "absolute inset-0 touch-none overflow-hidden select-none",
          zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => endPointer(event, false)}
        onPointerCancel={(event) => endPointer(event, true)}
      >
        <div
          className={cn(
            "absolute inset-0 will-change-transform",
            animate &&
              "transition-transform duration-200 ease-out motion-reduce:transition-none",
          )}
          style={{
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="200vw"
            draggable={false}
            className="pointer-events-none object-contain p-6 sm:p-12"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <div className="flex items-center gap-1 rounded-full border bg-background/90 p-1 shadow backdrop-blur">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Zoom out"
            disabled={view.scale <= MIN_SCALE}
            onClick={() =>
              update(
                (current, rect) =>
                  zoomAt(current, current.scale / BUTTON_STEP, CENTER, rect),
                true,
              )
            }
          >
            <Minus />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Reset zoom"
            disabled={!zoomed}
            onClick={() =>
              update((current, rect) => zoomAt(current, 1, CENTER, rect), true)
            }
          >
            <RotateCcw />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Zoom in"
            disabled={view.scale >= MAX_SCALE}
            onClick={() =>
              update(
                (current, rect) =>
                  zoomAt(current, current.scale * BUTTON_STEP, CENTER, rect),
                true,
              )
            }
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
