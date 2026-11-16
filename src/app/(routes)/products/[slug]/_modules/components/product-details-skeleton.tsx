import { Skeleton } from "@/components/ui/skeleton";

// Fallback for ProductDetails, which reads ?size= on the client.
export default function ProductDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-20 w-full" />
      </div>
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
