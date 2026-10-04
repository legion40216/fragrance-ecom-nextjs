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

  if (currentIndex === -1 || items.length < 2) {
    return {};
  }

  return {
    previous: items[currentIndex - 1] ?? items[items.length - 1],
    next: items[currentIndex + 1] ?? items[0],
  };
}
