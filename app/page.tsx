import { GradientHeader } from "@/components/gradient-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import {
  ArrowRight,
  BarChart,
  Map,
  MessageSquare,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { StatsSkeleton } from "@/components/skeletons";

async function DynamicStats() {
  // Fetch real stats from the database for the hero section
  const totalPosts = await prisma.posts.count();
  const totalVotes = await prisma.votes.count();
  const completedPosts = await prisma.posts.count({
    where: { status: "completed" },
  });

  return (
    <section className="bg-muted/30 rounded-3xl p-12 text-center border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
        <div className="space-y-2">
          <div className="text-5xl font-extrabold tracking-tight text-primary">{totalPosts}</div>
          <div className="text-muted-foreground font-semibold uppercase tracking-wider text-sm">Suggestions</div>
        </div>
        <div className="space-y-2 border-y sm:border-y-0 sm:border-x py-8 sm:py-0">
          <div className="text-5xl font-extrabold tracking-tight text-primary">{totalVotes}</div>
          <div className="text-muted-foreground font-semibold uppercase tracking-wider text-sm">Votes Cast</div>
        </div>
        <div className="space-y-2">
          <div className="text-5xl font-extrabold tracking-tight text-primary">{completedPosts}</div>
          <div className="text-muted-foreground font-semibold uppercase tracking-wider text-sm">Features Shipped</div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4 space-y-16">
      {/* Hero Section: Loads instantly */}
      <GradientHeader
        title="Shape the future of our product"
        subtitle="Feedback Fusion is where your ideas come to life. Suggest features, vote on what matters most, and follow our public roadmap."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-start pt-6">
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold"
          >
            <Link href="/feedback/new">
              Submit Feedback <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 font-bold"
          >
            <Link href="/roadmap">
              View Roadmap <Map className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </GradientHeader>

      {/* Feature Section: Loads instantly */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A simple 4-step process to bridge the gap between users and developers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-blue-500 mb-2" />
              <CardTitle>Submit Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Share your suggestions and feature requests directly with the community.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-purple-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <BarChart className="h-10 w-10 text-purple-500 mb-2" />
              <CardTitle>Vote & Prioritize</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Upvote the ideas you love to help us understand what we should build next.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-indigo-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-indigo-500 mb-2" />
              <CardTitle>Public Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Track our progress in real-time on our transparent public roadmap.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-green-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <Zap className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle>See Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Watch as your community feedback transforms into real, shipped features.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section: Dynamic loading */}
      <Suspense fallback={<StatsSkeleton />}>
        <DynamicStats />
      </Suspense>

      {/* Call to Action: Loads instantly */}
      <section className="text-center py-10">
        <Card className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-none shadow-xl overflow-hidden relative">
          <div className="p-10 space-y-6 relative z-10">
            <h2 className="text-3xl font-bold">Ready to make an impact?</h2>
            <p className="text-slate-300 dark:text-slate-600 max-w-xl mx-auto text-lg">
              Join our community today and help us build the features you&#39;ve always wanted.
            </p>
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 font-bold px-8">
              <Link href="/feedback">Get Started Now</Link>
            </Button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        </Card>
      </section>
    </div>
  );
}
