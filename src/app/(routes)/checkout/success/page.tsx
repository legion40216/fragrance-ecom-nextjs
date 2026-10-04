import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order placed",
};

type SuccessPageProps = {
  searchParams: Promise<{ order?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <CircleCheck className="size-14 text-green-600" aria-hidden="true" />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Thank you for your order!</h1>
        <p className="text-muted-foreground">
          Your order has been placed. You'll pay in cash when it arrives.
        </p>
      </div>

      {order && (
        <p className="rounded-md bg-gray-50 px-4 py-2 text-sm">
          Order number: <span className="font-semibold">{order}</span>
        </p>
      )}

      <Button render={<Link href="/products" />}>Continue shopping</Button>
    </div>
  );
}
