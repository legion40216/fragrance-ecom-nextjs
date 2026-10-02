"use client";

import { Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface ShareButtonProps {
  title: string;
  text?: string;
  path: string;
  showLabel?: boolean;
  className?: string;
}

export default function ShareButton({
  title,
  text,
  path,
  showLabel = false,
  className,
}: ShareButtonProps) {
  const handleShare = async () => {
    const url = new URL(path, window.location.origin).toString();

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.add({ title: "Link copied.", type: "success" });
    } catch {
      toast.add({ title: "Couldn't copy the link.", type: "error" });
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size={showLabel ? "sm" : "icon-sm"}
      className={className}
      aria-label={`Share ${title}`}
      onClick={handleShare}
    >
      <Share2 />
      {showLabel && "Share"}
    </Button>
  );
}
