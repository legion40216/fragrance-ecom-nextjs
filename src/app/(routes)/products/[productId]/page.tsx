import { notFound } from "next/navigation";
import { products } from "@/data/data";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ productId: product.id }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = products.find((item) => item.id === productId);

  if (!product) notFound();

  return <div>Product: {product.name}</div>;
}
