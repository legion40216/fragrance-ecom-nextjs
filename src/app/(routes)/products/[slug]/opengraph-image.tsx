import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

import { products } from "@/data/data";
import { formatter } from "@/utils/formatters";
import { getProductBySlug } from "@/utils/get-product-by-slug";
import { getLowestPrice } from "@/utils/product-variants";

// WhatsApp, Facebook and Messages can't show SVG previews, so this draws a
// PNG card for every product from the product's own image.
export const alt = "Product preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

const MIME_TYPES: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

async function readProductImage(imagePath: string) {
  const extension = path.extname(imagePath).toLowerCase();
  const mimeType = MIME_TYPES[extension];
  if (!mimeType) return null;

  try {
    const file = await readFile(path.join(process.cwd(), "public", imagePath));
    return `data:${mimeType};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return new ImageResponse(<div style={{ display: "flex" }}>Not found</div>, {
      ...size,
    });
  }

  const imageSrc = await readProductImage(product.image);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#F3ECE2",
        color: "#241A16",
      }}
    >
      {/* Product image */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 630,
          height: 630,
          backgroundColor: "#EAE1D3",
        }}
      >
        {imageSrc && (
          // biome-ignore lint/performance/noImgElement: ImageResponse needs a plain img
          <img src={imageSrc} width={480} height={480} alt="" />
        )}
      </div>

      {/* Name, brand, price */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          padding: 56,
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#7C7263",
          }}
        >
          {product.brand}
        </div>
        <div style={{ fontSize: 64, marginTop: 16, lineHeight: 1.1 }}>
          {product.name}
        </div>
        <div style={{ fontSize: 36, marginTop: 28 }}>
          {`From ${formatter.format(getLowestPrice(product))}`}
        </div>
        <div style={{ fontSize: 24, marginTop: 56, color: "#7C7263" }}>
          Fragrance Store
        </div>
      </div>
    </div>,
    { ...size },
  );
}
