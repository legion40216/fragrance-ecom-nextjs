import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { products } from "@/data/data";
import { getProductBySlug } from "@/utils/get-product-by-slug";

import ProductView from "./_modules/views/product-view";

// The catalogue is static, so pre-render every product page at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const title = `${product.name} | ${product.brand}`;

  return {
    title,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      type: "website",
      siteName: "Fragrance Store",
      title,
      description: product.description,
      url: `/products/${product.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductView product={product} />;
}
