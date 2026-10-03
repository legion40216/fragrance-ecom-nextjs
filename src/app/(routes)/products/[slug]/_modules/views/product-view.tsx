import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { categories } from "@/data/categories";
import type { ProductType } from "@/types/types";

import ProductNavigation from "../components/product-navigation";
import ProductSection from "../sections/product-section";

interface ProductViewProps {
  product: ProductType;
}

export default function ProductView({ product }: ProductViewProps) {
  const category = categories.find(
    (item) => item.slug === product.category,
  );

  const categoryName = category?.name ?? product.category;
  const categoryHref = category
    ? `/categories?category=${encodeURIComponent(category.slug)}`
    : "/categories";

  return (
    <div>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={categoryHref} />}>
              {categoryName}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductNavigation product={product} />

      <ProductSection product={product} />
    </div>
  );
}
