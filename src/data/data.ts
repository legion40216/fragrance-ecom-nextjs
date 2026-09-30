import type { ProductType } from "@/types/types";

export { categories } from "./categories";

export const products: ProductType[] = [
  {
    id: "noir-01",
    name: "Noir Essence",
    slug: "noir-essence",
    brand: "Aurelia",
    category: "mens-fragrances",
    description:
      "A sophisticated fragrance with warm woods, spices, and a smooth amber finish.",
    variants: [
      { size: "50ml", price: 5499, stock: 18 },
      { size: "100ml", price: 4999, stock: 18 },
    ],
    image: "/assets/product/images/noir-essence.svg",
    rating: 4.8,
    reviewCount: 124,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    createdAt: "2024-01-15",
  },

  {
    id: "royal-oud-01",
    name: "Royal Oud",
    slug: "royal-oud",
    brand: "Aurelia",
    category: "oud-collection",
    description:
      "A deep and luxurious oud fragrance balanced with amber and soft woods.",
    variants: [
      { size: "50ml", price: 3999, stock: 12 },
      { size: "100ml", price: 6999, stock: 12 },
    ],
    image: "/assets/product/images/royal-oud.svg",
    rating: 4.9,
    reviewCount: 87,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    createdAt: "2024-02-10",
  },

  {
    id: "velvet-bloom-01",
    name: "Velvet Bloom",
    slug: "velvet-bloom",
    brand: "Maison Velora",
    category: "womens-fragrances",
    description:
      "A floral fragrance with soft rose, jasmine, vanilla, and musk.",
    variants: [
      { size: "50ml", price: 4799, stock: 24 },
      { size: "100ml", price: 4499, stock: 24 },
    ],
    image: "/assets/product/images/velvet-bloom.svg",
    rating: 4.7,
    reviewCount: 96,
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    createdAt: "2024-06-01",
  },

  {
    id: "citrus-mist-01",
    name: "Citrus Mist",
    slug: "citrus-mist",
    brand: "Aurelia",
    category: "unisex-fragrances",
    description:
      "A fresh everyday fragrance combining citrus, green notes, and clean musk.",
    variants: [
      { size: "50ml", price: 1999, stock: 31 },
      { size: "100ml", price: 3499, stock: 31 },
    ],
    image: "/assets/product/images/citrus-mist.svg",
    rating: 4.6,
    reviewCount: 73,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    createdAt: "2024-06-15",
  },

  {
    id: "amber-night-01",
    name: "Amber Night",
    slug: "amber-night",
    brand: "Maison Velora",
    category: "mens-fragrances",
    description:
      "A warm evening fragrance built around amber, vanilla, and dark woods.",
    variants: [
      { size: "50ml", price: 5599, stock: 15 },
      { size: "100ml", price: 5299, stock: 15 },
    ],
    image: "/assets/product/images/amber-night.svg",
    rating: 4.8,
    reviewCount: 112,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    createdAt: "2024-03-20",
  },

  {
    id: "rose-attar-01",
    name: "Royal Rose Attar",
    slug: "royal-rose-attar",
    brand: "Aurelia",
    category: "attars",
    description:
      "A concentrated rose attar with sweet floral and soft woody notes.",
    variants: [
      { size: "50ml", price: 1199, stock: 40 },
      { size: "100ml", price: 1999, stock: 40 },
    ],
    image: "/assets/product/images/royal-rose-attar.svg",
    rating: 4.7,
    reviewCount: 58,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    createdAt: "2023-11-05",
  },
];

export const brands: string[] = Array.from(
  new Set(products.map((product) => product.brand)),
);
