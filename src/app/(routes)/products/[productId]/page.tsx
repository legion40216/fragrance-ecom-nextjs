interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  return <div>Product: {productId}</div>;
}
