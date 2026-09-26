import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/types";
import { formatter } from "@/utils/formatters";

interface ProductCardProps
  extends Pick<
    ProductType,
    | "id"
    | "name"
    | "brand"
    | "price"
    | "size"
    | "image"
    | "isNew"
    | "isBestSeller"
    | "stock"
  > {}

export default function ProductCard({
  id,
  name,
  brand,
  price,
  size,
  image,
  isNew,
  isBestSeller,
  stock,
}: ProductCardProps) {
  const isOutOfStock = stock === 0;

  return (
    <Link
      href={`/products/${id}`}
      className="group block overflow-hidden rounded-lg border"
    >
      <div className="relative aspect-square bg-neutral-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {(isNew || isBestSeller) && (
          <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-medium">
            {isNew ? "New" : "Bestseller"}
          </span>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="text-sm font-medium">Out of stock</span>
          </div>
        )}
      </div>

      <div className="space-y-1 p-3">
        <p className="text-xs text-muted-foreground">{brand}</p>
        <h3 className="font-serif text-lg leading-tight">{name}</h3>

        <div className="flex items-baseline justify-between pt-1">
          <span className="font-medium">{formatter.format(price)}</span>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      </div>
    </Link>
  );
}