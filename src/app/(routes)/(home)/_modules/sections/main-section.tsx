import ProductList from "@/components/global-ui/product-list";
import { products } from "@/data/data";
import { CategorySlug } from "@/schema";
import CategoriesBar from "../components/categories-bar";
import HeadingState from "@/components/global-ui/heading-state";

export default function MainSection({
  categoryParam,
}: {
  categoryParam: CategorySlug;
}) {
  const filteredProducts = categoryParam
    ? products.filter((product) => product.category === categoryParam)
    : products;

  return (
    <section className="space-y-8">
      <HeadingState
        title="Fragrance Store"
        subtitle="Discover your next signature scent."
      />

      <div className="space-y-4">
        <CategoriesBar categoryParam={categoryParam} />
        <ProductList initialData={filteredProducts} />
      </div>
    </section>
  );
}