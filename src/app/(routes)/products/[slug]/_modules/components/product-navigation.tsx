import type { ProductType } from "@/types/types";
import { getDefaultNavigation } from "@/utils/default-navigation";

import ProductNavigationBar from "./product-navigation-bar";

export default function ProductNavigation({
  product,
}: {
  product: ProductType;
}) {
  const navigation = getDefaultNavigation(product);

  return <ProductNavigationBar navigation={navigation} />;
}
