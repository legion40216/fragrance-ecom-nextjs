"use client";

import type { ProductType } from "@/types/types";
import { isLowStock } from "@/utils/product-variants";
import useProductPurchase from "../hooks/use-product-purchase";
import MobilePurchaseBar from "./mobile-purchase-bar";
import ProductHeader from "./product-header";
import ProductSpecs from "./product-specs";
import PurchaseActions from "./purchase-actions";
import QuantityStepper from "./quantity-stepper";
import SizeSelector from "./size-selector";

interface ProductDetailsProps {
  product: ProductType;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const purchase = useProductPurchase(product);
  const { selectedVariant, quantity, maxQuantity, isSoldOut, inCart } =
    purchase;

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <ProductHeader product={product} selectedVariant={selectedVariant} />

      <SizeSelector
        variants={product.variants}
        selectedSize={selectedVariant.size}
        onSelect={purchase.selectSize}
      />

      <div className="hidden space-y-3 md:block">
        <p className="text-sm font-medium">Quantity</p>
        <QuantityStepper
          quantity={quantity}
          max={maxQuantity}
          disabled={isSoldOut}
          onChange={purchase.changeQuantity}
        />
        <p className="text-xs text-muted-foreground">
          {isSoldOut
            ? "Sold out"
            : isLowStock(selectedVariant.stock)
              ? `Only ${selectedVariant.stock} left`
              : `${selectedVariant.stock} available`}
        </p>
      </div>

      <PurchaseActions
        isSoldOut={isSoldOut}
        inCart={inCart}
        onToggleCart={purchase.toggleCart}
        onBuyNow={purchase.buyNow}
      />

      <ProductSpecs product={product} selectedVariant={selectedVariant} />

      <MobilePurchaseBar
        selectedVariant={selectedVariant}
        quantity={quantity}
        maxQuantity={maxQuantity}
        isSoldOut={isSoldOut}
        inCart={inCart}
        onQuantityChange={purchase.changeQuantity}
        onToggleCart={purchase.toggleCart}
      />
    </div>
  );
}
