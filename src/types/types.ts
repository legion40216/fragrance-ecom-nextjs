import type { CategorySlugValue } from "@/data/category-slugs";

export type CategoryType = {
  id: string;
  name: string;
  slug: CategorySlugValue;
  description: string;
};

export type CategoriesType = CategoryType[];

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: CategorySlugValue;
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
  createdAt: string;
};

export type ProductsType = ProductType[];
