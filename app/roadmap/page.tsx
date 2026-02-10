import { GradientHeader } from "@/components/gradient-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import prisma from "@/lib/prisma";
import { BarChart3, CheckCheck, Clock, Target } from "lucide-react";
import { STATUS_GROUPS, STATUS_ORDER } from "../data/status-data";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { RoadmapDashboardSkeleton } from "@/components/skeletons";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function RoadmapContent() {
  const posts = await prisma.posts.findMany({
    include: {
      users: true,
      votes: true,
    },
    orderBy: {
      votes: {
        _count: "desc",
      },
    },
  });

  const groupedPosts = {
    under_review: posts.filter((p) => p.status === "under_review"),
    planned: posts.filter((p) => p.status === "planned"),
    in_progress: posts.filter((p) => p.status === "in_progress"),
    completed: posts.filter((p) => p.status === "completed"),
  };

  const totalPostsCount = posts.length;
  const totalVotes = posts.reduce((acc, post) => acc + (post.votes?.length || 0), 0);
  const averageVotes = totalPostsCount > 0 ? Math.round(totalVotes / totalPostsCount) : 0;

  // Calculate percentages
  const completedPercentage = totalPostsCount > 0 
    ? Math.round((groupedPosts.completed.length / totalPostsCount) * 100) 
    : 0;
  const inProgressPercentage = totalPostsCount > 0 
    ? Math.round((groupedPosts.in_progress.length / totalPostsCount) * 100) 
    : 0;
  const plannedPercentage = totalPostsCount > 0 
    ? Math.round((groupedPosts.planned.length / totalPostsCount) * 100) 
    : 0;

  return (
    <>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Features</p>
                <p className="text-3xl font-bold">{posts.length}</p>
              </div>
              <Target className="h-10 w-10 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Votes</p>
                <p className="text-3xl font-bold">{totalVotes}</p>
              </div>
              <BarChart3 className="h-10 w-10 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">
                  {groupedPosts.completed.length}
                </p>
              </div>
              <CheckCheck className="h-10 w-10 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Votes</p>
                <p className="text-3xl font-bold">{averageVotes}</p>
              </div>
              <BarChart3 className="h-10 w-10 text-yellow-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Roadmap Progress</CardTitle>
          <CardDescription>
            Track the journey from idea to completion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Completion</span>
              <span className="font-medium">{completedPercentage}%</span>
            </div>
            <Progress value={completedPercentage} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-4 border-t pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {inProgressPercentage}%
              </div>
              <div className="text-sm text-muted-foreground font-medium">In Progress</div>
            </div>
            <div className="text-center border-l border-r">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {plannedPercentage}%
              </div>
              <div className="text-sm text-muted-foreground font-medium">Planned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {completedPercentage}%
              </div>
              <div className="text-sm text-muted-foreground font-medium">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap Columns */}
      <div className="lg:grid grid-cols-1 lg:grid-cols-4 gap-6 space-y-8 lg:space-y-0">
        {STATUS_ORDER.map((status) => {
          const group = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
          const Icon = group.icon;
          const postsInGroup = groupedPosts[status as keyof typeof groupedPosts];

          return (
            <div key={status} className="space-y-4">
              <div
                className={`rounded-lg p-4 ${group.bgColor} border ${group.color} shadow-sm`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${group.textColor}`} />
                    <h2 className={`text-lg font-bold ${group.textColor}`}>
                      {group.title}
                    </h2>
                  </div>
                  <Badge variant="secondary" className={`${group.countColor} shadow-none font-bold`}>
                    {postsInGroup.length}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground/80 font-medium">
                  {group.description}
                </p>
              </div>
              <div className="space-y-3">
                {postsInGroup.map((post) => (
                  <Card
                    key={post.id}
                    className={`border-l-4 ${group.color} hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-default`}
                  >
                    <CardHeader className="pb-3 p-4">
                      <CardTitle className="text-sm font-bold line-clamp-2 leading-tight">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {post.users?.name || "Anonymous"} • {post.votes.length} votes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 p-4 pt-0">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-[10px] px-2 py-0 h-5 font-medium border-muted-foreground/30">
                          {post.category}
                        </Badge>
                        {status === "in_progress" && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">
                            <Clock className="h-3 w-3" />
                            Active
                          </div>
                        )}
                        {status === "completed" && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                            <CheckCheck className="h-3 w-3" />
                            Shipped
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {postsInGroup.length === 0 && (
                  <Card className="border-dashed border-2 opacity-60 bg-muted/20 shadow-none">
                    <CardContent className="py-8 text-center">
                      <p className="text-sm text-muted-foreground font-medium">
                        No items in this stage
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function RoadmapPage() {
  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      {/* Static Header: Loads instantly */}
      <GradientHeader
        title="Product Roadmap"
        subtitle="See what we're working on, what's coming next, and track our progress"
      />

      {/* Dynamic Content: Wrapped in Suspense */}
      <Suspense fallback={<RoadmapDashboardSkeleton />}>
        <RoadmapContent />
      </Suspense>
    </div>
  );
}