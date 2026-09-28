import { notFound } from "next/navigation";
import { products } from "@/data/data";
import { getProductBySlug } from "@/utils/get-product-by-slug";
import ProductView from "./_modules/views/product-view";

// The catalogue is static, so pre-render every product page at build time and
// answer unknown slugs with a real HTTP 404. (notFound() alone can't set the
// status once loading.tsx has started streaming the response.)
// Remove `dynamicParams = false` if products later come from a database.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // Kept as a guard in case `dynamicParams` is ever turned back on
  if (!product) notFound();

  return <ProductView product={product} />;
}
