import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function FeedbackDashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Skeleton */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-8 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Skeleton */}
      <div className="lg:col-span-3 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-4 w-20 mt-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function RoadmapDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Stats Overview Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-12" />
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="grid grid-cols-3 gap-4 border-t pt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton className="h-8 w-12 mx-auto" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kanban Columns Skeleton */}
      <div className="lg:grid grid-cols-1 lg:grid-cols-4 gap-6 space-y-8 lg:space-y-0">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="rounded-lg p-4 bg-muted animate-pulse h-24" />
            <div className="space-y-3">
              {[...Array(2)].map((__, j) => (
                <Card key={j}>
                  <CardHeader className="p-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </CardContent>
                </Card>
              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            }
            
            export function AdminTableSkeleton() {
              return (
                <Card className="shadow-lg border-muted">
                  <CardHeader className="bg-muted/30">
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-4 space-y-4">
                      <div className="flex gap-4 border-b pb-4">
                        {[...Array(6)].map((_, i) => (
                          <Skeleton key={i} className="h-4 flex-1" />
                        ))}
                      </div>
                                {[...Array(5)].map((_, i) => (
                                  <div key={i} className="flex gap-4 items-center py-4 border-b last:border-0">
                                    <Skeleton className="h-4 flex-[2]" />
                                    <Skeleton className="h-6 flex-1 rounded-full" />
                                    <Skeleton className="h-4 flex-1" />
                                    <Skeleton className="h-4 flex-1" />
                                    <Skeleton className="h-6 flex-1 rounded-full" />
                                    <div className="flex-1 flex justify-end">
                                      <Skeleton className="h-8 w-20 rounded-md" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      }
                      
                      export function StatsSkeleton() {
                        return (
                          <section className="bg-muted/30 rounded-3xl p-12 text-center border">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                  <Skeleton className="h-12 w-24 mx-auto" />
                                  <Skeleton className="h-4 w-32 mx-auto" />
                                </div>
                              ))}
                            </div>
                          </section>
                        );
                      }
                      
