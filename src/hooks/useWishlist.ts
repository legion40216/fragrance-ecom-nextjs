"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { toast } from "@/components/ui/toast";

// Same key the wishlist has always used, so saved items survive this change.
const STORAGE_KEY = "fragrance-wishlist";
const EMPTY = "[]";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);

  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

// The raw string is the snapshot: it is stable between reads, which
// useSyncExternalStore requires.
function getSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

// Older versions stored whole product objects; newer ones store plain ids.
// Accept both so nobody loses their saved items.
function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];

    return value
      .map((entry) =>
        typeof entry === "string"
          ? entry
          : typeof entry?.id === "string"
            ? entry.id
            : null,
      )
      .filter((id): id is string => id !== null);
  } catch {
    return [];
  }
}

// Wishlist of product ids, shared by every component and kept in localStorage.
export default function useWishlist() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const ids = useMemo(() => parse(raw), [raw]);

  const has = useCallback(
    (productId: string) => ids.includes(productId),
    [ids],
  );

  const toggle = useCallback(
    (productId: string) => {
      const wasWishlisted = ids.includes(productId);
      const next = wasWishlisted
        ? ids.filter((id) => id !== productId)
        : [...ids, productId];

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        for (const listener of listeners) listener();
        toast.add({
          title: wasWishlisted
            ? "Removed from wishlist."
            : "Added to wishlist.",
          type: "success",
        });
      } catch {
        toast.add({
          title: "Couldn’t update your wishlist.",
          type: "error",
        });
      }
    },
    [ids],
  );

  return { ids, has, toggle };
}
