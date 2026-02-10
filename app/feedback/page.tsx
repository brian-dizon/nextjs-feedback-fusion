import { GradientHeader } from "@/components/gradient-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { syncCurrentUser } from "@/lib/sync-user";
import { PlusIcon, Map } from "lucide-react";
import Link from "next/link";
import { getCategoryDesign } from "@/app/data/category-data";
import { Badge } from "@/components/ui/badge";
import FeedbackList from "@/components/feedback-list";
import { Suspense } from "react";
import { FeedbackDashboardSkeleton } from "@/components/skeletons";

async function FeedbackContent() {
  // Sync and get the database user
  const dbUser = await syncCurrentUser();
  const userId = dbUser?.id || null;

  const posts = await prisma.posts.findMany({
    include: {
      users: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.posts.groupBy({
    by: ["category"],
    _count: true,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Browse feedback by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((cat) => {
                const design = getCategoryDesign(cat.category);
                const Icon = design.icon;

                return (
                  <div key={cat.category} className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${design.light} ${design.border} border`}>
                        <Icon className={`h-4 w-4 ${design.text}`}></Icon>
                      </div>
                      <span className="font-medium text-sm">{cat.category}</span>
                    </div>
                    <Badge variant="secondary" className={`${design.light} ${design.text} shadow-none`}>
                      {cat._count}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Main Content */}
      <div className="lg:col-span-3">
        <FeedbackList initialPosts={posts} userId={userId} />
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="space-y-6">
        {/* Static Header: Loads instantly */}
        <GradientHeader title="Community Feedback" subtitle="Explore, vote, and contribute to the features that matter most. Your voice shapes our product's future.">
          <div className="flex gap-4 justify-start pt-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/feedback/new">
                <PlusIcon className="mr-2 h-4 w-4" />
                New Feedback
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
              <Link href="/roadmap">
                <Map className="mr-2 h-4 w-4" />
                View Roadmap
              </Link>
            </Button>
          </div>
        </GradientHeader>

        {/* Dynamic Content: Shows skeleton while DB is cooking */}
        <Suspense fallback={<FeedbackDashboardSkeleton />}>
          <FeedbackContent />
        </Suspense>
      </div>
    </div>
  );
}