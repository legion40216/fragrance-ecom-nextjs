import { Heart } from "lucide-react";

import ShareButton from "@/components/global-ui/share-button";
import { Button } from "@/components/ui/button";
import useWishlist from "@/hooks/useWishlist";
import type { ProductType, ProductVariant } from "@/types/types";
import { formatter } from "@/utils/formatters";
import { getProductPath } from "@/utils/product-url";

export default function ProductHeader({
  product,
  selectedVariant,
}: {
  product: ProductType;
  selectedVariant: ProductVariant;
}) {
  const wishlist = useWishlist();
  const isWishlisted = wishlist.has(product.id);

  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {product.brand}
      </p>
      <div className="flex items-start justify-between gap-3">
        <h1 className="font-serif text-3xl">{product.name}</h1>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            aria-pressed={isWishlisted}
            title={isWishlisted ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            onClick={() => wishlist.toggle(product.id)}
          >
            <Heart
              className={isWishlisted ? "fill-rose-600 text-rose-600" : ""}
              aria-hidden="true"
            />
          </Button>
          <ShareButton
            title={product.name}
            text={`${product.name} by ${product.brand}`}
            path={getProductPath(product.slug, selectedVariant.size)}
            showLabel
            className="h-8 shrink-0"
          />
        </div>
      </div>
      <p className="text-lg font-medium">
        {formatter.format(selectedVariant.price)}
      </p>
      <p className="leading-6 text-muted-foreground">{product.description}</p>
    </div>
  );
}
