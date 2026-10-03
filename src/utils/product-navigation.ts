export interface NavigationItem {
  slug: string;
  name: string;
}

export interface NavigationData {
  previous?: NavigationItem;
  next?: NavigationItem;
  backLabel: string;
  backHref: string;
}

export function getNeighbors(
  items: NavigationItem[],
  currentSlug: string,
): Pick<NavigationData, "previous" | "next"> {
  const currentIndex = items.findIndex((item) => item.slug === currentSlug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previous: currentIndex > 0 ? items[currentIndex - 1] : undefined,
    next:
      currentIndex < items.length - 1 ? items[currentIndex + 1] : undefined,
  };
}
