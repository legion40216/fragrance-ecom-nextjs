import type { ProductType } from "@/types/types";
import { categories } from "./categories";

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
    price: 4999,
    size: "100ml",
    image: "/assets/product/images/noir-essence.svg",
    rating: 4.8,
    reviewCount: 124,
    stock: 18,
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
    price: 6999,
    size: "100ml",
    image: "/assets/product/images/royal-oud.svg",
    rating: 4.9,
    reviewCount: 87,
    stock: 12,
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
    price: 4499,
    size: "80ml",
    image: "/assets/product/images/velvet-bloom.svg",
    rating: 4.7,
    reviewCount: 96,
    stock: 24,
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
    price: 3499,
    size: "100ml",
    image: "/assets/product/images/citrus-mist.svg",
    rating: 4.6,
    reviewCount: 73,
    stock: 31,
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
    price: 5299,
    size: "100ml",
    image: "/assets/product/images/amber-night.svg",
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
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
    price: 1999,
    size: "12ml",
    image: "/assets/product/images/royal-rose-attar.svg",
    rating: 4.7,
    reviewCount: 58,
    stock: 40,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    createdAt: "2023-11-05",
  },
];

// Derived from products so the brand list can never drift out of sync
export const brands: string[] = Array.from(
  new Set(products.map((product) => product.brand)),
);

