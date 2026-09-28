export const categories = [
  {
    id: "mens",
    name: "Men's Fragrances",
    slug: "mens-fragrances",
    description: "Bold and refined fragrances for men",
  },
  {
    id: "womens",
    name: "Women's Fragrances",
    slug: "womens-fragrances",
    description: "Elegant and captivating fragrances for women",
  },
  {
    id: "unisex",
    name: "Unisex Fragrances",
    slug: "unisex-fragrances",
    description: "Versatile fragrances designed for everyone",
  },
  {
    id: "oud",
    name: "Oud Collection",
    slug: "oud-collection",
    description: "Rich and luxurious oud fragrances",
  },
  {
    id: "attar",
    name: "Attars",
    slug: "attars",
    description: "Traditional concentrated perfume oils",
  },
] as const;

export type ProductCategorySlug = (typeof categories)[number]["slug"];
