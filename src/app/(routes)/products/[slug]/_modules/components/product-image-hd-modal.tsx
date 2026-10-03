"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProductImageHdModalProps {
  image: string;
  name: string;
}

export default function ProductImageHdModal({
  image,
  name,
}: ProductImageHdModalProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button
          type="button"
          variant="secondary"
          size="sm"
          className="absolute right-3 bottom-3 z-10 gap-2 shadow-sm"
        >
          <ZoomIn className="size-4" />
          View larger
        </Button>}
      />

      <DialogContent className="max-w-5xl overflow-hidden p-2 sm:p-4">
        <DialogTitle className="sr-only">Larger view of {name}</DialogTitle>
        <DialogDescription className="sr-only">
          Enlarged product image for {name}.
        </DialogDescription>

        <div className="relative aspect-square w-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            quality={90}
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
