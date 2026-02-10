import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      {/* Skeleton for Header */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-1/2 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4 p-4 border rounded-2xl shadow-sm">
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <div className="flex justify-between">
               <Skeleton className="h-8 w-20 rounded-lg" />
               <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
