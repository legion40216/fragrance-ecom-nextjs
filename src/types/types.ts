// types/types.ts
import type { categories } from "@/data/data";

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type CategoriesType = CategoryType[];

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: (typeof categories)[number]["slug"];
  description: string;
  price: number;
  size: string;
  image: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  createdAt: string; // ISO date string, used for "newest" / "oldest" sort
};

export type ProductsType = ProductType[];
