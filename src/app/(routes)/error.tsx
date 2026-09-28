"use client";

import { Button } from "@/components/ui/button";
import EmptyState from "@/components/global-ui/empty-state";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <EmptyState
      title="Something went wrong"
      subtitle="Please try again later"
    >
      <Button onClick={() => reset()}>Try again</Button>
    </EmptyState>
  );
}
