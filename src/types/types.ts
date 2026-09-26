// types/types.ts

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
  category: string;
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
};

export type ProductsType = ProductType[];