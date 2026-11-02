export interface NavigationItem {
  slug: string;
  name: string;
}

export interface NavigationData {
  previous?: NavigationItem;
  next?: NavigationItem;
  /** 1-based position of the current product in its category. */
  position?: number;
  /** Number of products in the category. */
  total?: number;
  categoryName: string;
}

export function getNeighbors(
  items: NavigationItem[],
  currentSlug: string,
): Pick<NavigationData, "previous" | "next" | "position" | "total"> {
  const currentIndex = items.findIndex((item) => item.slug === currentSlug);

  if (currentIndex === -1) {
    return {};
  }

  const position = currentIndex + 1;
  const total = items.length;

  // Nothing to cycle through with a single product.
  if (total < 2) {
    return { position, total };
  }

  return {
    previous: items[currentIndex - 1] ?? items[total - 1],
    next: items[currentIndex + 1] ?? items[0],
    position,
    total,
  };
}
