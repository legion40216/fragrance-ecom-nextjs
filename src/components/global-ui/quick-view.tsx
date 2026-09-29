"use client";

import { Eye } from "lucide-react";
import { useState } from "react";

import type { ProductSize } from "@/types/types";

import QuickViewContent, {
  type QuickViewProduct,
} from "@/components/global-ui/quick-view-content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// Eye icon for product cards. Opens the quick view modal.
export default function QuickView({
  product,
  selectedSize,
}: {
  product: QuickViewProduct;
  selectedSize?: ProductSize;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="secondary"
            size="icon-sm"
            className="rounded-full shadow"
            aria-label={`Quick view ${product.name}`}
          />
        }
      >
        <Eye />
      </DialogTrigger>

      <QuickViewContent
        product={product}
        initialSize={selectedSize}
        onClose={() => setOpen(false)}
      />
    </Dialog>
  );
}
