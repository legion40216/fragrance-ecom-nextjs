"use client";

import EmptyState from "@/components/global-ui/empty-state";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <EmptyState title="Something went wrong" subtitle="Please try again later">
      <Button onClick={reset}>Try again</Button>
    </EmptyState>
  );
}
