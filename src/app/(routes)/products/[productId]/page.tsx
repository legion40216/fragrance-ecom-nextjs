import { products } from "@/data/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = products.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return <div>Product: {product.name}</div>;
}
